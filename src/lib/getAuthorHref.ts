import type authors from '@/data/authors.json'

export function getAuthorHref(author: (typeof authors)[keyof typeof authors]) {
  if ('twitter' in author) {
    return `https://twitter.com/${author.twitter}`
  }

  if ('web' in author) {
    return author.web
  }
}
