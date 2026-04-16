import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    games: defineCollection({
      type: 'page',
      source: 'games/*.md',
      schema: z.object({
        title: z.string(),
        status: z.enum(['in-dev', 'early-access', 'released']),
        genre: z.string(),
        platforms: z.object({
          steam: z.string().optional(),
          itch: z.string().optional(),
        }).optional(),
        release_window: z.string().optional(),
        cover: z.string().optional(),
        trailer: z.string().optional(),
        screenshots: z.array(z.string()).optional(),
        changelog: z.array(z.object({
          version: z.string(),
          date: z.string(),
          notes: z.string(),
        })).optional(),
      }),
    }),

    devlog: defineCollection({
      type: 'page',
      source: 'devlog/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        game: z.string().optional(),
        tags: z.array(z.string()).optional(),
        excerpt: z.string().optional(),
      }),
    }),
  },
})
