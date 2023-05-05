import { createElement, Fragment } from 'preact'
import { useRemarkSync } from 'react-remark'
import type { Options } from 'rehype-react'
import type preact from 'preact'

type MarkdownProps = {
  children: string
  components?: Options['components']
}

export default function Markdown(props: MarkdownProps) {
  const { children, components } = props

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const markdown = useRemarkSync(children, {
    remarkToRehypeOptions: { allowDangerousHtml: true },
    rehypeReactOptions: { createElement, Fragment, components },
  })

  return markdown as preact.JSX.Element
}
