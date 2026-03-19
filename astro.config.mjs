import { fileURLToPath, URL } from 'node:url'

import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import { defineConfig } from 'astro/config'
import yaml from '@rollup/plugin-yaml'
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
        assets: '_rudeus',
    },
    integrations: [icon(), sitemap()],
    markdown: {
        remarkPlugins: [remarkDirective, remarkAdmonition],
        rehypePlugins: [rehypeAdmonitionTitle, links(site)],
    },
    vite: {
        plugins: [yaml()],
        build: {
            assetsInlineLimit: 1024,
            rollupOptions: {
                output: {
                    hashCharacters: 'hex',
                    assetFileNames(chunkInfo) {
                        return `_rudeus/${chunkInfo.name.split('.')[0].split('@')[0]}-[hash].[ext]`
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
