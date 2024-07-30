import { Octokit } from '@octokit/core'
import { paginateRest } from '@octokit/plugin-paginate-rest'
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'
import { retry } from '@octokit/plugin-retry'
import { throttling } from '@octokit/plugin-throttling'

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

const TusOctokit = Octokit.plugin(
  throttling,
  retry,
  restEndpointMethods,
  paginateRest,
)

export const octokit = new TusOctokit({
  request: { fetch: fetch },
  auth: import.meta.env.GITHUB_TOKEN
    ? `token ${import.meta.env.GITHUB_TOKEN}`
    : undefined,
  throttle: {
    onRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      )

      if (retryCount < 1) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`)
        return true
      }
    },
    onSecondaryRateLimit: (retryAfter, options, octokit, retryCount) => {
      octokit.log.warn(
        `SecondaryRateLimit detected for request ${options.method} ${options.url}`,
      )

      if (retryCount < 1) {
        // only retries once
        octokit.log.info(`Retrying after ${retryAfter} seconds!`)
        return true
      }
    },
  },
})
