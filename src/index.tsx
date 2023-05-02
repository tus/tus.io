import tusBanner from "/@input/_islands/Home/tus1--no-io.png";
import VisuallyHidden from "/@input/_islands/VisuallyHidden";
import styles from "/@input/index.module.css";
import cx from "clsx";
import Markdown from "/@input/_islands/Markdown";
import Social from "/@input/_islands/Social";
import type preact from "preact";

import TusOnGithub from "/@input/_islands/TusOnGithub";
import type { EleventyPageData } from "types/types";

export const island = {
  when: "client:load",
  props(eleventyData: EleventyPageData) {
    const lastFivePosts = [...eleventyData.collections.post]
      .reverse()
      .slice(0, 5)
      .map((p) => ({
        author: {
          name: eleventyData.authors[p.data.author].name,
          gravatar: eleventyData.authors[p.data.author].gravatar,
          twitter: eleventyData.authors[p.data.author].twitter,
        },
        title: p.data.title,
        url: p.url,
        date: p.date.toISOString(),
      }));

    return {
      features: eleventyData.features,
      githubActivity: eleventyData.githubActivity,
      implementations: eleventyData.implementations,
      lastFivePosts,
      logos: eleventyData.logos.slice(0, 5),
      press: eleventyData.press.slice(0, 12),
    };
  },
};

type IndexPageProps = ReturnType<(typeof island)["props"]>;

export const frontmatter = {
  layout: "default",
  title: "tus - resumable file uploads",
  is_home: true,
  eleventyImport: {
    collections: ["post"],
  },
};

const Container = ({
  children,
  className,
}: {
  children: preact.ComponentChildren;
  className?: string;
}) => <div className={cx(styles.container, className)}>{children}</div>;

export default function IndexPage(props: IndexPageProps) {
  const {
    features,
    githubActivity,
    implementations,
    lastFivePosts,
    logos,
    press,
  } = props;

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <section class={cx(styles.section, styles.intro)}>
        <Container>
          <h1>
            <VisuallyHidden>tus - resumable file uploads</VisuallyHidden>
            <img
              class={styles.banner}
              src={tusBanner}
              width="1116"
              height="478"
              loading="eager"
              alt=""
            />
          </h1>
        </Container>

        <div class={styles.mission}>
          <Container>
            <p>
              People are sharing more and more photos and videos every day.
              Mobile networks remain fragile however. Platform APIs are also
              often a mess and every project builds its own file uploader. There
              are a thousand one-week projects that barely work, when all we
              need is one real project. One project done right.
            </p>

            <p>
              We are the ones who are going to do this right. Our aim is to
              solve the problem of unreliable file uploads once and for all. tus
              is a new open{" "}
              <a href="/protocols/resumable-upload.html">
                protocol for resumable uploads
              </a>{" "}
              built on HTTP. It offers simple, cheap and reusable stacks for
              clients and servers. It supports any language, any platform and
              any network.
            </p>

            <p>
              It may seem to be an impossible dream. Perhaps that is because
              no-one has managed to solve it yet. Still, we are confident and we
              are going to give it our best shot.{" "}
              <a target="" href="https://github.com/tus">
                Join us on GitHub
              </a>{" "}
              and help us make the world a better place. Say "No!" to lost cat
              videos! Say "Yes!" to tus!
            </p>
          </Container>
        </div>
      </section>

      <section class={styles.section}>
        <div className={styles.features}>
          {features.map((f) => (
            <article key={f.title}>
              <h4 class={styles.featureTitle}>{f.title}</h4>
              <Markdown
                components={{
                  p: ({
                    children,
                  }: {
                    children?: preact.ComponentChildren;
                  }) => <p class={styles.featureContent}>{children}</p>,
                }}
              >
                {f.content}
              </Markdown>
            </article>
          ))}
        </div>
      </section>

      <section class={cx(styles.section, styles.centered, styles.social)}>
        <Container>
          <h2>Say Hello 👋</h2>
          <p>
            We are still actively improving the protocol and all of its
            implementations. We welcome your involvement and are happy to answer
            any question!
          </p>
          <Social centered />
        </Container>
      </section>

      <section class={cx(styles.section, styles.centered)}>
        <Container>
          <h2>Official implementations</h2>

          <div class={styles.implementations}>
            {implementations.map((d) => (
              <article key={d.name} class={styles.implementation}>
                <a href={`https://github.com/${d.repo}`}>
                  <img
                    src={`/images/${d.icon}.svg`}
                    alt={`Support for ${d.name}`}
                    loading="lazy"
                  />
                  {d.name}
                </a>
              </article>
            ))}
          </div>

          <p>
            Additionally, there are many other{" "}
            <a href="/implementations.html">projects</a> built and maintained by
            our community.
          </p>
        </Container>
      </section>

      <section class={styles.section}>
        <Container>
          <h2>Blog posts</h2>

          <ol className={styles.posts}>
            {lastFivePosts.map((p) => {
              return (
                <li key={p.url}>
                  <article class={styles.post}>
                    <div class={styles.postContent}>
                      <h3>
                        <a href={p.url}>{p.title}</a>
                      </h3>
                      <time class="date" dateTime={p.date}>
                        {formatter.format(new Date(p.date))}
                      </time>
                    </div>

                    <a
                      href={`https://twitter.com/${p.author.twitter}`}
                      aria-title={p.author.name}
                      class={styles.author}
                    >
                      <img
                        src={`https://secure.gravatar.com/avatar/${p.author.gravatar}&s=64`}
                        class={styles.gravatar}
                        loading="lazy"
                        width="64"
                        height="64"
                        alt={`Avatar of ${p.author.name}`}
                      />
                    </a>
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section
        class={cx(styles.section, styles.centered, styles.whoIsUsingTus)}
      >
        <Container>
          <h2>Who is using tus?</h2>

          <div class={styles.logos}>
            {logos.map((logo) => (
              <a key={logo.url} href={logo.url} class={styles.logo}>
                <img src={logo.src} alt={logo.name} loading="lazy" />
              </a>
            ))}
          </div>

          <p>
            Do you also (plan to) use tus?{" "}
            <a href="https://github.com/tus/tus.io/edit/main/src/_data/logos.json">
              Add your company
            </a>
          </p>
        </Container>
      </section>

      <section class={styles.section}>
        <Container>
          <h2>tus on GitHub</h2>
          <TusOnGithub githubActivity={githubActivity} />
        </Container>
      </section>

      <section class={cx(styles.section, styles.centered)}>
        <Container>
          <h2>As seen on</h2>

          <div class={styles.logos}>
            {press.map((p) => (
              <a
                key={p.url}
                href={p.url}
                aria-title={p.name}
                class={styles.logo}
              >
                <img src={p.src} alt={`Logo of ${p.name}`} loading="lazy" />
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
