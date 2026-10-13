import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const ORIGIN = 'https://tus.io'
const STATE_FILE = 'indexnow-state.json'
const ARTIFACT = 'indexnow-production-state'
const exec = promisify(execFile)
const defaults = {
  buildDir: 'dist',
  stateDir: '.cache/indexnow',
  fetchImpl: globalThis.fetch,
  loadArtifact: restoreArtifact,
  log: console.log,
}

function decodeXml(value) {
  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi,
    (_, entity) => {
      if (entity.startsWith('#')) {
        return String.fromCodePoint(
          entity[1].toLowerCase() === 'x'
            ? parseInt(entity.slice(2), 16)
            : Number(entity.slice(1)),
        )
      }
      return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[entity]
    },
  )
}

function publicUrl(value) {
  const url = new URL(value)
  if (
    url.origin !== ORIGIN ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(`Unexpected sitemap/state URL: ${value}`)
  }
  return url
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/g)].map(
      ([, name, , value]) => [name.toLowerCase(), decodeXml(value)],
    ),
  )
}

async function snapshot({ buildDir, log }) {
  const entries = await sitemapEntries(buildDir)
  const pages = {}
  for (const entry of entries) {
    const url = publicUrl(
      decodeXml(/<loc>([^<]+)<\/loc>/.exec(entry)?.[1] ?? ''),
    )
    const loc = url.href
    const route = buildPath(buildDir, url)
    // Astro's build.format = 'file' emits /faq as faq.html, and / as index.html.
    const file = url.pathname.endsWith('/')
      ? path.join(route, 'index.html')
      : `${route}.html`
    let hash = null
    let metadataHash = null
    try {
      const html = await readFile(file, 'utf8')
      const head = /<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(html)?.[1] ?? ''
      const metadata = [
        ...head.matchAll(
          /<meta\b[^>]*>|<link\b[^>]*>|<title\b[^>]*>[\s\S]*?<\/title>|<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
        ),
      ]
        .map(([tag]) => {
          if (!/^<script/i.test(tag)) return tag
          const text = />([\s\S]*)<\/script>/i.exec(tag)[1]
          try {
            return `<script type="application/ld+json">${JSON.stringify(JSON.parse(text))}</script>`
          } catch {
            log(`IndexNow: malformed JSON-LD in ${loc}; hashing raw metadata`)
            return `<script type="application/ld+json">${text.trim().replace(/\s+/g, ' ')}</script>`
          }
        })
        .filter((tag) => {
          const attrs = attributes(tag)
          if (/^<link/i.test(tag))
            return /^(canonical|alternate)$/.test(attrs.rel)
          if (/^<meta/i.test(tag))
            return !/^(generator|viewport|theme-color|color-scheme|google-site-verification)$/i.test(
              attrs.name,
            )
          return true
        })
      if (
        metadata.some(
          (tag) =>
            /^(robots|bingbot|googlebot)$/i.test(attributes(tag).name) &&
            /\bnoindex\b|\bnone\b/i.test(attributes(tag).content),
        )
      )
        continue
      const canonical = metadata.find(
        (tag) => attributes(tag).rel === 'canonical',
      )
      if (canonical && new URL(attributes(canonical).href, loc).href !== loc)
        continue
      if (/<meta\b[^>]*http-equiv=["']refresh["']/i.test(head)) continue
      metadataHash = createHash('sha256')
        .update(metadata.join(''))
        .digest('hex')
      // The homepage has sections rather than a main element. Include all page
      // content, but omit the shared Navigation island, banner and PageFooter.
      const body = /<body\b[^>]*>[\s\S]*<\/body>/i.exec(html)?.[0]
      if (!body) throw new Error(`Missing body element in ${loc}`)
      const content = body
        .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(
          /<astro-island\b(?=[^>]*\bcomponent-export=["']Navigation["'])[^>]*>[\s\S]*?<\/astro-island>/gi,
          '',
        )
        .replace(/<link\b[^>]*>/gi, (tag) =>
          /\b(preload|modulepreload|prefetch|preconnect|dns-prefetch)\b/i.test(
            attributes(tag).rel ?? '',
          )
            ? ''
            : tag,
        )
        .replace(/<(nav|aside)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(
          /<footer\b(?=[^>]*\bclass=["'][^"']*\bfooter\b[^"']*["'])[^>]*>[\s\S]*?<\/footer>/gi,
          '',
        )
        // Hydration props, bundle URLs and scope IDs describe the build, not
        // the SSR content. Keep rendered island children and page image URLs.
        .replace(/<\/?astro-(island|slot|static-slot)\b[^>]*>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<[^>]+>/g, (tag) =>
          tag
            .replace(/\s(?:class|style)\s*=\s*(["'])[\s\S]*?\1/gi, '')
            .replace(
              /\sdata-astro-cid-[\w-]+(?:\s*=\s*(["'])[\s\S]*?\1)?/gi,
              '',
            ),
        )
      // Empty client-only shells use sitemap lastmod when available, while
      // still comparing search metadata. tus.io currently renders all pages.
      if (
        !content.replace(/<[^>]+>/g, '').trim() &&
        !/<(img|video|audio|svg|canvas)\b/i.test(content)
      ) {
        throw new Error(`Missing body content in ${loc}`)
      }
      hash = createHash('sha256')
        .update(metadata.join('') + content)
        .digest('hex')
    } catch (error) {
      if (error.code !== 'ENOENT' && !error.message.startsWith('Missing body'))
        throw error
      log(`IndexNow: sitemap diff fallback for ${loc}`)
    }
    pages[loc] = {
      hash,
      metadataHash,
      lastmod: /<lastmod>([^<]*)<\/lastmod>/.exec(entry)?.[1] ?? '',
    }
  }
  if (!Object.keys(pages).length)
    throw new Error('Empty sitemap snapshot; leaving previous state intact')
  return pages
}

function buildPath(buildDir, url) {
  const root = path.resolve(buildDir)
  const file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`)
  if (file !== root && !file.startsWith(`${root}${path.sep}`))
    throw new Error('URL outside the build')
  return file
}

async function sitemapEntries(buildDir) {
  let file = path.join(buildDir, 'sitemap-index.xml')
  let xml
  try {
    xml = await readFile(file, 'utf8')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    file = path.join(buildDir, 'sitemap.xml')
    xml = await readFile(file, 'utf8')
  }
  const seen = new Set()
  async function entries(file, xml) {
    if (seen.has(file)) throw new Error('Cyclic sitemap index')
    seen.add(file)
    if (/<urlset\b/.test(xml))
      return [...xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/g)].map(
        ([, entry]) => entry,
      )
    if (!/<sitemapindex\b/.test(xml))
      throw new Error('Expected a sitemap URL set or index')
    const result = []
    for (const [, entry] of xml.matchAll(
      /<sitemap\b[^>]*>([\s\S]*?)<\/sitemap>/g,
    )) {
      const url = publicUrl(
        decodeXml(/<loc>([^<]+)<\/loc>/.exec(entry)?.[1] ?? ''),
      )
      const child = buildPath(buildDir, url)
      result.push(...(await entries(child, await readFile(child, 'utf8'))))
    }
    return result
  }
  return entries(path.resolve(file), xml)
}

function validateState(state) {
  if (
    state?.version !== 1 ||
    !state.pages ||
    Array.isArray(state.pages) ||
    !Array.isArray(state.pending) ||
    !Number.isSafeInteger(state.generation ?? 0) ||
    (state.generation ?? 0) < 0
  ) {
    throw new Error('Invalid IndexNow state')
  }
  for (const [url, page] of Object.entries(state.pages)) {
    publicUrl(url)
    if (
      !page ||
      typeof page.lastmod !== 'string' ||
      (page.hash !== null && !/^[a-f0-9]{64}$/.test(page.hash)) ||
      (page.metadataHash != null && !/^[a-f0-9]{64}$/.test(page.metadataHash))
    ) {
      throw new Error('Invalid IndexNow page fingerprint')
    }
  }
  for (const url of state.pending) publicUrl(url)
  return { ...state, generation: state.generation ?? 0 }
}

async function restoreArtifact({ stateDir }) {
  if (!process.env.GITHUB_TOKEN) return undefined
  const options = {
    env: { ...process.env, GH_TOKEN: process.env.GITHUB_TOKEN },
    timeout: 20000,
  }
  const { stdout } = await exec(
    'gh',
    [
      'api',
      'repos/tus/tus.io/actions/artifacts',
      '-X',
      'GET',
      '-f',
      `name=${ARTIFACT}`,
      '-f',
      'per_page=100',
    ],
    options,
  )
  const artifact = JSON.parse(stdout)
    .artifacts.filter(
      (item) =>
        !item.expired &&
        item.workflow_run?.head_branch === 'main' &&
        item.workflow_run.head_repository_id ===
          item.workflow_run.repository_id,
    )
    .sort((a, b) => b.id - a.id)[0]
  if (!artifact) return undefined
  const directory = path.join(stateDir, 'restore')
  await mkdir(directory, { recursive: true })
  await exec(
    'gh',
    [
      'run',
      'download',
      String(artifact.workflow_run.id),
      '--repo',
      'tus/tus.io',
      '--name',
      ARTIFACT,
      '--dir',
      directory,
    ],
    options,
  )
  return validateState(
    JSON.parse(await readFile(path.join(directory, 'state.json'), 'utf8')),
  )
}

async function save(stateDir, state) {
  await mkdir(stateDir, { recursive: true })
  await writeFile(path.join(stateDir, 'state.json'), JSON.stringify(state))
}

async function request(fetchImpl, url, options = {}) {
  return fetchImpl(url, {
    ...options,
    signal: AbortSignal.timeout(15000),
    redirect: 'error',
  })
}

export async function prepare(options = {}) {
  const { buildDir, stateDir, fetchImpl, loadArtifact, log } = {
    ...defaults,
    ...options,
  }
  let cached
  try {
    cached = validateState(
      JSON.parse(await readFile(path.join(stateDir, 'state.json'), 'utf8')),
    )
  } catch (error) {
    if (error.code !== 'ENOENT') {
      log(`IndexNow: ignoring invalid cached state: ${error.message}`)
      // A failed recovery must not leave corrupt state available for archiving.
      await rm(path.join(stateDir, 'state.json'), { force: true })
    }
  }
  let deployed, artifact, recoveryError
  try {
    // Always compare generations: a cache hit may predate a failed cache save.
    const response = await request(fetchImpl, `${ORIGIN}/${STATE_FILE}`)
    if (response.status !== 404) {
      if (!response.ok)
        throw new Error(`Previous snapshot HTTP ${response.status}`)
      deployed = validateState(await response.json())
    }
  } catch (error) {
    recoveryError = error
    log(`IndexNow: live snapshot unavailable: ${error.message}`)
  }
  try {
    // A stale cache and CDN response can agree after a failed cache save. Always
    // consult the archive, which may contain newer pages or pending deletions.
    artifact = await loadArtifact({ stateDir })
  } catch (error) {
    recoveryError = error
    log(`IndexNow: artifact recovery unavailable: ${error.message}`)
  }
  // For the same deployment, cached/archived state includes POST acknowledgements
  // that the public pre-submission snapshot cannot include. Replays are harmless.
  const previous = [
    deployed,
    artifact && validateState(artifact),
    cached,
  ].reduce(
    (latest, state) =>
      state && (!latest || state.generation >= latest.generation)
        ? state
        : latest,
    undefined,
  )
  if (!previous && recoveryError) throw recoveryError
  if (previous) {
    // Preserve the recovery copy before any snapshot/key/preparation work can fail.
    await save(stateDir, previous)
    await writeFile(path.join(buildDir, STATE_FILE), JSON.stringify(previous))
  }
  const pages = await snapshot({ buildDir, log })
  const pending = new Set(previous?.pending ?? [])
  if (previous) {
    for (const url of new Set([
      ...Object.keys(previous.pages),
      ...Object.keys(pages),
    ])) {
      const before = previous.pages[url]
      const after = pages[url]
      if (
        !before ||
        !after ||
        before.hash !== after.hash ||
        (!before.hash &&
          !after.hash &&
          (before.lastmod !== after.lastmod ||
            before.metadataHash !== after.metadataHash))
      ) {
        pending.add(url)
      }
    }
  } else {
    log('IndexNow: first deploy baseline; no historical URLs submitted')
  }
  const state = {
    version: 1,
    generation: Math.max(Date.now(), (previous?.generation ?? 0) + 1),
    pages,
    pending: [...pending].sort(),
  }
  await save(stateDir, state)
  // Publish before submitting so a failed submission can be retried next deploy.
  await writeFile(path.join(buildDir, STATE_FILE), JSON.stringify(state))
  log(
    `IndexNow: ${Object.keys(pages).length} pages, ${state.pending.length} pending URLs`,
  )
}

export async function submit(options = {}) {
  const { buildDir, stateDir, fetchImpl, log, production } = {
    ...defaults,
    ...options,
  }
  if (!production) {
    log('IndexNow: skipping non-production deployment')
    return
  }
  const state = validateState(
    JSON.parse(await readFile(path.join(stateDir, 'state.json'), 'utf8')),
  )
  if (!state.pending.length) return
  const key = (
    await readFile(path.join(buildDir, 'indexnow.txt'), 'utf8')
  ).trim()
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key))
    throw new Error('Invalid IndexNow ownership key')
  const keyLocation = `${ORIGIN}/indexnow.txt`
  const ownership = await request(fetchImpl, keyLocation)
  if (!ownership.ok || (await ownership.text()).trim() !== key)
    throw new Error('IndexNow ownership key is not live yet')
  while (state.pending.length) {
    const urlList = state.pending.slice(0, 10000)
    const response = await request(
      fetchImpl,
      'https://api.indexnow.org/indexnow',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: 'tus.io', key, keyLocation, urlList }),
      },
    )
    // Keep 4xx notices too: a later key/payload correction can unblock them.
    // Discarding rejected batches would silently lose the user's requested updates.
    if (![200, 202].includes(response.status))
      throw new Error(
        `IndexNow HTTP ${response.status}; URLs retained for next deploy`,
      )
    state.pending.splice(0, urlList.length)
    await save(stateDir, state)
    log(
      `IndexNow: ${urlList.length} URLs accepted (HTTP ${response.status}${response.status === 202 ? ', key validation pending' : ''})`,
    )
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    const production =
      process.env.GITHUB_REPOSITORY === 'tus/tus.io' &&
      process.env.GITHUB_REF === 'refs/heads/main' &&
      ['push', 'workflow_dispatch'].includes(process.env.GITHUB_EVENT_NAME)
    if (!production) console.log('IndexNow: skipping non-production deployment')
    else if (process.argv[2] === 'prepare') await prepare()
    else if (process.argv[2] === 'submit') await submit({ production })
    else throw new Error('Usage: node scripts/indexnow.mjs prepare|submit')
  } catch (error) {
    // The workflow tolerates this failure and can distinguish failed preparation
    // from a baseline with no changed URLs before publishing/saving any state.
    console.warn(`::warning::${error.message}`)
    process.exitCode = 1
  }
}
