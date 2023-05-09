import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import a11yEmoji from '@fec/remark-a11y-emoji'
import { defineConfig } from 'astro/config'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import remarkEmoji from 'remark-emoji'

// https://astro.build/config
export default defineConfig({
  site: 'https://tus.io',
  integrations: [preact({ compat: true }), sitemap(), mdx()],
  build: {
    format: 'file',
  },
  experimental: {
    assets: true,
  },
  markdown: {
    // See https://github.com/remarkjs/remark-toc
    remarkPlugins: [
      [remarkEmoji, { accessible: true, emoticon: true }],
      [remarkToc, { tight: true, maxDepth: 2, ordered: true }],
    ],
    rehypePlugins: [rehypeHeadingIds, rehypeAutolinkHeadings],
    shikiConfig: {
      theme: 'github-light',
    },
  },
})
