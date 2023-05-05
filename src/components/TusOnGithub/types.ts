import type { GetResponseDataTypeFromEndpointMethod } from '@octokit/types'
import type { Octokit } from '@octokit/rest'

export type PublicOrgEvents = (GetResponseDataTypeFromEndpointMethod<
  InstanceType<typeof Octokit>['rest']['activity']['listPublicOrgEvents']
>[number] & {
  // the Octokit type definitions are missing some of the data returned by the API
  payload: {
    comment?: {
      path: string
    }
    commits?: {
      sha: string
      url: string
    }[]
    pull_request?: {
      html_url: string
      title: string
    }
    ref?: string
    ref_type?: 'branch' | 'tag'
    release?: {
      html_url: string
      name: string
    }
    review?: {
      state: 'commented'
    }
  }
})[]
