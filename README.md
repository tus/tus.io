# tus.io

## Development

**Getting ready**

- `git clone github.com/tus/tus.io && cd tus.io`
- `yarn install`
- `yarn dev`

The site is automatically published to GitHub Pages on any commits to the `main`
branch.

### IndexNow notifications

After a successful production deployment from `main`, GitHub Actions notifies
[IndexNow](https://www.indexnow.org/documentation) about added, edited and
removed public sitemap URLs. The first run establishes a baseline without
submitting historical pages. Builds, tests, previews and deployments from other
branches or repositories do not submit URLs.

`scripts/indexnow.mjs` follows the design in
[uppy.io#467](https://github.com/transloadit/uppy.io/pull/467), adapted to
Astro's sitemap index and `build.format: 'file'`. It compares rendered page
content and search metadata while ignoring shared navigation, the banner,
footer, CSS scope IDs and hydration/bundle references. If rendered HTML is
missing or empty, it falls back to sitemap URL and `lastmod` differences, while
preserving metadata comparisons when possible. Astro currently emits no
`lastmod`, so this fallback detects additions/removals and metadata edits, but
cannot detect body edits to an unrendered page. All current public pages render
HTML.

The public ownership key in `public/indexnow.txt` is served at `/indexnow.txt`;
it needs no secret, new dependency or paid service. The script verifies the live
key before submitting up to 10,000 URLs per request. HTTP 202 means acceptance
with key validation pending; acceptance does not guarantee indexing.

The production snapshot and pending notifications live in an Actions cache and a
90-day artifact; `/indexnow-state.json` provides another recovery copy. Build
and deploy run in one job, so retrying even an older workflow rebuilds and
prepares against current production state before publishing. Only a successful
deployment can submit and save that state. Generations prevent stale cache
restores from dropping newer notices. Failed notifications stay pending for the
next production deployment, including rejected 4xx requests. Recovery can repeat
accepted URLs. Optional steps have time limits and tolerate failure, so IndexNow
errors never fail a deployment.

Every preparation checks the archive even if the cache and live snapshot agree;
both can be stale after a failed cache save. Archive names record the snapshot
generation, so retrying an older deploy cannot hide a newer archive. Recovery
checks all artifact-list pages and prefers the highest generation. If archive
recovery fails, preparation preserves the checkpoint rather than advancing past
potentially newer notices. Failed preparation never archives unvalidated state.
A recovered valid snapshot is copied into the site before preparing changes, so
that recovery survives a later preparation failure. Live GitHub activity and
contributor-list updates are rendered page content and intentionally count as
edits.

The public snapshot contains only public URLs, fingerprints, sitemap timestamps
and pending URLs. The state recovery, queue and submission logic could be shared
with uppy.io; sitemap paths and rendered-content normalization are
site-specific. This implementation remains self-contained. Run `yarn test` for
the behavioral tests; their network requests are stubbed.

**Philosophy/rules**

- Do not hydrate components unless strictly necessary
  - This reduces the amount of JavaScript shipped to users' browsers.
- Write scoped CSS as much as possible.
  - Avoids CSS collisions.
  - Makes CSS dependencies explicit, allowing for easier editing.
  - Astro components and CSS Modules import for Preact components make this
    easy.
- Write semantic HTML.
- Use Astro components for static reusable components.
- Use Preact components for interactive components.

## Content editing

Page content is located in `src/pages`. Routing is file-based, meaning that both
the directory and names of files determine the URL of the page. For example,
`src/pages/docs/clients/node.md` will be available at `/docs/clients/node`.

It is possible to write pages in Markdown, MDX or Astro. The latter two allow
for interactive features, such as embedding Preact components. If you want to
use an interactive component on a page, make sure you
[instruct Astro to hydrate](https://docs.astro.build/en/core-concepts/framework-components/#hydrating-interactive-components)
the component. See `src/pages/demo.mdx` for an example of how that would look.

Content collections, currently blog posts, features and protocols, are placed in
`src/content`. Pages are not automatically generated from content collections.
Instead, the content collections are consumed in pages, for instance in
`src/pages/blog/index.astro` for the blog feed page. Route generation for single
blog posts is handled in `src/pages/blog/[...slug].astro`. The pages are
generally also where layouts are applied.

Not automatically generating pages is useful because content collections can be
used in various ways. The features collection for instance, does not have pages,
but it's Markdown contents are instead rendered on the homepage.

The protocols contents are generated by `yarn inject` and should not be edited
manually.

## Directory structure

- `src/pages` - Pages
- `src/components` - Reusable components
- `src/content` - Content collections and their configuration
- `src/layouts` - Layouts
- `src/styles` - Global styles
- `src/assets` - Any images placed here and linked to from `img` tags in Astro
  templates, Markdown image definitions, or imported from `.ts(x)` files will be
  automatically optimized by Astro
- `src/lib` - Utility functions
- `src/types` - Type definitions

## Releasing a new version of the `tus` protocol

Assuming `tus/tus-resumable-upload-protocol` has been updated with the new
version.

- Add the new version to `./scripts/inject-protocol.sh`
- `chmod +x ./scripts/inject-protocol.sh`
- `yarn inject`
- Commit the changes and push
