import { defineCollection, z } from 'astro:content'

const archives = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        published: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        author: z.string().default('Anonymous'),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
    }),
})

export const collections = { archives }
