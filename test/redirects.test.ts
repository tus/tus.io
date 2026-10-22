import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const script = fileURLToPath(
  new URL('../scripts/generate-redirects.ts', import.meta.url),
)

await test('redirect generation honors the collection slug override', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'tus-redirects-'))
  try {
    await mkdir(join(fixture, 'src/content/blog'), { recursive: true })
    await mkdir(join(fixture, 'dist/blog/2026/10/21'), { recursive: true })
    await writeFile(join(fixture, 'dist/faq.html'), '<h1>FAQ</h1>\n')
    await writeFile(join(fixture, 'dist/support.html'), '<h1>Support</h1>\n')
    await writeFile(
      join(fixture, 'dist/blog/2026/10/21/corrected.html'),
      '<h1>Corrected</h1>\n',
    )
    await writeFile(
      join(fixture, 'src/content/blog/2026-10-21-original.md'),
      '---\nslug: 2026-10-21-corrected\nredirect_from: /old-article/\n---\nArticle\n',
    )
    execFileSync(process.execPath, [script], { cwd: fixture, stdio: 'pipe' })
    const html = await readFile(
      join(fixture, 'dist/old-article/index.html'),
      'utf8',
    )
    assert.match(html, /url=https:\/\/tus\.io\/blog\/2026\/10\/21\/corrected"/)
  } finally {
    await rm(fixture, { recursive: true, force: true })
  }
})
