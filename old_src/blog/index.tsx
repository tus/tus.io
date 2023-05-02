import type { EleventyPageData } from "types/types";
import styles from "./blog.module.css";
import { getFirstParagraphContent } from "../../src/lib/getFirstParagraph";
import PageFooter from "./_islands/PageFooter";
import Html from "./_islands/Html";

export const frontmatter = {
  title: "Blog",
  layout: "default",
};

export default function BlogPage(props: EleventyPageData) {
  const { authors, collections } = props;

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <main class={styles.root}>
        <h1>Blog</h1>

        <ol class={styles.list}>
          {[...collections.post].reverse().map((post) => {
            const author = authors[post.data.author];

            return (
              <li key={post.url} class={styles.item}>
                <article class={styles.post}>
                  <a href={post.url} class={styles.title}>
                    <h2>{post.data.title}</h2>
                  </a>
                  <p class={styles.meta}>
                    Published on {formatter.format(post.date)} by {author.name}
                  </p>
                  <div class={styles.excerpt}>
                    <Html>{getFirstParagraphContent(post.content)}</Html>
                  </div>
                  <a href="">Read on &rarr;</a>
                </article>
              </li>
            );
          })}
        </ol>
      </main>
      <PageFooter />
    </>
  );
}
