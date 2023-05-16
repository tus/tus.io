import { format } from 'timeago.js'
import { useSignal } from '@preact/signals'
import styles from './style.module.css'
import { useEffect } from 'preact/hooks'
import { ExternalA } from '../ExternalA'
import type { PublicOrgEvents } from './types'
import type { getGitHubActivity } from '@/lib/getGitHubActivity'

type ActivityDescriptionProps = {
  activity: PublicOrgEvents[number]
}

function ActivityDescription(props: ActivityDescriptionProps) {
  const { activity } = props

  const repo = (
    <ExternalA href={`https://github.com/${activity.repo.name}`}>
      {activity.repo.name}
    </ExternalA>
  )

  const actor = (
    <ExternalA href={`https://github.com/${activity.actor.login}`}>
      {activity.actor.display_login ?? activity.actor.login}
    </ExternalA>
  )

  switch (activity.type) {
    case 'IssuesEvent': {
      const isClosed = activity.payload.issue?.state === 'closed'
      let issue = (
        <ExternalA href={activity.payload.issue?.url}>
          {activity.payload.issue?.title}
        </ExternalA>
      )
      issue = isClosed ? <s>{issue}</s> : issue

      const action = (
        <span>
          {activity.payload.action} issue {issue} on
        </span>
      )

      return (
        <p class={styles.description}>
          {actor} {action} on {repo}
        </p>
      )
    }
    case 'CommitCommentEvent': {
      const action = (
        <span>
          commented “
          <span>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: activity.payload.comment?.body ?? '',
              }}
            />
          </span>
          ” on a commit to{' '}
          <ExternalA href={activity.payload.comment?.html_url}>
            {activity.payload.comment?.path}
          </ExternalA>
        </span>
      )
      return (
        <p class={styles.description}>
          {actor} {action} in {repo}
        </p>
      )
    }
    case 'IssueCommentEvent': {
      const isClosed = activity.payload.issue?.state === 'closed'

      let issue = (
        <ExternalA href={activity.payload.comment?.html_url}>
          {activity.payload.issue?.title}
        </ExternalA>
      )
      issue = isClosed ? <s>{issue}</s> : issue

      const action = <span>commented on {issue}</span>

      return (
        <p class={styles.description}>
          {actor} {action} in {repo}
        </p>
      )
    }
    case 'PushEvent': {
      if (!activity.payload.commits?.length) {
        return (
          <p class={styles.description}>
            {actor} pushed to {repo}
          </p>
        )
      }

      const n = activity.payload.commits.length
      const firstCommit = activity.payload.commits[0].sha
      const firstUrl = activity.payload.commits[0].url
      const lastCommit =
        activity.payload.commits[activity.payload.commits.length - 1].sha

      const compareUrl = firstUrl
        .replace('commit', 'compare')
        .replace(firstCommit, firstCommit + '...' + lastCommit)

      const action = (
        <span>
          pushed{' '}
          <a href={n === 1 ? firstUrl : compareUrl}>
            {n} commit{n > 1 && 's'}
          </a>{' '}
          to
        </span>
      )

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      )
    }
    case 'ForkEvent': {
      return (
        <p class={styles.description}>
          {actor} forked {repo}
        </p>
      )
    }
    case 'WatchEvent': {
      return (
        <p class={styles.description}>
          {actor} is now watching {repo}
        </p>
      )
    }
    case 'PullRequestEvent': {
      const action = (
        <span>
          {activity.payload.action} pull request{' '}
          <ExternalA href={activity.payload.pull_request?.html_url}>
            {activity.payload.pull_request?.title}
          </ExternalA>{' '}
          for
        </span>
      )

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      )
    }
    case 'PullRequestReviewEvent': {
      const action = (
        <span>
          {activity.payload.review?.state === 'commented'
            ? 'commented on'
            : activity.payload.review?.state}{' '}
          pull request{' '}
          <ExternalA href={activity.payload.pull_request?.html_url}>
            {activity.payload.pull_request?.title}
          </ExternalA>{' '}
          in
        </span>
      )

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      )
    }
    case 'CreateEvent': {
      const action = <span>created a new {activity.payload.ref_type} in</span>

      const branch = (
        <ExternalA
          href={`https://github.com/${activity.repo.name}/tree/${
            activity.payload.ref ?? ''
          }`}
        >
          {activity.payload.ref}
        </ExternalA>
      )

      return (
        <p class={styles.description}>
          {actor} {action} {repo}: {branch}
        </p>
      )
    }
    case 'ReleaseEvent': {
      const action = (
        <span>
          {activity.payload.action}{' '}
          <ExternalA href={activity.payload.release?.html_url}>
            {activity.payload.release?.name}
          </ExternalA>{' '}
          in
        </span>
      )

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      )
    }
    default: {
      return null
    }
  }
}

type TusOnGithubProps = {
  githubActivity: PublicOrgEvents
}

// duplicate or irrelevant data
const filteredTypes = ['DeleteEvent', 'PullRequestReviewCommentEvent']

export default function TusOnGithub(props: TusOnGithubProps) {
  const { githubActivity } = props

  const activity = useSignal<PublicOrgEvents>(githubActivity)

  useEffect(() => {
    const update = async () => {
      const { getGitHubActivity } = await import('@/lib/getGitHubActivity')
      const data = await getGitHubActivity()
      activity.value = data
    }

    update().catch((e) => console.error(e))
  }, [activity])

  return (
    <ol class={styles.list}>
      {activity.value
        .filter((a) => a.type && !filteredTypes.includes(a.type))
        .map((a) => {
          return (
            <li key={a.id} class={styles.item}>
              <img
                src={a.actor.avatar_url}
                alt={`Avatar of ${a.actor.display_login ?? a.actor.login}`}
                class={styles.avatar}
                loading="lazy"
                width="460"
                height="460"
              />
              <time dateTime={a.created_at ?? undefined} class={styles.time}>
                {a.created_at
                  ? format(new Date(a.created_at), 'en_US')
                  : undefined}
              </time>
              <ActivityDescription activity={a} />
            </li>
          )
        })}
    </ol>
  )
}
