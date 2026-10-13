import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { prepare, restoreArtifact, submit } from '../scripts/indexnow.mjs'

const origin = 'https://tus.io'
const key = '0123456789abcdef0123456789abcdef'

async function fixture(t, pages) {
  await mkdir('.cache', { recursive: true })
  const dir = await mkdtemp('.cache/indexnow-test-')
  t.after(() => rm(dir, { recursive: true, force: true }))
  const options = {
    buildDir: path.join(dir, 'build'),
    stateDir: path.join(dir, 'state'),
    loadArtifact: async () => undefined,
    log: () => undefined,
  }
  await mkdir(options.buildDir, { recursive: true })
  await writeFile(path.join(options.buildDir, 'indexnow.txt'), key)
  await build(options, pages)
  return options
}

function renderedFile(buildDir, route) {
  return path.join(buildDir, route === '/' ? 'index.html' : `${route}.html`)
}

async function build({ buildDir }, pages) {
  const entries = []
  for (const [route, content] of Object.entries(pages)) {
    entries.push(`<url><loc>${origin}${route}</loc></url>`)
    const file = renderedFile(buildDir, route)
    await mkdir(path.dirname(file), { recursive: true })
    if (content !== null) {
      await writeFile(
        file,
        `<html><head><title>tus</title><link rel="canonical" href="${origin}${route}"><script src="/bundle.js"></script></head><body><main>${content}</main></body></html>`,
      )
    }
  }
  await writeFile(
    path.join(buildDir, 'sitemap-index.xml'),
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap></sitemapindex>`,
  )
  await writeFile(
    path.join(buildDir, 'sitemap-0.xml'),
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`,
  )
}

async function state({ stateDir }) {
  return JSON.parse(await readFile(path.join(stateDir, 'state.json'), 'utf8'))
}

test('first production run establishes a baseline without submitting history', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Existing doc' })
  const requests = []
  options.fetchImpl = async (url) => {
    requests.push(url)
    return new Response(null, { status: 404 })
  }
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [])
  assert.equal(Object.keys((await state(options)).pages).length, 1)
  await submit({ ...options, production: true })
  assert.deepEqual(requests, [`${origin}/indexnow-state.json`])
  assert.deepEqual(
    JSON.parse(
      await readFile(path.join(options.buildDir, 'indexnow-state.json')),
    ),
    await state(options),
  )
})

test('a deploy submits edited, added and removed URLs, excluding bundle churn', async (t) => {
  const options = await fixture(t, {
    '/docs/one': 'Original',
    '/docs/same': 'Same',
    '/docs/removed': 'Old',
  })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await build(options, {
    '/docs/one': 'Edited',
    '/docs/same': 'Same',
    '/docs/added': 'New',
  })
  const unchanged = path.join(options.buildDir, 'docs/same.html')
  await writeFile(
    unchanged,
    (await readFile(unchanged, 'utf8')).replace('/bundle.js', '/new-bundle.js'),
  )
  await prepare(options)
  const expected = ['added', 'one', 'removed'].map(
    (name) => `${origin}/docs/${name}`,
  )
  assert.deepEqual((await state(options)).pending, expected)
  const posts = []
  options.fetchImpl = async (url, init) => {
    if (url === `${origin}/indexnow.txt`) return new Response(key)
    posts.push({ url, ...JSON.parse(init.body) })
    return new Response(null, { status: 202 })
  }
  await submit({ ...options, production: true })
  assert.deepEqual(posts, [
    {
      url: 'https://api.indexnow.org/indexnow',
      host: 'tus.io',
      key,
      keyLocation: `${origin}/indexnow.txt`,
      urlList: expected,
    },
  ])
  assert.deepEqual((await state(options)).pending, [])
})

test('cache loss recovers the previous public snapshot and pending notifications', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Original' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const previous = await state(options)
  previous.pending = [`${origin}/docs/retry`]
  await rm(options.stateDir, { recursive: true })
  await build(options, { '/docs/one': 'Edited' })
  options.fetchImpl = async () => Response.json(previous)
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [
    `${origin}/docs/one`,
    `${origin}/docs/retry`,
  ])
})

test('missing rendered HTML falls back to the sitemap diff without replaying history', async (t) => {
  const options = await fixture(t, {
    '/docs/missing': null,
    '/docs/one': 'Same',
  })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await build(options, {
    '/docs/missing': null,
    '/docs/one': 'Same',
    '/docs/new': null,
  })
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/docs/new`])
})

test('failed requests and an unpublished ownership key retain URLs for the next deploy', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Original' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await build(options, { '/docs/one': 'Edited' })
  await prepare(options)
  options.fetchImpl = async () => new Response('wrong key')
  await assert.rejects(submit({ ...options, production: true }), /key/i)
  assert.deepEqual((await state(options)).pending, [`${origin}/docs/one`])
  options.fetchImpl = async (url) =>
    url.endsWith('.txt')
      ? new Response(key)
      : new Response(null, { status: 429 })
  await assert.rejects(submit({ ...options, production: true }), /429/)
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/docs/one`])
  options.fetchImpl = async (url) =>
    url.endsWith('.txt')
      ? new Response(key)
      : new Response(null, { status: 200 })
  await submit({ ...options, production: true })
  assert.deepEqual((await state(options)).pending, [])
})

test('previews never contact the ownership endpoint or IndexNow', async (t) => {
  const options = await fixture(t, {})
  options.fetchImpl = () => assert.fail('preview made a network request')
  await submit({ ...options, production: false })
})

test('pages without a main element still detect rendered content changes', async (t) => {
  const options = await fixture(t, { '/demo': 'Original' })
  const file = path.join(options.buildDir, 'demo.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace('<main>', '<div>')
      .replace('</main>', '</div>'),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace('Original', 'Edited'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/demo`])
})

test('homepage hero and JSON-LD edits each notify their URL', async (t) => {
  const options = await fixture(t, { '/': 'Same main' })
  const file = path.join(options.buildDir, 'index.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace('<main>', '<header>Old hero</header><main>')
      .replace(
        '</head>',
        '<script type="application/ld+json">{"name":"tus"}</script></head>',
      ),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace('Old hero', 'New hero'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/`])
  const acknowledged = await state(options)
  acknowledged.pending = []
  await writeFile(
    path.join(options.stateDir, 'state.json'),
    JSON.stringify(acknowledged),
  )
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace(
      '"name":"tus"',
      '"name":"tus by Transloadit"',
    ),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/`])
})

test('generator, class, style and executable script changes do not notify unchanged content', async (t) => {
  const options = await fixture(t, {
    '/docs/one': '<p class="old" style="color:red">Same content</p>',
  })
  const file = path.join(options.buildDir, 'docs/one.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace(
      '</head>',
      '<meta name="generator" content="Astro v3.9.2"></head>',
    ),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace('v3.9.2', 'v3.10.2')
      .replace('class="old"', 'class="new"')
      .replace('color:red', 'color:blue')
      .replace('/bundle.js', '/new-bundle.js'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [])
})

test('hoisted resource hints do not notify pages, while page image changes do', async (t) => {
  const options = await fixture(t, {
    '/docs/one': '<img src="/example.png" alt="Example">',
  })
  const file = path.join(options.buildDir, 'docs/one.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace(
        '<body>',
        '<body><div><link rel="preload" as="image" href="/shared-logo.png"><link rel="modulepreload" href="/chunk.js">',
      )
      .replace('</body>', '</div></body>'),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace('/shared-logo.png', '/new-shared-logo.png')
      .replace('/chunk.js', '/new-chunk.js'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [])
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace('/example.png', '/new-example.png'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/docs/one`])
})

test('a newer deployed snapshot recovers notices missing from a stale cache', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Same' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const cached = { ...(await state(options)), generation: 10 }
  await writeFile(
    path.join(options.stateDir, 'state.json'),
    JSON.stringify(cached),
  )
  const deployed = {
    ...cached,
    generation: 20,
    pending: [`${origin}/docs/transient`],
  }
  options.fetchImpl = async () => Response.json(deployed)
  await prepare(options)
  assert.deepEqual((await state(options)).pending, deployed.pending)
})

test('a newer archive recovers a removed URL when the cache and CDN agree on stale state', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Same' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const stale = { ...(await state(options)), generation: 10 }
  await writeFile(
    path.join(options.stateDir, 'state.json'),
    JSON.stringify(stale),
  )
  const removedUrl = `${origin}/docs/transient`
  const archived = {
    ...stale,
    generation: 20,
    pages: { ...stale.pages, [removedUrl]: stale.pages[`${origin}/docs/one`] },
    pending: [],
  }
  options.fetchImpl = async () => Response.json(stale)
  options.loadArtifact = async () => archived
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [removedUrl])
})

test('failed archive recovery preserves the checkpoint until newer deletions can be recovered', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Same' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const stale = { ...(await state(options)), generation: 10 }
  await writeFile(
    path.join(options.stateDir, 'state.json'),
    JSON.stringify(stale),
  )
  const removedUrl = `${origin}/docs/transient`
  const archived = {
    ...stale,
    generation: 20,
    pages: { ...stale.pages, [removedUrl]: stale.pages[`${origin}/docs/one`] },
    pending: [],
  }
  options.fetchImpl = async () => Response.json(stale)
  options.loadArtifact = async () => {
    throw new Error('Archive timeout')
  }
  await assert.rejects(prepare(options), /Archive timeout/)
  assert.deepEqual(await state(options), stale)
  assert.deepEqual(
    JSON.parse(
      await readFile(path.join(options.buildDir, 'indexnow-state.json')),
    ),
    stale,
  )
  options.loadArtifact = async () => archived
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [removedUrl])
})

test('archive recovery selects the highest generation across API pages, even after an older deploy is retried', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Same' })
  const artifact = (id, generation, extra = {}) => ({
    id,
    name: `indexnow-production-state-${generation}`,
    expired: false,
    workflow_run: {
      id,
      head_branch: 'main',
      head_repository_id: 1,
      repository_id: 1,
    },
    ...extra,
  })
  const artifacts = [
    {
      artifacts: [
        artifact(200, 10),
        artifact(300, 30, { expired: true }),
        artifact(400, 40, {
          workflow_run: {
            id: 400,
            head_branch: 'main',
            head_repository_id: 2,
            repository_id: 1,
          },
        }),
      ],
    },
    { artifacts: [artifact(100, 20)] },
  ]
  const states = {
    200: { version: 1, generation: 10, pages: {}, pending: [] },
    100: {
      version: 1,
      generation: 20,
      pages: {},
      pending: [`${origin}/docs/transient`],
    },
  }
  const recovered = await restoreArtifact({
    stateDir: options.stateDir,
    token: 'test-token',
    execImpl: async (command, args) => {
      if (args[0] === 'api') return { stdout: JSON.stringify(artifacts) }
      const saved = states[Number(args[2])]
      assert.ok(saved, 'downloaded an expired or foreign artifact')
      await writeFile(
        path.join(options.stateDir, 'restore/state.json'),
        JSON.stringify(saved),
      )
      return { stdout: '' }
    },
  })
  assert.deepEqual(recovered, states[100])
})

test('artifact recovery and a failed preparation preserve the last pending state', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Same' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const saved = {
    ...(await state(options)),
    generation: 20,
    pending: [`${origin}/docs/retry`],
  }
  await rm(options.stateDir, { recursive: true })
  await rm(path.join(options.buildDir, 'indexnow-state.json'))
  await writeFile(path.join(options.buildDir, 'sitemap-0.xml'), '<invalid/>')
  options.fetchImpl = async () => {
    throw new Error('Network timeout')
  }
  options.loadArtifact = async () => saved
  await assert.rejects(prepare(options), /Expected/)
  assert.deepEqual(await state(options), saved)
  assert.deepEqual(
    JSON.parse(
      await readFile(
        path.join(options.buildDir, 'indexnow-state.json'),
        'utf8',
      ),
    ),
    saved,
  )
})

test('corrupt cached state is discarded when recovery fails', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Same' })
  await mkdir(options.stateDir, { recursive: true })
  const file = path.join(options.stateDir, 'state.json')
  await writeFile(file, 'corrupt JSON')
  options.fetchImpl = async () => new Response(null, { status: 503 })
  await assert.rejects(prepare(options), /503/)
  await assert.rejects(readFile(file), { code: 'ENOENT' })
})

test('returning HTML after a sitemap-only snapshot detects its content', async (t) => {
  const options = await fixture(t, { '/docs/one': null })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await build(options, { '/docs/one': 'Rendered edit' })
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/docs/one`])
})

test('shared navigation, sidebar and footer edits do not submit otherwise unchanged pages', async (t) => {
  const options = await fixture(t, { '/': 'Same content' })
  const file = path.join(options.buildDir, 'index.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace(
        '<main>',
        '<nav>Old navigation</nav><aside>Old sidebar</aside><main>',
      )
      .replace(
        '</body>',
        '<footer class="footer"><nav>Footer links</nav>2026</footer></body>',
      ),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace('Old navigation', 'New navigation')
      .replace('Old sidebar', 'New sidebar')
      .replace('2026', '2027'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [])
})

test('client-only pages use sitemap timestamps while preserving metadata edits', async (t) => {
  const options = await fixture(t, { '/demo': '' })
  const file = path.join(options.buildDir, 'demo.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace(
      '<main></main>',
      '<astro-island client="only"></astro-island>',
    ),
  )
  const sitemap = path.join(options.buildDir, 'sitemap-0.xml')
  await writeFile(
    sitemap,
    (await readFile(sitemap, 'utf8')).replace(
      '</url>',
      '<lastmod>2026-10-01T12:00:00Z</lastmod></url>',
    ),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    sitemap,
    (await readFile(sitemap, 'utf8')).replace('10-01', '10-13'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/demo`])
  const acknowledged = await state(options)
  acknowledged.pending = []
  await writeFile(
    path.join(options.stateDir, 'state.json'),
    JSON.stringify(acknowledged),
  )
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace(
      '<title>tus</title>',
      '<title>Examples | tus</title>',
    ),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/demo`])
})

test('malformed JSON-LD falls back to raw metadata without blocking all notices', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Original' })
  const file = path.join(options.buildDir, 'docs/one.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace(
      '</head>',
      '<script type="application/ld+json">{"broken":</script></head>',
    ),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace('Original', 'Edited'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/docs/one`])
})

test('noindex, redirect and noncanonical pages are excluded from the snapshot', async (t) => {
  const options = await fixture(t, {
    '/docs/public': 'Public',
    '/docs/hidden': 'Private',
    '/docs/redirect': 'Redirect',
    '/docs/alias': 'Alias',
  })
  for (const [route, tag] of Object.entries({
    '/docs/hidden': '<meta name="robots" content="noindex">',
    '/docs/redirect':
      '<meta http-equiv="refresh" content="0;url=/docs/public/">',
    '/docs/alias': null,
  })) {
    const file = renderedFile(options.buildDir, route)
    let html = await readFile(file, 'utf8')
    html = tag
      ? html.replace('</head>', `${tag}</head>`)
      : html.replace(`${origin}${route}`, `${origin}/docs/public`)
    await writeFile(file, html)
  }
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  assert.deepEqual(Object.keys((await state(options)).pages), [
    `${origin}/docs/public`,
  ])
})

test('search metadata changes are detected and uncertain previous state is preserved', async (t) => {
  const options = await fixture(t, { '/docs/one': 'Same body' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const file = path.join(options.buildDir, 'docs/one.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace(
      '<title>tus</title>',
      '<title>New title</title>',
    ),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/docs/one`])
  const previous = await state(options)
  await rm(options.stateDir, { recursive: true })
  options.fetchImpl = async () => new Response(null, { status: 503 })
  await assert.rejects(prepare(options), /503/)
  assert.deepEqual(
    JSON.parse(
      await readFile(
        path.join(options.buildDir, 'indexnow-state.json'),
        'utf8',
      ),
    ),
    previous,
  )
})

test('submissions respect the 10,000 URL limit and preserve a failed remainder', async (t) => {
  const options = await fixture(t, {})
  await mkdir(options.stateDir, { recursive: true })
  const pending = Array.from({ length: 10001 }, (_, i) => `${origin}/docs/${i}`)
  await writeFile(
    path.join(options.stateDir, 'state.json'),
    JSON.stringify({ version: 1, pages: {}, pending }),
  )
  let posts = 0
  options.fetchImpl = async (url, init) => {
    if (url.endsWith('.txt')) return new Response(key)
    posts++
    assert.equal(JSON.parse(init.body).urlList.length, posts === 1 ? 10000 : 1)
    return new Response(null, { status: posts === 1 ? 200 : 503 })
  }
  await assert.rejects(submit({ ...options, production: true }), /503/)
  assert.deepEqual((await state(options)).pending, pending.slice(10000))
})

test('Astro sitemap shards and the slashless homepage resolve to rendered files', async (t) => {
  const options = await fixture(t, { '/': 'Home', '/blog/post': 'Post' })
  const sitemap = path.join(options.buildDir, 'sitemap-0.xml')
  await writeFile(
    sitemap,
    (await readFile(sitemap, 'utf8')).replace(
      `${origin}/</loc>`,
      `${origin}</loc>`,
    ),
  )
  await writeFile(
    path.join(options.buildDir, 'sitemap-1.xml'),
    `<urlset><url><loc>${origin}/faq</loc></url></urlset>`,
  )
  await writeFile(
    path.join(options.buildDir, 'faq.html'),
    `<html><body><main>FAQ</main></body></html>`,
  )
  const index = path.join(options.buildDir, 'sitemap-index.xml')
  await writeFile(
    index,
    (await readFile(index, 'utf8')).replace(
      '</sitemapindex>',
      `<sitemap><loc>${origin}/sitemap-1.xml</loc></sitemap></sitemapindex>`,
    ),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const snapshot = await state(options)
  assert.deepEqual(Object.keys(snapshot.pages).sort(), [
    `${origin}/`,
    `${origin}/blog/post`,
    `${origin}/faq`,
  ])
  assert.ok(Object.values(snapshot.pages).every((page) => page.hash))
  assert.deepEqual(snapshot.pending, [])
  await writeFile(
    path.join(options.buildDir, 'blog/post.html'),
    (
      await readFile(path.join(options.buildDir, 'blog/post.html'), 'utf8')
    ).replace('Post', 'Edited post'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/blog/post`])
})

test('Astro scope and hydration churn is ignored while rendered island edits notify', async (t) => {
  const options = await fixture(t, { '/demo': 'Original demo' })
  const file = path.join(options.buildDir, 'demo.html')
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replace(
        '<main>',
        '<astro-island uid="old" component-url="/old.js" component-export="Demo" props="old"><main data-astro-cid-old>',
      )
      .replace('</main>', '</main><!--astro:end--></astro-island>')
      .replace(
        '<body>',
        '<body><astro-island uid="nav" component-export="Navigation"><header><img src="/old-logo.svg"><nav>Old links</nav></header></astro-island>',
      ),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  await writeFile(
    file,
    (await readFile(file, 'utf8'))
      .replaceAll('old', 'new')
      .replace('Old links', 'New links'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [])
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace('Original demo', 'Edited demo'),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [`${origin}/demo`])
})

test('sitemap timestamps do not submit unchanged rendered pages', async (t) => {
  const options = await fixture(t, { '/faq': 'Same' })
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  const file = path.join(options.buildDir, 'sitemap-0.xml')
  await writeFile(
    file,
    (await readFile(file, 'utf8')).replace(
      '</url>',
      '<lastmod>2026-10-13</lastmod></url>',
    ),
  )
  await prepare(options)
  assert.deepEqual((await state(options)).pending, [])
})

test('plain sitemaps still work without an Astro sitemap index', async (t) => {
  const options = await fixture(t, { '/faq': 'Same' })
  await rm(path.join(options.buildDir, 'sitemap-index.xml'))
  await writeFile(
    path.join(options.buildDir, 'sitemap.xml'),
    await readFile(path.join(options.buildDir, 'sitemap-0.xml')),
  )
  options.fetchImpl = async () => new Response(null, { status: 404 })
  await prepare(options)
  assert.ok((await state(options)).pages[`${origin}/faq`].hash)
})

test('unsafe sitemap paths and foreign origins preserve the production baseline', async (t) => {
  for (const url of [
    'https://example.org/page',
    `${origin}/%2f..%2f..%2foutside`,
  ]) {
    const options = await fixture(t, { '/faq': 'Same' })
    options.fetchImpl = async () => new Response(null, { status: 404 })
    await prepare(options)
    const previous = await state(options)
    await writeFile(
      path.join(options.buildDir, 'sitemap-0.xml'),
      `<urlset><url><loc>${url}</loc></url></urlset>`,
    )
    await assert.rejects(
      prepare(options),
      /Unexpected sitemap\/state URL|URL outside the build/,
    )
    assert.deepEqual(await state(options), previous)
  }
})

test('the CLI skips previews, fork repositories and manual runs outside main', async () => {
  for (const [repository, ref, event] of [
    ['tus/tus.io', 'refs/heads/main', 'pull_request'],
    ['tus/tus.io', 'refs/heads/preview', 'push'],
    ['tus/tus.io', 'refs/heads/preview', 'workflow_dispatch'],
    ['fork/tus.io', 'refs/heads/main', 'push'],
  ]) {
    for (const command of ['prepare', 'submit']) {
      const { stdout, stderr } = await promisify(execFile)(
        process.execPath,
        ['scripts/indexnow.mjs', command],
        {
          env: {
            ...process.env,
            GITHUB_REPOSITORY: repository,
            GITHUB_REF: ref,
            GITHUB_EVENT_NAME: event,
          },
          timeout: 10000,
        },
      )
      assert.match(stdout, /skipping non-production deployment/)
      assert.equal(stderr, '')
    }
  }
})
