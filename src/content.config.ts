import { defineCollection, reference } from 'astro:content'
import { glob, type Loader } from 'astro/loaders'
import { z } from 'astro/zod'

// Data collections historically use file names as IDs, including punctuation.
// Slugifying tus.py.json and tuspy.json would silently drop an implementation.
function jsonLoader(collection: string): Loader {
  return glob({
    base: `./src/content/${collection}`,
    pattern: '**/*.json',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  })
}

const authors = defineCollection({
  loader: jsonLoader('authors'),
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
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    author: reference('authors'),
    date: z.coerce.date(),
    title: z.string(),
    meta_description: z.string().optional(),
    redirect_from: z.string().optional(),
  }),
})

const features = defineCollection({
  loader: glob({ base: './src/content/features', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
})

const implementations = defineCollection({
  loader: jsonLoader('implementations'),
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
    subtype: z
      .union([z.literal('client'), z.literal('server'), z.literal('both')])
      .optional(),
  }),
})

const logos = defineCollection({
  loader: jsonLoader('logos'),
  schema: z.object({
    name: z.string(),
    src: z.string(),
    url: z.string(),
  }),
})

const press = defineCollection({
  loader: jsonLoader('press'),
  schema: z.object({
    name: z.string(),
    src: z.string(),
    url: z.string(),
  }),
})

const protocols = defineCollection({
  loader: glob({ base: './src/content/protocols', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
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
