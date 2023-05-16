import type { PublicOrgEvents } from '@/components/TusOnGithub/types'
import { octokit, user } from './octokit'

// Keep this in sync with the supported event types in src/components/TusOnGithub
const supportedTypes = [
  'IssuesEvent',
  'CommitCommentEvent',
  'IssueCommentEvent',
  'PushEvent',
  'ForkEvent',
  'WatchEvent',
  'PullRequestEvent',
  'PullRequestReviewEvent',
  'CreateEvent',
  'ReleaseEvent',
]

export async function getGitHubActivity(): Promise<PublicOrgEvents> {
  try {
    const { data } = await octokit.rest.activity.listPublicOrgEvents({
      org: user,
      per_page: 50,
      mediaType: {
        format: 'html',
      },
    })

    return data.filter((d) => supportedTypes.includes(d.type)).slice(0, 20)
  } catch (error) {
    console.log(error)
    return []
  }
}
