import { fileURLToPath } from 'url'
import { resolve } from 'path'

import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import sitemap from '@astrojs/sitemap'
import remarkDirective from 'remark-directive'

import admonitions from './src/plugins/admonitions'
import links from './src/plugins/links'

const SITE = 'https://rudeus-docs.crrashh.com'

// https://astro.build/config
export default defineConfig({
    site: SITE,
    trailingSlash: 'never',
    build: {
        format: 'file',
    },
    integrations: [icon(), sitemap()],
    markdown: {
        remarkPlugins: [remarkDirective, admonitions.remark],
        rehypePlugins: [admonitions.rehype, links(SITE)],
    },
    vite: {
        build: {
            assetsInlineLimit: 1024,
            rollupOptions: {
                output: {
                    hashCharacters: 'hex',
                    assetFileNames: '_rudeus/[name]-[hash].[ext]',
                    entryFileNames(chunkInfo) {
                        return '_rudeus/' + chunkInfo.name.split('.')[0] + '-[hash].js'
                    },
                    minifyInternalExports: true,
                },
            },
        },
        resolve: {
            alias: {
                '@': resolve(fileURLToPath(new URL('./src', import.meta.url))),
            },
        },
    },
})
