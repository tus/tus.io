import cx from "clsx";
import styles from "./Container.module.css";
import type preact from "preact";

type ContainerProps = {
	children: preact.ComponentChildren;
	className?: string;
};

export default function Container(props: ContainerProps) {
	const { children, className } = props;
	return <div class={cx(styles.container, className)}>{children}</div>;
}
