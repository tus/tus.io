import { getBlogPostSlug } from '@/lib/getBlogPostSlug'
import rss from '@astrojs/rss'
import { getCollection, getEntry } from 'astro:content'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const blog = await getCollection('blog')
  return rss({
    title: 'tus.io',
    description: 'tus.io blog posts',
    site: 'https://tus.io',
    items: (
      await Promise.all(
        blog.map(async (post) => {
          const author = await getEntry(post.data.author)
          return {
            title: post.data.title,
            author: author.data.name,
            pubDate: post.data.date,
            link: `/blog/${getBlogPostSlug(post.slug)}`,
          }
        }),
      )
    ).sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
    stylesheet: '/pretty-feed-v3.xsl',
  })
}
