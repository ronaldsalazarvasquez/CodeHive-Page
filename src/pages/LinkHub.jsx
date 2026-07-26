import React, { useEffect, useMemo, useState } from 'react';
import {
    Github, Triangle, Terminal, BookOpen, FileCode2,
    Mail, StickyNote, HardDrive, MessageCircle, LayoutGrid,
    Search, ArrowUpRight, Hexagon, Sun, Moon
} from 'lucide-react';
import '../assets/styles/LinksHub.css';

// TODO: cuando el logo final esté listo, importa la imagen y reemplaza
// el <Hexagon .../> del header por <img src={logo} .../>
// import logo from '../assets/images/logo/icono.webp';

// ======================================================================
// DATA DE ENLACES — reemplaza estos ejemplos por los reales de BeezCorp.
// Cada grupo es una sección. Cada link necesita: name, url, description, icon.
// ======================================================================
const linkGroups = [
    {
        id: 'dev',
        title: 'Herramientas de Desarrollo',
        eyebrow: 'build & ship',
        icon: Terminal,
        links: [
            { name: 'GitHub', url: 'https://github.com/tu-org', description: 'Repositorios y control de versiones', icon: Github },
            { name: 'Vercel', url: 'https://vercel.com/tu-org', description: 'Despliegues del frontend', icon: Triangle },
            { name: 'API Notion (Vercel)', url: 'https://tu-proyecto.vercel.app', description: 'Backend serverless de datos', icon: FileCode2 },
        ],
    },
    {
        id: 'docs',
        title: 'Documentación y Wikis',
        eyebrow: 'knowledge base',
        icon: BookOpen,
        links: [
            { name: 'Notion — Equipo', url: 'https://notion.so/tu-workspace', description: 'Base de datos de integrantes', icon: StickyNote },
            { name: 'Notion — Procesos', url: 'https://notion.so/tu-workspace/procesos', description: 'Wikis y guías internas', icon: BookOpen },
        ],
    },
    {
        id: 'mail',
        title: 'Correos Corporativos',
        eyebrow: 'communication',
        icon: Mail,
        links: [
            { name: 'Correo General', url: 'mailto:contacto@beezcorp.com', description: 'contacto@beezcorp.com', icon: Mail },
            { name: 'Correo Talento', url: 'mailto:talento@beezcorp.com', description: 'talento@beezcorp.com', icon: Mail },
        ],
    },
    {
        id: 'apps',
        title: 'Apps Internas',
        eyebrow: 'daily tools',
        icon: LayoutGrid,
        links: [
            { name: 'Google Drive', url: 'https://drive.google.com/tu-carpeta', description: 'Archivos y documentos compartidos', icon: HardDrive },
            { name: 'Slack', url: 'https://beezcorp.slack.com', description: 'Comunicación del equipo', icon: MessageCircle },
        ],
    },
];

// Alterna los dos acentos de marca por índice de sección (regla sistemática, no decorativa)
const ACCENTS = ['blue', 'amber'];

const THEME_STORAGE_KEY = 'beezcorp-hub-theme';

const getInitialTheme = () => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const LinksHub = () => {
    const [query, setQuery] = useState('');
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const filteredGroups = useMemo(() => {
        if (!query.trim()) return linkGroups;
        const q = query.toLowerCase();
        return linkGroups
            .map((group) => ({
                ...group,
                links: group.links.filter(
                    (link) =>
                        link.name.toLowerCase().includes(q) ||
                        link.description.toLowerCase().includes(q)
                ),
            }))
            .filter((group) => group.links.length > 0);
    }, [query]);

    return (
        <div className="ch-hub-screen" data-theme={theme}>
            <header className="ch-hub-header">
                <div className="ch-hub-header-brand">
                    {/* ===== PLACEHOLDER DE LOGO =====
                        Reemplaza por <img src={logo} .../> cuando esté listo. */}
                    <span className="ch-hub-logo-hex">
                        <Hexagon size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                        <h1>BEEZCORP</h1>
                        <span className="ch-hub-header-sub">$ selecciona un destino</span>
                    </div>
                </div>

                <div className="ch-hub-header-actions">
                    <div className="ch-hub-search-box">
                        <Search size={16} />
                        <input
                            type="text"
                            placeholder="Buscar un enlace..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Buscar enlace"
                        />
                    </div>

                    <button
                        type="button"
                        className="ch-hub-theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
                        title={theme === 'light' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
                    >
                        {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
                    </button>
                </div>
            </header>

            <main className="ch-hub-main">
                {filteredGroups.length === 0 && (
                    <p className="ch-hub-empty">No se encontró ningún enlace que coincida con "{query}".</p>
                )}

                {filteredGroups.map((group, index) => {
                    const GroupIcon = group.icon;
                    const accent = ACCENTS[index % ACCENTS.length];
                    return (
                        <section key={group.id} className="ch-hub-section">
                            <div className="ch-hub-section-heading">
                                <span className={`ch-hub-badge-hex ch-hub-badge-hex--${accent}`}>
                                    <GroupIcon size={18} strokeWidth={1.75} />
                                </span>
                                <div>
                                    <span className="ch-hub-eyebrow">{group.eyebrow}</span>
                                    <h2>{group.title}</h2>
                                </div>
                            </div>

                            <div className="ch-hub-comb-divider" aria-hidden="true">
                                {Array.from({ length: 14 }).map((_, i) => (
                                    <span key={i} className="ch-hub-comb-cell" />
                                ))}
                            </div>

                            <div className="ch-hub-grid">
                                {group.links.map((link) => {
                                    const LinkIcon = link.icon;
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`ch-hub-card ch-hub-card--${accent}`}
                                        >
                                            <span className={`ch-hub-card-hex ch-hub-card-hex--${accent}`}>
                                                <LinkIcon size={20} strokeWidth={1.6} />
                                            </span>
                                            <span className="ch-hub-card-text">
                                                <strong>{link.name}</strong>
                                                <small>{link.description}</small>
                                            </span>
                                            <ArrowUpRight size={16} className="ch-hub-card-external" />
                                        </a>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
            </main>
        </div>
    );
};

export default LinksHub;