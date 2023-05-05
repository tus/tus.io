import { z, defineCollection } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
    meta_description: z.string().optional(),
  }),
})

const features = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
})

const protocols = defineCollection({
  schema: z.object({
    title: z.string(),
    version: z.string(),
    noindex: z.boolean().optional(),
    version_outdated: z.boolean().optional(),
  }),
})

export const collections = {
  blog,
  features,
  protocols,
}
