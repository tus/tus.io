import type { CollectionEntry } from 'astro:content'

export function getAuthorHref(author: CollectionEntry<'authors'>) {
  if (author.data?.twitter) {
    return `https://twitter.com/${author.data.twitter}`
  }

  if ('web' in author.data) {
    return author.data.web
  }
}
