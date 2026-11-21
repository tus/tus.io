import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const output = new URL('../dist/', import.meta.url)

await test('the home page keeps its clean canonical and social URLs', async () => {
  const html = await readFile(new URL('index.html', output), 'utf8')
  assert.match(html, /rel="canonical" href="https:\/\/tus\.io\/"/)
  assert.match(html, /property="og:url" content="https:\/\/tus\.io\/"/)
})

await test('the canonical blog article remains an article', async () => {
  const html = await readFile(
    new URL('blog/2013/04/06/hello-world.html', output),
    'utf8',
  )
  assert.match(html, /<h1[^>]*>Hello World!?<\/h1>/i)
  assert.doesNotMatch(html, /http-equiv="refresh"/)
})

await test('legacy directory URLs still redirect to their canonical articles', async () => {
  const html = await readFile(
    new URL('blog/2013/04/06/hello-world/index.html', output),
    'utf8',
  )
  assert.match(
    html,
    /http-equiv="refresh" content="0; url=https:\/\/tus\.io\/blog\/2013\/04\/06\/hello-world"/,
  )
})

await test('legacy misspelled URLs retain their corrected destinations', async () => {
  const html = await readFile(
    new URL('blog/2023/08/09/resumable-uploads-ieft/index.html', output),
    'utf8',
  )
  assert.match(
    html,
    /http-equiv="refresh" content="0; url=https:\/\/tus\.io\/blog\/2023\/08\/09\/resumable-uploads-ietf"/,
  )
})

await test('implementation names that differ by punctuation remain distinct', async () => {
  const html = await readFile(new URL('implementations.html', output), 'utf8')
  assert.match(html, /href="https:\/\/github\.com\/cenkalti\/tus\.py"/)
  assert.match(html, /href="https:\/\/github\.com\/vayam\/tuspy"/)
})

await test('community servers retain their published file-name ordering', async () => {
  const html = await readFile(new URL('implementations.html', output), 'utf8')
  const previous = html.indexOf(
    'href="https://github.com/ckaratzas/tus-server-implementation"',
  )
  const next = html.indexOf('href="https://github.com/terminusdb/tus"')
  assert.ok(previous >= 0 && next > previous)
})

await test('the protocol selector keeps its hydrated payload small', async () => {
  const html = await readFile(
    new URL('protocols/resumable-upload.html', output),
    'utf8',
  )
  const props = html.match(
    /<astro-island\b(?=[^>]*component-export="ProtocolSelect")[^>]*\bprops="([^"]*)"/,
  )?.[1]
  assert.ok(props, 'the protocol selector is hydrated')
  assert.ok(Buffer.byteLength(props) < 4096, 'selector props stay below 4 KiB')
})

await test('the guide alias still redirects to the FAQ', async () => {
  const html = await readFile(new URL('guide.html', output), 'utf8')
  assert.match(
    html,
    /http-equiv="refresh" content="0; url=https:\/\/tus\.io\/faq"/,
  )
})

await test('the about alias still redirects to support', async () => {
  const html = await readFile(new URL('about.html', output), 'utf8')
  assert.match(
    html,
    /http-equiv="refresh" content="0; url=https:\/\/tus\.io\/support"/,
  )
})

await test('the current protocol retains the generated table of contents and heading links', async () => {
  const html = await readFile(
    new URL('protocols/resumable-upload.html', output),
    'utf8',
  )
  assert.match(html, /href="#core-protocol"/)
  assert.match(html, /id="core-protocol"/)
  assert.match(html, /<option[^>]*selected[^>]*>1\.0\.x<\/option>/)
})
