import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import remarkToc from 'remark-toc'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  site: 'https://tus.io',
  integrations: [
    preact({
      compat: true,
    }),
    sitemap(),
    mdx(),
  ],
  build: {
    format: 'file',
  },
  experimental: {
    assets: true,
  },
  markdown: {
    // See https://github.com/remarkjs/remark-toc
    remarkPlugins: [[remarkToc, { tight: true, maxDepth: 2, ordered: true }]],
    shikiConfig: {
      theme: 'github-light',
    },
  },
})
