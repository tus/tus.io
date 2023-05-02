import type { Root } from "hast";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified, type Plugin } from "unified";

const extractFirstParagraph: Plugin<[], Root> = () => {
  return (tree) => {
    const root = tree;

    const children = [];

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

const htmlToFirstP = unified()
  .use(rehypeParse, { fragment: true })
  .use(extractFirstParagraph)
  .use(rehypeStringify);

export function getFirstParagraphContent(html: string) {
  const shortcodeRe = /\{[^}]*\}/g;

  const result = htmlToFirstP.processSync(html);

  return (result.value as string).replace(shortcodeRe, "");
}
