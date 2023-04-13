import styles from "./VisuallyHidden.module.css";

export default function VisuallyHidden(props: {
  children: preact.ComponentChildren;
}) {
  const { children } = props;
  return <span class={styles.root}>{children}</span>;
}
