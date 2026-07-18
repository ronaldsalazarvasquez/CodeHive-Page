import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getTeamData } from './scripts/notionTeam.mjs'

const TEAM_CACHE_TTL_MS = 60_000
let teamCache = { data: null, fetchedAt: 0 }

// Dev-only endpoint that proxies the public Notion "Roles del equipo" database.
// Runs server-side because Notion's API sends no CORS headers for browser calls.
// A short in-memory cache keeps repeated requests (page reloads, polling) from
// re-hitting Notion every time.
function notionTeamApiPlugin() {
  return {
    name: 'notion-team-api',
    configureServer(server) {
      server.middlewares.use('/api/team', async (req, res) => {
        const isFresh = teamCache.data && Date.now() - teamCache.fetchedAt < TEAM_CACHE_TTL_MS
        try {
          if (!isFresh) {
            teamCache = { data: await getTeamData(), fetchedAt: Date.now() }
          }
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(teamCache.data))
        } catch (err) {
          console.error('[notion-team-api]', err)
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.statusCode = 502
          res.end(JSON.stringify({ error: 'notion_fetch_failed', message: err.message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), notionTeamApiPlugin()],
  server: {
    host: true,
    allowedHosts: ['codehive.ronaldsalazar.dev']
  },
})
