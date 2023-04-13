import { format } from "timeago.js";
import { useSignal } from "@preact/signals";
import type { GetResponseDataTypeFromEndpointMethod } from "@octokit/types";
import styles from "./style.module.css";
import { useEffect } from "preact/hooks";
import type { Octokit } from "@octokit/rest";

function ExternalA(props: {
  href: string;
  children: preact.ComponentChildren;
}) {
  const { href, children } = props;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

type ActivityDescriptionProps = {
  // & any because the Octokit types are not very good, they only include common event data
  activity: TusOnGithubProps["githubActivity"][number] & any;
};

function ActivityDescription(props: ActivityDescriptionProps) {
  const { activity } = props;

  const repo = (
    <ExternalA href={`https://github.com/${activity.repo.name}`}>
      {activity.repo.name}
    </ExternalA>
  );

  const actor = (
    <ExternalA href={`https://github.com/${activity.actor.login}`}>
      {activity.actor.display_login ?? activity.actor.login}
    </ExternalA>
  );

  let action = <span></span>;

  switch (activity.type) {
    case "IssuesEvent": {
      let isClosed = activity.payload.issue?.state === "closed";
      let issue = (
        <ExternalA href={activity.payload.issue?.url!}>
          {activity.payload.issue?.title}
        </ExternalA>
      );
      issue = isClosed ? <s>{issue}</s> : issue;

      let action = (
        <span>
          {activity.payload.action} issue {issue} on
        </span>
      );

      return (
        <p class={styles.description}>
          {actor} {action} on {repo}
        </p>
      );
    }
    case "CommitCommentEvent": {
      let action = (
        <span>
          commented “
          <span
            dangerouslySetInnerHTML={{
              __html: activity.payload.comment?.body ?? "",
            }}
          />
          ” on a commit to{" "}
          <ExternalA href={activity.payload.comment?.html_url!}>
            {activity.payload.comment?.path!}
          </ExternalA>
        </span>
      );
      return (
        <p class={styles.description}>
          {actor} {action} in {repo}
        </p>
      );
    }
    case "IssueCommentEvent": {
      let isClosed = activity.payload.issue?.state === "closed";

      let issue = (
        <ExternalA href={activity.payload.comment?.html_url!}>
          {activity.payload.issue?.title}
        </ExternalA>
      );
      issue = isClosed ? <s>{issue}</s> : issue;

      let action = <span>commented on {issue}</span>;

      return (
        <p class={styles.description}>
          {actor} {action} in {repo}
        </p>
      );
    }
    case "PushEvent": {
      if (!activity.payload.commits?.length) {
        return (
          <p class={styles.description}>
            {actor} pushed to {repo}
          </p>
        );
      }

      let n = activity.payload.commits.length;
      let firstCommit = activity.payload.commits[0].sha;
      let firstUrl = activity.payload.commits[0].url;
      let lastCommit =
        activity.payload.commits[activity.payload.commits.length - 1].sha;

      let compareUrl = firstUrl
        .replace("commit", "compare")
        .replace(firstCommit, firstCommit + "..." + lastCommit);

      let action = (
        <span>
          pushed{" "}
          <a href={n === 1 ? firstUrl : compareUrl}>
            {n} commit{n > 1 && "s"}
          </a>{" "}
          to
        </span>
      );

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      );
    }
    case "ForkEvent": {
      return (
        <p class={styles.description}>
          {actor} forked {repo}
        </p>
      );
    }
    case "WatchEvent": {
      return (
        <p class={styles.description}>
          {actor} is now watching {repo}
        </p>
      );
    }
    case "PullRequestEvent": {
      let action = (
        <span>
          {activity.payload.action} pull request{" "}
          <ExternalA href={activity.payload.pull_request.html_url}>
            {activity.payload.pull_request.title}
          </ExternalA>{" "}
          for
        </span>
      );

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      );
    }
    case "PullRequestReviewEvent": {
      let action = (
        <span>
          {activity.payload.review?.state === "commented"
            ? "commented on"
            : activity.payload.review?.state}{" "}
          pull request{" "}
          <ExternalA href={activity.payload.pull_request.html_url}>
            {activity.payload.pull_request.title}
          </ExternalA>{" "}
          in
        </span>
      );

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      );
    }
    case "CreateEvent": {
      let action = <span>created a new {activity.payload.ref_type} in</span>;

      let branch = (
        <ExternalA
          href={`https://github.com/${activity.repo.name}/tree/${activity.payload.ref}`}
        >
          {activity.payload.ref}
        </ExternalA>
      );

      return (
        <p class={styles.description}>
          {actor} {action} {repo}: {branch}
        </p>
      );
    }
    case "ReleaseEvent": {
      let action = (
        <span>
          {activity.payload.action}{" "}
          <ExternalA href={activity.payload.release.html_url}>
            {activity.payload.release.name}
          </ExternalA>{" "}
          in
        </span>
      );

      return (
        <p class={styles.description}>
          {actor} {action} {repo}
        </p>
      );
    }
    default: {
      return null;
    }
  }
}

type TusOnGithubProps = {
  githubActivity: GetResponseDataTypeFromEndpointMethod<
    InstanceType<typeof Octokit>["rest"]["activity"]["listPublicOrgEvents"]
  >;
};

// duplicate or irrelevant data
const filteredTypes = ["DeleteEvent", "PullRequestReviewCommentEvent"];

export default function TusOnGithub(props: TusOnGithubProps) {
  const { githubActivity } = props;

  const activity = useSignal<typeof githubActivity>(githubActivity);

  useEffect(() => {
    const update = async () => {
      try {
        const { Octokit } = await import("https://esm.sh/@octokit/rest");
        const octokit = new Octokit();

        const { data } = await octokit.rest.activity.listPublicOrgEvents({
          org: "tus",
          per_page: 20,
          mediaType: {
            format: "html",
          },
        });

        activity.value = data;
      } catch {
        // do nothing
      }
    };

    update();
  }, []);

  return (
    <ol class={styles.list}>
      {activity.value
        .filter((a) => a.type && !filteredTypes.includes(a.type))
        .map((a) => {
          return (
            <li key={a.id} class={styles.item}>
              <img
                src={a.actor.avatar_url}
                alt={`Avatar of ${a.actor.display_login}`}
                class={styles.avatar}
                loading="lazy"
                width="460"
                height="460"
              />
              <time dateTime={a.created_at ?? undefined} class={styles.time}>
                {a.created_at
                  ? format(new Date(a.created_at), "en_US")
                  : undefined}
              </time>
              <ActivityDescription activity={a} />
            </li>
          );
        })}
    </ol>
  );
}
