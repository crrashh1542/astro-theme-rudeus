import icon from 'astro-icon'

import { defineConfig } from 'astro/config'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

// https://astro.build/config
export default defineConfig({
    site: 'https://rudeus-docs.crrashh.com',
    integrations: [icon()],
    vite: {
        build: {
            assetsInlineLimit: 6144,
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
