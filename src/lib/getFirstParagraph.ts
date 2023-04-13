import { Plugin, unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { Root, Node } from "hast";

export function getFirstParagraphContent(html: string) {
  const result = unified()
    .use(rehypeParse, { fragment: true })
    .use(extractFirstParagraph)
    .use(rehypeStringify)
    .processSync(html);

  const shortcodeRe = /\{[^\}]*\}/g;

  return (result.value as string).replace(shortcodeRe, "");
}

const extractFirstParagraph: Plugin<[], Root> = () => {
  return (tree) => {
    let root = tree;

    let children = [];

    for (const node of root.children) {
      if (node.type !== "element") continue;
      if (node.tagName !== "p") continue;
      children.push(node);
      break;
    }

    root.children = children;

    return root;
  };
};
