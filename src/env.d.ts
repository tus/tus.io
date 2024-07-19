// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN?: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
