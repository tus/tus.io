import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import type { Octokit } from "@octokit/rest";

type Authors = Record<
  string,
  {
    name: string;
    gravatar: string;
    email: string;
    web: string;
    twitter: string;
    github: string;
  }
>;

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
  githubActivity: GetResponseDataTypeFromEndpointMethod<
    InstanceType<typeof Octokit>["rest"]["activity"]["listPublicOrgEvents"]
  >;
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
