import type { EleventyPageData } from "types/types";
import styles from "./blog.module.css";
import { getFirstParagraphContent } from "./lib/getFirstParagraph";
import PageFooter from "./_islands/PageFooter";

export const frontmatter = {
  title: "Blog",
  layout: "default",
};

export default function BlogPage(props: EleventyPageData) {
  const { authors, collections } = props;

  const { format: formatDate } = new Intl.DateTimeFormat("en-US", {
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
              <li class={styles.item}>
                <article class={styles.post}>
                  <a href={post.url} class={styles.title}>
                    <h2>{post.data.title}</h2>
                  </a>
                  <p class={styles.meta}>
                    Published on {formatDate(post.date)} by {author.name}
                  </p>
                  <div
                    class={styles.excerpt}
                    dangerouslySetInnerHTML={{
                      __html: getFirstParagraphContent(post.content),
                    }}
                  />
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
