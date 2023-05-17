import { z, defineCollection } from 'astro:content'

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
    meta_description: z.string().optional(),
    redirect_from: z.string().optional(),
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
    version_outdated: z.boolean(),
  }),
})

export const collections = {
  blog,
  features,
  protocols,
}
