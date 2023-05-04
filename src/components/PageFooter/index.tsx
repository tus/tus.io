import Social from "../Social";
import styles from "./style.module.css";

type PageFooterProps = {
  comments?: boolean;
  social: boolean;
};

export default function PageFooter(props: PageFooterProps) {
  const { comments, social } = props;
  return (
    <div class={styles.root}>
      <footer class={styles.footer}>
        {social && (
          <div class={styles.social}>
            <p>Subscribe to, or say hello to our community</p>
            <Social includeRss />
          </div>
        )}

        {comments && (
          <div class={styles.comments}>
            <p>
              Do you have a comment? Let us know in the{" "}
              <a href="https://community.transloadit.com/c/tus">forum</a> or on{" "}
              <a
                href="https://twitter.com/tus_io/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Twitter
              </a>
              .
            </p>
          </div>
        )}
      </footer>
    </div>
  );
}
