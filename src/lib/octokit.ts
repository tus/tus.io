import { Octokit } from '@octokit/core'
import { paginateRest } from '@octokit/plugin-paginate-rest'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
import { retry } from '@octokit/plugin-retry'

export const user = 'tus'

export const repos = [
  'tus.io',
  'tusd',
  'tus-js-client',
  'TUSKit',
  'tus-android-client',
  'tus-java-client',
  'tus-node-server',
  'tus-resumable-upload-protocol',
]

const TusOctokit = Octokit.plugin(retry, restEndpointMethods, paginateRest)

export const octokit = new TusOctokit({
  auth: import.meta.env.GITHUB_TOKEN
    ? `token ${import.meta.env.GITHUB_TOKEN}`
    : undefined,
})
