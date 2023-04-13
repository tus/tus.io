import { formatDate } from "../../lib/format";
import { Author } from "types/types";
import styles from "./style.module.css";
import Html from "../Html";

type PostLayoutProps = {
  title: string;
  content: string;
  author: Author;
  date: Date;
};

export default function PostLayout(props: PostLayoutProps) {
  const { title, content, author, date } = props;

  return (
    <article class={styles.post}>
      <h1 class={styles.title}>{title}</h1>
      <p class={styles.meta}>
        Published on {formatDate(date)} by{" "}
        <a
          href={
            author.web ? author.web : `https://twitter.com/${author.twitter}`
          }
          rel="noopener noreferrer"
          target="_blank"
        >
          {author.name}
        </a>
      </p>

      <div class={styles.content}>
        <Html>{content}</Html>
      </div>
    </article>
  );
}
