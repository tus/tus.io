import type { Root } from 'mdast'
import remarkParse from 'remark-parse'
import rehypeStringify from 'rehype-stringify'
import { unified, type Plugin } from 'unified'
import remarkRehype from 'remark-rehype'

const extractFirstParagraph: Plugin<[], Root> = () => {
  return (tree: Root) => {
    const root = tree

    const children = []

    for (const node of root.children) {
      if (node.type !== 'paragraph') continue
      children.push(node)
      break
    }

    root.children = children

    return root
  }
}

const markdownToFirstP = unified()
  .use(remarkParse)
  .use(extractFirstParagraph)
  .use(remarkRehype)
  .use(rehypeStringify)

export function getFirstParagraphContent(markdown: string) {
  const shortcodeRe = /\{[^}]*\}/g

  const result = markdownToFirstP.processSync(markdown)

  return (result.value as string).replace(shortcodeRe, '')
}
