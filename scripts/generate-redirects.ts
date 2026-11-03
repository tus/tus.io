import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import { parseFrontmatter } from '@astrojs/markdown-remark'
import { z } from 'astro/zod'
import { slug } from 'github-slugger'
import {
  getLegacyRedirects,
  type LegacyRedirectPost,
} from '../src/lib/getLegacyRedirects.ts'

async function main(): Promise<void> {
  const output = resolve('dist')
  const posts: LegacyRedirectPost[] = []

  for (const entry of await readdir('src/content/blog', { recursive: true })) {
    if (!/\.mdx?$/.test(entry)) continue
    const content = await readFile(resolve('src/content/blog', entry), 'utf8')
    const data = z
      .object({
        redirect_from: z.string().optional(),
        slug: z.string().optional(),
      })
      .parse(parseFrontmatter(content).frontmatter)
    if (!data.redirect_from) continue

    const id = entry
      .replace(/\.mdx?$/, '')
      .split(sep)
      .map((segment) => slug(segment))
      .join('/')
      // Match Astro's glob loader, which treats a directory's index as the directory entry.
      .replace(/\/index$/, '')
    posts.push({
      id: data.slug === undefined || data.slug === '' ? id : data.slug,
      data,
    })
  }

  // Astro's file routing normalizes /index.html before matching dynamic routes.
  // Emit the old directory URLs directly so they cannot replace canonical articles.
  for (const [source, target] of getLegacyRedirects(posts)) {
    const file = resolve(output, source)
    if (!file.startsWith(`${output}${sep}`)) {
      throw new Error(`Redirect escapes the build output: ${source}`)
    }
    // Fail the build if a collection ID or slug override no longer matches an actual article.
    if (!(await stat(resolve(output, `${target}.html`))).isFile()) {
      throw new Error(`Redirect target is not a built page: ${target}`)
    }
    // Static aliases target production; the dev middleware keeps local redirects on its own origin.
    // URL serialization preserves ampersands, which HTML would interpret as entity references.
    const destination = new URL(target, 'https://tus.io/').href.replaceAll(
      '&',
      '&amp;',
    )
    await mkdir(dirname(file), { recursive: true })
    await writeFile(
      file,
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <meta name="robots" content="noindex" />
    <title>Redirecting…</title>
  </head>
  <body>
    If you are not redirected automatically, click <a href="${destination}">here</a>.
  </body>
</html>
`,
    )
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
