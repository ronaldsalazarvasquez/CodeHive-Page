import { useEffect, useState } from 'react';
import staticTeamData from '../data/team.json';

const POLL_INTERVAL_MS = 30_000;

// Starts from the bundled team.json (works even if /api/team is unavailable,
// e.g. a production build with no backend yet) and swaps in live data from
// Notion whenever the dev API responds. Polls so edits in Notion show up
// without a manual page reload while the tab stays open.
export function useTeamData() {
    const [team, setTeam] = useState(staticTeamData);

    useEffect(() => {
        let cancelled = false;

        const refresh = () => {
            fetch('/api/team', { cache: 'no-store' })
                .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`/api/team respondió ${res.status}`))))
                .then((data) => {
                    if (!cancelled && Array.isArray(data) && data.length) setTeam(data);
                })
                .catch((err) => {
                    // Deja el fallback estático puesto, pero avisa en consola: si esto
                    // aparece, /api/team no está disponible (¿corriste `vite build`/`preview`
                    // en vez de `vite dev`?) o Notion no respondió.
                    console.warn('[useTeamData] no se pudo obtener datos en vivo de Notion:', err.message);
                });
        };

        refresh();
        const id = setInterval(refresh, POLL_INTERVAL_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    return team;
}
