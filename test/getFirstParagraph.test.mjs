import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getFirstParagraphContent } from '../src/lib/getFirstParagraph.ts'

test('renders only the first paragraph as HTML', () => {
  const markdown =
    '# Heading\n\nHello **world** and [tus](https://tus.io). {shortcode}\n\nSecond paragraph.'

  assert.equal(
    getFirstParagraphContent(markdown),
    '<p>Hello <strong>world</strong> and <a href="https://tus.io">tus</a>. </p>',
  )
})

test('returns an empty excerpt when there is no paragraph', () => {
  assert.equal(getFirstParagraphContent('# Heading\n\n- item'), '')
})
