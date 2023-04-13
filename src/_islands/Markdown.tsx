import { createElement, Fragment } from "preact";
import { useRemarkSync } from "react-remark";
import type { Options } from "rehype-react";

type MarkdownProps = {
  children: string;
  components?: Options["components"];
};

export default function Markdown(props: MarkdownProps) {
  const { children, components } = props;

  const markdown = useRemarkSync(children, {
    remarkToRehypeOptions: { allowDangerousHtml: true },
    rehypeReactOptions: { createElement, Fragment, components },
  });

  return markdown;
}
