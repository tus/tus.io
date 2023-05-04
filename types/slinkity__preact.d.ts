declare module "@slinkity/preact" {
	import type { UserConfig } from "slinkity";
	const renderer: () => UserConfig["renderers"] extends (infer R)[] ? R : never;
	export = renderer;
}
