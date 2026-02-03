import { fileURLToPath, URL } from 'node:url'

import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import remarkDirective from 'remark-directive'

import { remarkAdmonition, rehypeAdmonitionTitle } from './src/plugins/admonitions'
import links from './src/plugins/links'

const site = 'https://rudeus-docs.crrashh.com'

// https://astro.build/config
export default defineConfig({
    site,
    trailingSlash: 'never',
    build: {
        format: 'file',
    },
    integrations: [icon(), sitemap()],
    markdown: {
        remarkPlugins: [remarkDirective, remarkAdmonition],
        rehypePlugins: [rehypeAdmonitionTitle, links(site)],
    },
    vite: {
        build: {
            assetsInlineLimit: 1024,
            rollupOptions: {
                output: {
                    hashCharacters: 'hex',
                    assetFileNames: '_rudeus/[name]-[hash].[ext]',
                    entryFileNames(chunkInfo) {
                        return `_rudeus/${chunkInfo.name.split('.')[0]}-[hash].js`
                    },
                    minifyInternalExports: true,
                },
            },
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
    },
})
