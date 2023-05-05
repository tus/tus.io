import { getBlogPostSlug } from '@/lib/getBlogPostSlug'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import type { APIRoute } from 'astro'

export const get: APIRoute = async (context) => {
  const blog = await getCollection('blog')
  return rss({
    title: 'tus.io',
    description: 'tus.io blog posts',
    site: context.site,
    items: blog.map((post) => {
      return {
        title: post.data.title,
        author: post.data.author,
        pubDate: post.data.date,
        link: `/blog/${getBlogPostSlug(post.slug)}`,
      }
    }),
    stylesheet: '/pretty-feed-v3.xsl',
  })
}
