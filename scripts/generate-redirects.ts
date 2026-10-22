import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import { parseFrontmatter } from '@astrojs/markdown-remark'
import { z } from 'astro/zod'
import { slug } from 'github-slugger'
import { getBlogPostSlug } from '../src/lib/getBlogPostSlug.ts'

async function main(): Promise<void> {
  const output = resolve('dist')
  const redirects = new Map([
    ['guide.html', 'faq'],
    ['about.html', 'support'],
  ])

  for (const entry of await readdir('src/content/blog', { recursive: true })) {
    if (!/\.mdx?$/.test(entry)) continue
    const content = await readFile(resolve('src/content/blog', entry), 'utf8')
    const { redirect_from: redirectFrom } = z
      .object({ redirect_from: z.string().optional() })
      .parse(parseFrontmatter(content).frontmatter)
    if (!redirectFrom) continue

    const id = entry
      .replace(/\.mdx?$/, '')
      .split(sep)
      .map((segment) => slug(segment))
      .join('/')
    redirects.set(
      `${redirectFrom.replace(/^\//, '')}index.html`,
      `blog/${getBlogPostSlug(id)}`,
    )
  }

  // Astro's file routing normalizes /index.html before matching dynamic routes.
  // Emit the old directory URLs directly so they cannot replace canonical articles.
  for (const [source, target] of redirects) {
    const file = resolve(output, source)
    if (!file.startsWith(`${output}${sep}`)) {
      throw new Error(`Redirect escapes the build output: ${source}`)
    }
    const destination = new URL(target, 'https://tus.io/').href
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
