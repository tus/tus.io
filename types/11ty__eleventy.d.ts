declare module "@11ty/eleventy" {
  interface UserConfig {
    addPassthroughCopy: (path: string) => void;
    addPlugin: (plugin: unknown, config: object) => void;
    ignores: string[] & {
      add: (path: string) => void;
    };
  }

  export type { UserConfig };
}
