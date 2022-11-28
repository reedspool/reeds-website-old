// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import ssr from 'vite-plugin-ssr/plugin'
import Pages from 'vite-plugin-pages'

export default defineConfig({
    plugins: [
        react(),
        mdx(),
        Pages(
            {
                onRoutesGenerated: async (routes) => {
                    console.log('routes', routes)
                    // const users = await api.get('/users')
                    // const dynamicRoutes = users.map(user => `/users/${user.name}`)
                    // generateSitemap({ routes: [...routes, ...dynamicRoutes] })
                },
                dirs: 'pages',
            }),
        ssr({
            includeAssetsImportedByServer: true,
            prerender: true
        }),
    ],
    build: {
        rollupOptions: {
        }
    },
    ssr: {
        external: ["@mdx-js/rollup"],
        optimizeDeps: {
            disabled: 'build',
            include: ['@mdx-js/rollup']
        }
    },
    resolve: {

        alias: {
            '@': resolve(__dirname, '/src'),
        },
    },
})
