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

async function withFixture(
  run: (fixture: string) => Promise<void>,
): Promise<void> {
  const fixture = await mkdtemp(join(tmpdir(), 'tus-redirects-'))
  try {
    await mkdir(join(fixture, 'src/content/blog'), { recursive: true })
    await mkdir(join(fixture, 'dist/blog/2026/10/21'), { recursive: true })
    await writeFile(join(fixture, 'dist/faq.html'), '<h1>FAQ</h1>\n')
    await writeFile(join(fixture, 'dist/support.html'), '<h1>Support</h1>\n')
    await run(fixture)
  } finally {
    await rm(fixture, { recursive: true, force: true })
  }
}

await test('redirect generation honors the collection slug override', async () => {
  await withFixture(async (fixture) => {
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
  })
})

await test('redirect generation matches Astro IDs for nested index posts', async () => {
  await withFixture(async (fixture) => {
    await mkdir(join(fixture, 'src/content/blog/2026-10-21-example'))
    await writeFile(
      join(fixture, 'dist/blog/2026/10/21/example.html'),
      '<h1>Example</h1>\n',
    )
    await writeFile(
      join(fixture, 'src/content/blog/2026-10-21-example/index.md'),
      '---\nredirect_from: /nested-article/\n---\nArticle\n',
    )
    execFileSync(process.execPath, [script], { cwd: fixture, stdio: 'pipe' })
    const html = await readFile(
      join(fixture, 'dist/nested-article/index.html'),
      'utf8',
    )
    assert.match(html, /url=https:\/\/tus\.io\/blog\/2026\/10\/21\/example"/)
  })
})

await test('redirect destinations preserve entity-like text in custom slugs', async () => {
  await withFixture(async (fixture) => {
    await writeFile(
      join(fixture, 'dist/blog/2026/10/21/&copy;.html'),
      '<h1>Example</h1>\n',
    )
    await writeFile(
      join(fixture, 'src/content/blog/2026-10-21-original.md'),
      '---\nslug: 2026-10-21-&copy;\nredirect_from: /entity-article/\n---\nArticle\n',
    )
    execFileSync(process.execPath, [script], { cwd: fixture, stdio: 'pipe' })
    const html = await readFile(
      join(fixture, 'dist/entity-article/index.html'),
      'utf8',
    )
    assert.match(
      html,
      /content="0; url=https:\/\/tus\.io\/blog\/2026\/10\/21\/&amp;copy;"/,
    )
    assert.match(
      html,
      /href="https:\/\/tus\.io\/blog\/2026\/10\/21\/&amp;copy;"/,
    )
  })
})

await test('empty slug overrides retain the filename-derived collection ID', async () => {
  await withFixture(async (fixture) => {
    await writeFile(
      join(fixture, 'dist/blog/2026/10/21/empty.html'),
      '<h1>Example</h1>\n',
    )
    await writeFile(
      join(fixture, 'src/content/blog/2026-10-21-empty.md'),
      "---\nslug: ''\nredirect_from: /empty-slug/\n---\nArticle\n",
    )
    execFileSync(process.execPath, [script], { cwd: fixture, stdio: 'pipe' })
    const html = await readFile(
      join(fixture, 'dist/empty-slug/index.html'),
      'utf8',
    )
    assert.match(html, /url=https:\/\/tus\.io\/blog\/2026\/10\/21\/empty"/)
  })
})
