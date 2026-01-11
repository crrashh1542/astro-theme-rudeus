import { fileURLToPath } from 'url'
import { resolve } from 'path'

import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import remarkDirective from 'remark-directive'

import admonitions from './src/plugins/admonitions'

// https://astro.build/config
export default defineConfig({
    site: 'https://rudeus-docs.crrashh.com',
    trailingSlash: 'never',
    build: {
        format: 'file',
    },
    integrations: [icon()],
    markdown: {
        remarkPlugins: [remarkDirective, admonitions.remark],
        rehypePlugins: [admonitions.rehype],
    },
    vite: {
        build: {
            assetsInlineLimit: 1024,
            rollupOptions: {
                output: {
                    hashCharacters: 'hex',
                    assetFileNames: '_rudeus/[name]-[hash].[ext]',
                    entryFileNames: '_rudeus/[name]-[hash].js',
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
