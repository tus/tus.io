import { z, defineCollection } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.date(),
  }),
});

const features = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  blog,
  features,
};
