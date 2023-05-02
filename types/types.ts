import type { PublicOrgEvents } from "../old_src/_islands/TusOnGithub/types";

export type Author = {
  name: string;
  gravatar: string;
  email: string;
  web: string;
  twitter: string;
  github: string;
};

type Authors = Record<string, Author>;

export type EleventyPageData = {
  authors: Authors;
  collections: {
    post: {
      url: string;
      date: Date;
      content: string;
      data: {
        author: keyof Authors;
        title: string;
      };
    }[];
  };
  features: {
    title: string;
    content: string;
  }[];
  githubActivity: PublicOrgEvents;
  implementations: {
    name: string;
    icon: string;
    repo: string;
  }[];
  logos: {
    url: string;
    src: string;
    name: string;
  }[];
  press: {
    url: string;
    src: string;
    name: string;
  }[];
};
