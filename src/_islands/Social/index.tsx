import clsx from "clsx";
import communityForumLogo from "./community-forum-35a78b.svg";
import rssFeedIcon from "./rss-feed-orange.svg";
import styles from "./style.module.css";

type SocialProps = {
  includeRss?: boolean;
  centered?: boolean;
};

export default function Social(props: SocialProps) {
  const { centered, includeRss } = props;

  return (
    <div class={clsx(styles.social, { [styles.centered]: centered })}>
      <a
        href="https://community.transloadit.com/c/tus"
        class="community-forum-button"
      >
        <img src={communityForumLogo} />
      </a>

      <a
        href="https://twitter.com/tus_io"
        class="twitter-follow-button"
        data-dnt="true"
        data-show-count="false"
      >
        Follow @tus_io
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>

      {includeRss && (
        <a href="{{ site.rss_feed }}">
          <img src={rssFeedIcon} />
        </a>
      )}

      <iframe
        src="https://ghbtns.com/github-btn.html?user=tus&repo=tus-resumable-upload-protocol&type=watch&count=true"
        allowTransparency={true}
        frameBorder="0"
        scrolling="0"
        width="100"
        height="20"
      ></iframe>
    </div>
  );
}
