import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const archives = defineCollection({
    loader: glob({
        pattern: '**/*.{md,mdx}',
        base: './src/content/archives',
    }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        published: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('博主'),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
    }),
})

export const collections = { archives }
