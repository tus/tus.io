import rehypePrism from "@mapbox/rehype-prism";
import { createElement, Fragment } from "preact";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import type preact from "preact";

type HtmlProps = {
	children: string;
};

const htmlToPreact = unified()
	.use(rehypeParse, { fragment: true })
	.use(rehypePrism)
	.use(rehypeReact, { createElement, Fragment });

export default function Html(props: HtmlProps) {
	const { children } = props;

	const node = htmlToPreact.processSync(children);

	return node.result as preact.JSX.Element;
}
