import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, b as renderHead, d as renderComponent, e as renderSlot, f as createCollectionToGlobResultMap, g as createGetCollection, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../astro.9ffe222d.mjs';
import { s as styles, a as styles$4 } from '../index.9fd230bc.9be9ee4b.mjs';
import { jsx, jsxs } from 'preact/jsx-runtime';
import cx from 'clsx';
import { s as styles$1, a as styles$2, b as styles$3 } from '../index.7497951e.84338e86.mjs';
import { signal, computed } from '@preact/signals';
import { useRef, useEffect } from 'preact/hooks';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
/* empty css                           */
function VisuallyHidden(props) {
  const {
    children
  } = props;
  return jsx("span", {
    class: styles.root,
    children
  });
}
__astro_tag_component__(VisuallyHidden, "@astrojs/preact");

const ukraineFlag = {"src":"/_astro/ua-flag.69bd65a1.svg","width":1200,"height":800,"format":"svg"};

function Container(props) {
  const {
    children,
    className
  } = props;
  return jsx("div", {
    class: cx(styles$1.container, className),
    children
  });
}
__astro_tag_component__(Container, "@astrojs/preact");

function TransloaditBar() {
  return jsx("aside", {
    class: styles$2.root,
    children: jsx(Container, {
      className: styles$2.container,
      children: jsxs("p", {
        class: styles$2.text,
        children: [jsx("img", {
          class: styles$2.flag,
          src: ukraineFlag.src,
          alt: "Flag of Ukraine",
          width: 24,
          height: 16
        }), "We stand with the brave people of Ukraine. Stop the war. Find out", " ", jsx("a", {
          href: "https://transloadit.com/blog/2022/02/ukraine",
          target: "_blank",
          rel: "noopener noreferrer",
          class: styles$2.link,
          children: "how you can help"
        }), "."]
      })
    })
  });
}
__astro_tag_component__(TransloaditBar, "@astrojs/preact");

const tusWordmark = {"src":"/_astro/wordmark.731f6a63.png","width":541,"height":343,"format":"png"};

const tusLogo = {"src":"/_astro/logo.8be66800.png","width":180,"height":180,"format":"png"};

const expanded = signal(false);
const hidden = computed(() => !expanded.value);
function Navigation(props) {
  const {
    currentPage
  } = props;
  const nav = useRef(null);
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      expanded.value = document.body.clientWidth > 768;
    });
    observer.observe(document.body);
    return () => {
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!nav.current)
      return;
    const onClickOutside = (event) => {
      if (!event.target)
        return;
      const node = event.target;
      if (!nav.current?.contains(node)) {
        expanded.value = false;
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  }, []);
  return jsx("header", {
    class: styles$3.root,
    children: jsxs("div", {
      children: [jsxs("a", {
        href: "/",
        class: styles$3.home,
        children: [currentPage !== "/" && jsx("img", {
          src: tusLogo.src,
          height: tusLogo.height,
          width: tusLogo.width,
          alt: "",
          loading: "eager",
          decoding: "async"
        }), jsx("img", {
          src: tusWordmark.src,
          height: tusLogo.height,
          width: tusLogo.width,
          alt: "tus",
          loading: "eager",
          decoding: "async"
        })]
      }), jsxs("nav", {
        ref: nav,
        children: [jsx("button", {
          class: styles$3.toggle,
          onClick: (e) => {
            expanded.value = !expanded.value;
            e?.stopPropagation();
          },
          "aria-expanded": expanded,
          children: expanded.value ? jsx(CrossIcon, {
            size: 24
          }) : jsx(HamburgerMenuIcon, {
            size: 24
          })
        }), jsxs("ul", {
          class: styles$3.items,
          hidden,
          children: [jsx("li", {
            children: jsx("a", {
              class: cx(styles$3.link, {
                [styles$3.activeLink]: currentPage === "/faq.html"
              }),
              href: "/faq.html",
              children: "FAQ"
            })
          }), jsx("li", {
            children: jsx("a", {
              class: cx(styles$3.link, {
                [styles$3.activeLink]: currentPage === "/support.html"
              }),
              href: "/support.html",
              children: "Support"
            })
          }), jsx("li", {
            children: jsx("a", {
              class: cx(styles$3.link, {
                [styles$3.activeLink]: currentPage === "/blog.html"
              }),
              href: "/blog.html",
              children: "Blog"
            })
          }), jsx("li", {
            children: jsx("a", {
              class: cx(styles$3.link, {
                [styles$3.activeLink]: currentPage === "/demo.html"
              }),
              href: "/demo.html",
              children: "Demo"
            })
          }), jsx("li", {
            children: jsx("a", {
              class: cx(styles$3.link, {
                [styles$3.activeLink]: currentPage === "/protocols/resumable-upload.html"
              }),
              href: "/protocols/resumable-upload.html",
              children: "Protocol"
            })
          }), jsx("li", {
            children: jsx("a", {
              class: cx(styles$3.link, {
                [styles$3.activeLink]: currentPage === "/implementations.html"
              }),
              href: "/implementations.html",
              children: "Implementations"
            })
          }), jsx("li", {
            children: jsxs("a", {
              href: "https://github.com/tus",
              class: cx(styles$3.link, styles$3.githubLink),
              children: ["GitHub ", jsx(GithubIcon, {
                size: 20
              })]
            })
          })]
        })]
      })]
    })
  });
}
function HamburgerMenuIcon(props) {
  const {
    size = 15
  } = props;
  return jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: jsx("path", {
      d: "M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z",
      fill: "currentColor",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd"
    })
  });
}
function CrossIcon(props) {
  const {
    size = 15
  } = props;
  return jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: jsx("path", {
      d: "M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z",
      fill: "currentColor",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd"
    })
  });
}
function GithubIcon(props) {
  const {
    size = 15
  } = props;
  return jsx("svg", {
    width: size,
    height: size,
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    children: jsx("path", {
      d: "M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z",
      fill: "currentColor",
      "fill-rule": "evenodd",
      "clip-rule": "evenodd"
    })
  });
}
__astro_tag_component__(Navigation, "@astrojs/preact");

const $$Astro$6 = createAstro("https://tus.io");
const $$Default = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Default;
  let { title } = Astro2.props;
  if (Astro2.url.pathname !== "/") {
    title += " | tus.io";
  }
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:image" content="/images/og-image-banner.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="tus.io">
    <meta property="og:title">
    <meta property="og:description" content="To eleventy and beyond!">
    <link rel="icon" type="img/png" href="/images/favicon.png">

    <link rel="preload" href="/fonts/IBMPlexSans-Regular.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/fonts/IBMPlexSans-Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
    <link rel="preload" href="/fonts/IBMPlexSans-Bold.woff2" as="font" type="font/woff2" crossorigin="anonymous">

    <!-- {% if noindex %}
      <meta name="robots" content="noindex">
    {% endif %} -->

    <!-- {% set used_title = title %}
    {% if is_home %}
      {# do nothing #}
    {% else %}
      {% set used_title = used_title + " | tus" %}
    {% endif %}

    {% if title_prefix %}
      {% set used_title = title_prefix + used_title %}
    {% endif %} -->

    <title>${title}</title>
  ${renderHead($$result)}</head>
  <body>
    ${renderComponent($$result, "TransloaditBar", TransloaditBar, {})}
    ${renderComponent($$result, "Navigation", Navigation, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "old_src/components/Navigation", "client:component-export": "default" })}
    <!-- {% island "TransloaditBar/index.tsx" %}
    {% endisland %}
    
    {% island "Navigation/index.tsx" %}
    {% prop 'currentPage', page.url %}
    {% endisland %} -->

    ${renderSlot($$result, $$slots["default"])}
  </body></html>`;
}, "/Users/nick/dev/transloadit/tus.io/src/layouts/default.astro");

const banner = {"src":"/_astro/banner.6876e69d.png","width":1116,"height":478,"format":"png"};

// astro-head-inject

const contentDir = '/src/content/';

const entryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/2013-04-06-hello-world.md": () => import('../2013-04-06-hello-world.fff6f827.mjs'),"/src/content/blog/2013-04-15-a-protocol-for-resumable-file-uploads.md": () => import('../2013-04-15-a-protocol-for-resumable-file-uploads.d4176836.mjs'),"/src/content/blog/2013-05-01-protocol-v0.2.md": () => import('../2013-05-01-protocol-v0.2.53ef9bf1.mjs'),"/src/content/blog/2013-05-08-protocol-v0.2.1.md": () => import('../2013-05-08-protocol-v0.2.1.2319bbc5.mjs'),"/src/content/blog/2014-01-26-protocol-v0.2.2.md": () => import('../2014-01-26-protocol-v0.2.2.599b416d.mjs'),"/src/content/blog/2015-02-03-protocol-v1.0.0-prerelease.md": () => import('../2015-02-03-protocol-v1.0.0-prerelease.b39ace47.mjs'),"/src/content/blog/2015-09-19-project-status.md": () => import('../2015-09-19-project-status.92ab2303.mjs'),"/src/content/blog/2015-11-16-tus.1.0.md": () => import('../2015-11-16-tus.1.0.68965f22.mjs'),"/src/content/blog/2016-03-07-tus-s3-backend.md": () => import('../2016-03-07-tus-s3-backend.efd35a83.mjs'),"/src/content/blog/2017-05-19-how-tus-may-help-to-save-lives.md": () => import('../2017-05-19-how-tus-may-help-to-save-lives.870a5c57.mjs'),"/src/content/blog/2018-09-25-adoption.md": () => import('../2018-09-25-adoption.3c099e14.mjs'),"/src/content/blog/2019-03-10-tus-js-client-160.md": () => import('../2019-03-10-tus-js-client-160.8b029014.mjs'),"/src/content/blog/2019-09-20-tusd-100.md": () => import('../2019-09-20-tusd-100.668056c8.mjs'),"/src/content/blog/2020-05-04-tus-js-client-200.md": () => import('../2020-05-04-tus-js-client-200.0ce0d869.mjs'),"/src/content/blog/2020-11-12-tus-advisory-group.md": () => import('../2020-11-12-tus-advisory-group.42071f04.mjs'),"/src/content/blog/2021-08-10-tusd-azure-storage.md": () => import('../2021-08-10-tusd-azure-storage.ccae1673.mjs'),"/src/content/blog/2022-02-24-tus-v2.md": () => import('../2022-02-24-tus-v2.bb7ebde0.mjs'),"/src/content/blog/2022-08-03-tus-js-client-300.md": () => import('../2022-08-03-tus-js-client-300.df0e45b1.mjs'),"/src/content/features/community-owned.md": () => import('../community-owned.76bd4bec.mjs'),"/src/content/features/extensible.md": () => import('../extensible.3bd0626b.mjs'),"/src/content/features/http-based.md": () => import('../http-based.c88c0e31.mjs'),"/src/content/features/minimalistic-design.md": () => import('../minimalistic-design.2211bc59.mjs'),"/src/content/features/open-source.md": () => import('../open-source.708e5429.mjs'),"/src/content/features/production-ready.md": () => import('../production-ready.671d6814.mjs')

});
const collectionToEntryMap = createCollectionToGlobResultMap({
	globResult: entryGlob,
	contentDir,
});

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/2013-04-06-hello-world.md": () => import('../2013-04-06-hello-world.24a5ff39.mjs'),"/src/content/blog/2013-04-15-a-protocol-for-resumable-file-uploads.md": () => import('../2013-04-15-a-protocol-for-resumable-file-uploads.92d1729d.mjs'),"/src/content/blog/2013-05-01-protocol-v0.2.md": () => import('../2013-05-01-protocol-v0.2.f7adc814.mjs'),"/src/content/blog/2013-05-08-protocol-v0.2.1.md": () => import('../2013-05-08-protocol-v0.2.1.27bdc87c.mjs'),"/src/content/blog/2014-01-26-protocol-v0.2.2.md": () => import('../2014-01-26-protocol-v0.2.2.8d935254.mjs'),"/src/content/blog/2015-02-03-protocol-v1.0.0-prerelease.md": () => import('../2015-02-03-protocol-v1.0.0-prerelease.5a809a74.mjs'),"/src/content/blog/2015-09-19-project-status.md": () => import('../2015-09-19-project-status.e9287e37.mjs'),"/src/content/blog/2015-11-16-tus.1.0.md": () => import('../2015-11-16-tus.1.0.0bb25734.mjs'),"/src/content/blog/2016-03-07-tus-s3-backend.md": () => import('../2016-03-07-tus-s3-backend.ba1de69d.mjs'),"/src/content/blog/2017-05-19-how-tus-may-help-to-save-lives.md": () => import('../2017-05-19-how-tus-may-help-to-save-lives.9b832e40.mjs'),"/src/content/blog/2018-09-25-adoption.md": () => import('../2018-09-25-adoption.4082c23f.mjs'),"/src/content/blog/2019-03-10-tus-js-client-160.md": () => import('../2019-03-10-tus-js-client-160.cb804fb3.mjs'),"/src/content/blog/2019-09-20-tusd-100.md": () => import('../2019-09-20-tusd-100.4c618c5a.mjs'),"/src/content/blog/2020-05-04-tus-js-client-200.md": () => import('../2020-05-04-tus-js-client-200.d68e6c34.mjs'),"/src/content/blog/2020-11-12-tus-advisory-group.md": () => import('../2020-11-12-tus-advisory-group.1ecfdb56.mjs'),"/src/content/blog/2021-08-10-tusd-azure-storage.md": () => import('../2021-08-10-tusd-azure-storage.3d26ccbe.mjs'),"/src/content/blog/2022-02-24-tus-v2.md": () => import('../2022-02-24-tus-v2.60523c3a.mjs'),"/src/content/blog/2022-08-03-tus-js-client-300.md": () => import('../2022-08-03-tus-js-client-300.0b0f23e9.mjs'),"/src/content/features/community-owned.md": () => import('../community-owned.223cc35b.mjs'),"/src/content/features/extensible.md": () => import('../extensible.e01b57f6.mjs'),"/src/content/features/http-based.md": () => import('../http-based.41c526ce.mjs'),"/src/content/features/minimalistic-design.md": () => import('../minimalistic-design.d5cd28ce.mjs'),"/src/content/features/open-source.md": () => import('../open-source.78091f02.mjs'),"/src/content/features/production-ready.md": () => import('../production-ready.d389ec04.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	collectionToEntryMap,
	collectionToRenderEntryMap,
});

const $$Astro$5 = createAstro("https://tus.io");
const $$Feature = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Feature;
  const { data, render } = Astro2.props.feature;
  const { Content } = await render();
  return renderTemplate`${maybeRenderHead($$result)}<article class="astro-BH577RQ5">
  <h4 class="title astro-BH577RQ5">${data.title}</h4>
  <div class="content astro-BH577RQ5">
    ${renderComponent($$result, "Content", Content, { "class": "astro-BH577RQ5" })}
  </div>
</article>`;
}, "/Users/nick/dev/transloadit/tus.io/src/components/Home/Feature.astro");

const $$Astro$4 = createAstro("https://tus.io");
const $$Features = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Features;
  const features = await getCollection("features");
  features.sort((a, b) => a.data.order - b.data.order);
  return renderTemplate`${maybeRenderHead($$result)}<div class="features astro-YEL3TZQD">
  ${features.map((feature) => renderTemplate`${renderComponent($$result, "Feature", $$Feature, { "feature": feature, "class": "astro-YEL3TZQD" })}`)}
</div>`;
}, "/Users/nick/dev/transloadit/tus.io/src/components/Home/Features.astro");

const communityForumLogo = {"src":"/_astro/community-forum.7e460de5.svg","width":114,"height":20,"format":"svg"};

const rssFeedIcon = {"src":"/_astro/rss-feed-orange.5d61b790.svg","width":60,"height":20,"format":"svg"};

function Social(props) {
  const {
    centered,
    includeRss
  } = props;
  return jsxs("div", {
    class: cx(styles$4.social, {
      [styles$4.centered]: centered
    }),
    children: [jsx("a", {
      href: "https://community.transloadit.com/c/tus",
      class: "community-forum-button",
      children: jsx("img", {
        src: communityForumLogo.src,
        width: communityForumLogo.width,
        height: communityForumLogo.height,
        loading: "lazy"
      })
    }), jsx("a", {
      href: "https://twitter.com/tus_io",
      class: "twitter-follow-button",
      "data-dnt": "true",
      "data-show-count": "false",
      children: "Follow @tus_io"
    }), jsx("script", {
      async: true,
      src: "https://platform.twitter.com/widgets.js",
      charSet: "utf-8"
    }), includeRss && jsx("a", {
      href: "{{ site.rss_feed }}",
      children: jsx("img", {
        src: rssFeedIcon.src,
        height: rssFeedIcon.height,
        width: rssFeedIcon.width,
        loading: "lazy"
      })
    }), jsx("iframe", {
      src: "https://ghbtns.com/github-btn.html?user=tus&repo=tus-resumable-upload-protocol&type=watch&count=true",
      allowTransparency: true,
      frameBorder: "0",
      scrolling: "0",
      width: "100",
      height: "20"
    })]
  });
}
__astro_tag_component__(Social, "@astrojs/preact");

const implementations = [
	{
		name: "tus-js-client",
		icon: "prog-js01",
		repo: "tus/tus-js-client"
	},
	{
		name: "tus-java-client",
		icon: "prog-java",
		repo: "tus/tus-java-client"
	},
	{
		name: "tus-android-client",
		icon: "android",
		repo: "tus/tus-android-client"
	},
	{
		name: "TUSKit",
		icon: "os-ios",
		repo: "tus/TUSKit"
	},
	{
		name: "tusd",
		icon: "prog-golang02",
		repo: "tus/tusd"
	},
	{
		name: "tusdotnet",
		icon: "prog-dotnet",
		repo: "tusdotnet/tusdotnet"
	}
];

const $$Astro$3 = createAstro("https://tus.io");
const $$Implementations = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Implementations;
  return renderTemplate`${maybeRenderHead($$result)}<h2 class="astro-KNLZ4JQN">Official implementations</h2>

<div${addAttribute("implementations astro-KNLZ4JQN", "class")}>
  ${implementations.map((d) => renderTemplate`<article${addAttribute(d.name, "key")}${addAttribute("implementation astro-KNLZ4JQN", "class")}>
        <a${addAttribute(`https://github.com/${d.repo}`, "href")} class="astro-KNLZ4JQN">
          <img${addAttribute(`/images/${d.icon}.svg`, "src")}${addAttribute(`Support for ${d.name}`, "alt")} loading="lazy" class="astro-KNLZ4JQN">
          ${d.name}
        </a>
      </article>`)}
</div>

<p class="astro-KNLZ4JQN">
  Additionally, there are many other${" "}
  <a class="link astro-KNLZ4JQN" href="/implementations.html">projects</a> built and maintained
  by our community.
</p>`;
}, "/Users/nick/dev/transloadit/tus.io/src/components/Home/Implementations.astro");

const $$Astro$2 = createAstro("https://tus.io");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  const title = "tus - resumable file uploads";
  const posts = await getCollection("blog");
  console.log(posts);
  return renderTemplate`${renderComponent($$result, "Layout", $$Default, { "title": title, "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<section class="section intro astro-J7PV25F6">
    <div class="container astro-J7PV25F6">
      <h1 class="astro-J7PV25F6">
        ${renderComponent($$result2, "VisuallyHidden", VisuallyHidden, { "class": "astro-J7PV25F6" }, { "default": ($$result3) => renderTemplate`tus – resumable file uploads` })}
        <img class="banner astro-J7PV25F6"${addAttribute(banner.src, "src")}${addAttribute(banner.width, "width")}${addAttribute(banner.height, "height")} loading="eager" alt="">
      </h1>
    </div>

    <div class="mission astro-J7PV25F6">
      <div class="container astro-J7PV25F6">
        <p class="astro-J7PV25F6">
          People are sharing more and more photos and videos every day. Mobile
          networks remain fragile however. Platform APIs are also often a mess
          and every project builds its own file uploader. There are a thousand
          one-week projects that barely work, when all we need is one real
          project. One project done right.
        </p>

        <p class="astro-J7PV25F6">
          We are the ones who are going to do this right. Our aim is to solve
          the problem of unreliable file uploads once and for all. tus is a new
          open${" "}
          <a href="/protocols/resumable-upload.html" class="astro-J7PV25F6">
            protocol for resumable uploads
          </a>${" "}
          built on HTTP. It offers simple, cheap and reusable stacks for clients
          and servers. It supports any language, any platform and any network.
        </p>

        <p class="astro-J7PV25F6">
          It may seem to be an impossible dream. Perhaps that is because no-one
          has managed to solve it yet. Still, we are confident and we are going
          to give it our best shot.${" "}
          <a target="" href="https://github.com/tus" class="astro-J7PV25F6"> Join us on GitHub</a>${" "}
          and help us make the world a better place. Say "No!" to lost cat videos!
          Say "Yes!" to tus!
        </p>
      </div>
    </div>
  </section>

  <section class="section astro-J7PV25F6">
    ${renderComponent($$result2, "Features", $$Features, { "class": "astro-J7PV25F6" })}
  </section>

  <section${addAttribute("section centered social astro-J7PV25F6", "class")}>
    <div class="container astro-J7PV25F6">
      <h2 class="astro-J7PV25F6">Say Hello 👋</h2>
      <p class="astro-J7PV25F6">
        We are still actively improving the protocol and all of its
        implementations. We welcome your involvement and are happy to answer any
        question!
      </p>
      ${renderComponent($$result2, "Social", Social, { "centered": true, "class": "astro-J7PV25F6" })}
    </div>
  </section>

  <section class="section centered astro-J7PV25F6">
    ${renderComponent($$result2, "Implementations", $$Implementations, { "class": "astro-J7PV25F6" })}
  </section>

  

  
` })}`;
}, "/Users/nick/dev/transloadit/tus.io/src/pages/index.astro");

const $$file$2 = "/Users/nick/dev/transloadit/tus.io/src/pages/index.astro";
const $$url$2 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const felixge = {
	name: "Felix Geisendörfer",
	gravatar: "23968f0ca75b13463d2db5343e5c2096",
	email: "felix@transloadit.com",
	web: "http://felixge.de",
	twitter: "felixge",
	github: "felixge"
};
const tim_kos = {
	name: "Tim Koschützki",
	gravatar: "9c31d1102d95104fb994ae67cd1989b6",
	email: "tim@transloadit.com",
	web: "http://debuggable.com",
	twitter: "tim_kos",
	github: "tim-kos"
};
const kvz = {
	name: "Kevin van Zonneveld",
	gravatar: "3210e1be3e4059b93c4a88309e2183a2",
	email: "kevin@transloadit.com",
	web: "http://kvz.io",
	twitter: "kvz",
	github: "kvz"
};
const vayam = {
	name: "Naren Venkataraman",
	gravatar: "3b5a456c814b3235a7f0bffa27406022",
	email: "naren@doorul.com",
	web: "http://dev.doorul.com",
	twitter: "asyncme",
	github: "vayam"
};
const acconut = {
	name: "Marius Kleidl",
	gravatar: "cda1e4d36e22cbcd826f0f09f8c19f04",
	email: "marius@transloadit.com",
	twitter: "acconut_",
	github: "Acconut"
};
const aj = {
	name: "A.J. van Loon",
	gravatar: "f7134e6ec5e5982428c50ce31eacd592",
	link: "https://transloadit.com/about/#a-j"
};
const authors = {
	felixge: felixge,
	tim_kos: tim_kos,
	kvz: kvz,
	vayam: vayam,
	acconut: acconut,
	aj: aj
};

function ExternalA(props) {
  const {
    href,
    children,
    className
  } = props;
  return jsx("a", {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    className,
    children
  });
}
__astro_tag_component__(ExternalA, "@astrojs/preact");

const extractFirstParagraph = () => {
  return (tree) => {
    const root = tree;
    console.log(tree);
    const children = [];
    for (const node of root.children) {
      if (node.type !== "paragraph")
        continue;
      children.push(node);
      break;
    }
    root.children = children;
    return root;
  };
};
const markdownToFirstP = unified().use(remarkParse).use(extractFirstParagraph).use(remarkRehype).use(rehypeStringify);
function getFirstParagraphContent(markdown) {
  const shortcodeRe = /\{[^}]*\}/g;
  const result = markdownToFirstP.processSync(markdown);
  return result.value.replace(shortcodeRe, "");
}

const $$Astro$1 = createAstro("https://tus.io");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const title = "Blog";
  const posts = (await getCollection("blog")).reverse();
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Default, { "title": title, "class": "astro-5TZNM7MJ" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<main class="root astro-5TZNM7MJ">
    <h1 class="astro-5TZNM7MJ">Blog</h1>
    <ol class="list astro-5TZNM7MJ">
      ${posts.map((post) => {
    const author = authors[post.data.author];
    return renderTemplate`<li class="item astro-5TZNM7MJ">
              <article class="post astro-5TZNM7MJ">
                <a${addAttribute(`/blog/${post.slug}`, "href")} class="title astro-5TZNM7MJ">
                  <h2 class="astro-5TZNM7MJ">${post.data.title}</h2>
                </a>
                <p${addAttribute("meta astro-5TZNM7MJ", "class")}>
                  Published on ${formatter.format(post.data.date)} by${" "}
                  ${renderComponent($$result2, "ExternalA", ExternalA, { "href": author.twitter ? `https://twitter.com/${author.twitter}` : author.web ?? author.link, "class": "astro-5TZNM7MJ" }, { "default": ($$result3) => renderTemplate`${author.name}` })}
                </p>
                <div class="excerpt astro-5TZNM7MJ">${unescapeHTML(getFirstParagraphContent(post.body))}</div>
                <a${addAttribute(`/blog/${post.slug}`, "href")} class="astro-5TZNM7MJ">Read on &rarr;</a>
              </article>
            </li>`;
  })}
    </ol>
  </main>
` })}`;
}, "/Users/nick/dev/transloadit/tus.io/src/pages/blog/index.astro");

const $$file$1 = "/Users/nick/dev/transloadit/tus.io/src/pages/blog/index.astro";
const $$url$1 = "/blog";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://tus.io");
async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map((entry) => {
    return {
      params: { slug: `/blog/${entry.slug}` },
      props: { entry }
    };
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<h1>${entry.data.title}</h1>`;
}, "/Users/nick/dev/transloadit/tus.io/src/pages/blog/[...slug].astro");

const $$file = "/Users/nick/dev/transloadit/tus.io/src/pages/blog/[...slug].astro";
const $$url = "/blog/[...slug]";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _page0 as _, _page1 as a, _page2 as b };
