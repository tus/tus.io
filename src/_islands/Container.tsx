import cx from "clsx";
import styles from "./Container.module.css";

type ContainerProps = {
  children: preact.ComponentChildren;
  className?: string;
};

export default function Container(props: ContainerProps) {
  const { children, className } = props;
  return <div class={cx(styles.container, className)}>{children}</div>;
}
