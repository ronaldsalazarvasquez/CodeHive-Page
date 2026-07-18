// Fetches the "Roles del Equipo" table from the public Notion page and normalizes it
// to the shape consumed by the frontend. Uses Notion's unofficial public API — no
// auth token needed because the page is published publicly, but it must run server-side
// (Notion does not send CORS headers, so the browser can't call this directly).

import overrides from '../src/data/teamOverrides.json' with { type: 'json' };

const NOTION_HOST = 'https://rainy-henley-11a.notion.site';
const SPACE_ID = 'c7637746-d2d1-81e7-9d43-00035413754f';
const COLLECTION_ID = '36237746-d2d1-82f9-9c4b-07c8bb1c8c49';
const COLLECTION_VIEW_ID = '9b537746-d2d1-8279-ac4c-083742c5566c';

const SCHEMA = {
    title: 'title',
    name: 'QgSp',
    description: 'Rtd]',
    email: 'ArxI',
    github: 'IxP~',
    linkedin: 'E_CU',
    otros: '~k\\w',
    photo: '>yr[',
};

function plainText(prop) {
    if (!Array.isArray(prop) || !Array.isArray(prop[0])) return '';
    return prop[0][0] ?? '';
}

// Notion "file" properties store an inline attachment reference instead of plain
// text, e.g. [["Ronald.webp",[["a","attachment:<fileId>:Ronald.webp"]]]].
function fileAttachmentRef(prop) {
    if (!Array.isArray(prop) || !Array.isArray(prop[0])) return null;
    const annotations = prop[0][1];
    if (!Array.isArray(annotations)) return null;
    const link = annotations.find((a) => Array.isArray(a) && a[0] === 'a');
    return link?.[1] ?? null;
}

// Notion's own image proxy resolves the attachment to a freshly-signed S3 URL on
// every request (redirect), so this URL is safe to cache/store indefinitely even
// though the signed URL behind it expires after ~24h.
function notionImageUrl(attachmentRef, blockId) {
    if (!attachmentRef) return null;
    const params = new URLSearchParams({ table: 'block', id: blockId, spaceId: SPACE_ID, width: '480' });
    return `${NOTION_HOST}/image/${encodeURIComponent(attachmentRef)}?${params}`;
}

function slugify(str) {
    return str
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function titleCase(str) {
    return str
        .toLowerCase()
        .replace(/(^|\s|\.)([a-záéíóúñ])/g, (_, sep, c) => sep + c.toUpperCase());
}

async function notionFetch(path, body) {
    const res = await fetch(`${NOTION_HOST}/api/v3/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Notion API ${path} respondió ${res.status}`);
    return res.json();
}

async function fetchRawRows() {
    const query = await notionFetch('queryCollection', {
        source: { type: 'collection', id: COLLECTION_ID, spaceId: SPACE_ID },
        collectionView: { id: COLLECTION_VIEW_ID, spaceId: SPACE_ID },
        loader: {
            type: 'reducer',
            reducers: { collection_group_results: { type: 'results', limit: 100 } },
            userTimeZone: 'America/Lima',
        },
    });

    const blockIds = query.result?.reducerResults?.collection_group_results?.blockIds ?? [];
    const blocks = query.recordMap?.block ?? {};

    return blockIds
        .map((id) => blocks[id]?.value?.value)
        .filter(Boolean)
        .map((block) => {
            const props = block.properties ?? {};
            return {
                role: plainText(props[SCHEMA.title]),
                name: plainText(props[SCHEMA.name]),
                description: plainText(props[SCHEMA.description]),
                email: plainText(props[SCHEMA.email]),
                github: plainText(props[SCHEMA.github]),
                linkedin: plainText(props[SCHEMA.linkedin]),
                portfolio: plainText(props[SCHEMA.otros]),
                photo: notionImageUrl(fileAttachmentRef(props[SCHEMA.photo]), block.id),
            };
        });
}

function mergeWithOverrides(row) {
    const key = row.name.toUpperCase();
    const override = overrides[key] ?? {};

    return {
        id: override.id ?? slugify(row.name),
        name: override.name ?? titleCase(row.name),
        role: row.role,
        description: row.description,
        img: row.photo || '', // Notion-only: no local-asset fallback, so a missing photo shows the default placeholder
        social: {
            github: row.github || '',
            linkedin: row.linkedin || '',
            twitter: override.social?.twitter ?? '#',
            portfolio: row.portfolio || override.social?.portfolio || '#',
        },
    };
}

export async function getTeamData() {
    const rows = await fetchRawRows();
    return rows
        .filter((row) => row.name || row.role) // skip blank rows (e.g. an empty row left in the table)
        .map(mergeWithOverrides);
}
