import rehypePrism from "@mapbox/rehype-prism";
import { createElement, Fragment } from "preact";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";

type HtmlProps = {
  children: string;
};

export default function Html(props: HtmlProps) {
  const { children } = props;

  const node = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypePrism)
    .use(rehypeReact, { createElement, Fragment })
    .processSync(children);

  return node.result as JSX.Element;
}
