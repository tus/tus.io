import { createElement, Fragment } from "preact";
import { useRemarkSync } from "react-remark";
import type { ComponentOptions } from "rehype-react";

type MarkdownProps = {
  children: string;
  components?: ComponentOptions<typeof createElement>["components"];
};

export default function Markdown(props: MarkdownProps) {
  const { children, components } = props;

  const markdown = useRemarkSync(children, {
    rehypeReactOptions: { createElement, Fragment, components },
  });

  return markdown;
}
