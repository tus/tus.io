import type { PublicOrgEvents } from '@/components/TusOnGithub/types'

export interface Author {
  name: string
  gravatar: string
  email: string
  web: string
  twitter: string
  github: string
}

type Authors = Record<string, Author>

export interface EleventyPageData {
  authors: Authors
  collections: {
    post: {
      url: string
      date: Date
      content: string
      data: {
        author: keyof Authors
        title: string
      }
    }[]
  }
  features: {
    title: string
    content: string
  }[]
  githubActivity: PublicOrgEvents
  implementations: {
    name: string
    icon: string
    repo: string
  }[]
  logos: {
    url: string
    src: string
    name: string
  }[]
  press: {
    url: string
    src: string
    name: string
  }[]
}
