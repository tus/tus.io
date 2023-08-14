import { z, defineCollection, reference } from 'astro:content'

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    gravatar: z.string(),
    name: z.string(),
    email: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    web: z.string().optional(),
  }),
})

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    author: reference('authors'),
    date: z.date(),
    title: z.string(),
    meta_description: z.string().optional(),
    redirect_from: z.string().optional(),
  }),
})

const features = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
})

const implementations = defineCollection({
  type: 'data',
  schema: z.object({
    authors: z.array(
      z.object({
        name: z.string(),
        href: z.string(),
      }),
    ),
    href: z.string().describe('Repository URL'),
    name: z.string(),
    icon: z.string().optional(),
    description: z.string().describe('HTML allowed'),
    license: z.string(),
    type: z.union([z.literal('official'), z.literal('community')]),
    subtype: z.union([z.literal('client'), z.literal('server')]).optional(),
  }),
})

const logos = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    src: z.string(),
    url: z.string(),
  }),
})

const press = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    src: z.string(),
    url: z.string(),
  }),
})

const protocols = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    version: z.string(),
    version_outdated: z.boolean(),
  }),
})

export const collections = {
  authors,
  blog,
  features,
  implementations,
  logos,
  press,
  protocols,
}
