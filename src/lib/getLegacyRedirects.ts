import { getBlogPostSlug } from './getBlogPostSlug.ts'

/** The content fields needed to preserve a post's former public URL. */
export interface LegacyRedirectPost {
  id: string
  data: { redirect_from?: string }
}

/** Maps legacy output files to canonical routes for static builds and local development. */
export function getLegacyRedirects(
  posts: readonly LegacyRedirectPost[],
): Map<string, string> {
  const redirects = new Map([
    ['guide.html', 'faq'],
    ['about.html', 'support'],
  ])
  for (const post of posts) {
    const from = post.data.redirect_from
    if (!from) continue
    const directory = from.replace(/^\/+/, '').replace(/\/?$/, '/')
    redirects.set(`${directory}index.html`, `blog/${getBlogPostSlug(post.id)}`)
  }
  return redirects
}

/** Resolves file and directory aliases without redirecting clean canonical article URLs. */
export function getLegacyRedirectTarget(
  pathname: string,
  redirects: ReadonlyMap<string, string>,
): string | undefined {
  const path = pathname.replace(/^\/+/, '')
  const file = path.endsWith('/')
    ? `${path}index.html`
    : path.endsWith('.html')
      ? path
      : `${path}.html`
  return redirects.get(file)
}
