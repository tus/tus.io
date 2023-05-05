import { request } from '@octokit/request'

const user = 'tus'
const repos = [
  'tus.io',
  'tusd',
  'tus-js-client',
  'TUSKit',
  'tus-android-client',
  'tus-java-client',
  'tus-node-server',
  'tus-resumable-upload-protocol',
]

/**
 * Get paginated data for all tus repositories
 */
export async function getGitHubData(...params: Parameters<typeof request>) {
  const [url, options] = params

  let page = 1

  const data = (
    await Promise.all(
      repos.map(async (repo) => {
        let { data } = await doGitHubRequest(url, {
          owner: user,
          repo,
          page,
          per_page: 100,
          ...options,
        })

        let next = data.length === 100

        while (next) {
          page++

          const { data: newData } = await doGitHubRequest(url, {
            owner: user,
            repo,
            page,
            per_page: 100,
            ...options,
          })

          data = [...data, ...newData]
          next = newData.length === 100
        }

        return data
      })
    )
  ).flat()

  return data
}

export async function doGitHubRequest(...params: Parameters<typeof request>) {
  const [url, options] = params

  return request(url, {
    ...options,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: import.meta.env.GITHUB_TOKEN
        ? `token ${import.meta.env.GITHUB_TOKEN}`
        : undefined,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
}
