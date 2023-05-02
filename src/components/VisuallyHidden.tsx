import styles from "./VisuallyHidden.module.css";
import type preact from "preact";

export default function VisuallyHidden(props: {
  children: preact.ComponentChildren;
}) {
  const { children } = props;
  return <span class={styles.root}>{children}</span>;
}
