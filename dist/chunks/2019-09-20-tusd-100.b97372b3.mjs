import { i as createVNode, j as spreadAttributes, F as Fragment } from './astro.9ffe222d.mjs';
import 'node:fs';
import 'node:path/posix';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';
import './_astro_assets.aa647409.mjs';
import 'html-escaper';
import 'fs';
import 'path';
import 'node:worker_threads';
import 'os';
import 'url';
import 'module';
import 'worker_threads';

const images = {
					
				};

				function updateImageReferences(html) {
					return html.replaceAll(
						/__ASTRO_IMAGE_="(.+)"/gm,
						(full, imagePath) => spreadAttributes({src: images[imagePath].src, ...images[imagePath].attributes})
					);
				}

				const html = updateImageReferences("<p>Today, we are thrilled to announce the v1.0.0 release of our <a href=\"https://github.com/tus/tusd\">tusd project</a>, the official reference implementation for the tus protocol. Don’t let yourself be fooled by the version number, tusd has been production-ready and battle-tested for many years already.</p>\n<p>This release ships with a few exciting new features but most of the changes were necessary to clean up technical debt which accumulated over the last four years. We try to avoid frequent breaking changes in tusd to reduce the impact of dependency upgrades on your project. However, this debt also prevented us from adding new highly-requested features and tusd 1.0 is now able to deliver those.</p>\n<p>A detailed list of all relevant changes in the 1.0 release can be found in the <a href=\"https://github.com/tus/tusd/releases/tag/v1.0.0\">release notes</a> where you are also able to download prebuilt binaries for Linux, macOS and Windows.</p>\n<p>Despite the number of breaking changes, I want to emphasize that <strong>no changes to your tus clients</strong> are necessary. All breaking changes are server-facing only and tusd offers the same tus HTTP interface as before. This was an important guarantee for us as we want to make it easy for you to upgrade tusd without worrying about older clients.</p>\n<p>Finally, I want to thank everyone again who helped to make this release happen! If you also want to contribute, you can find our open source code at <a href=\"https://github.com/tus\">GitHub</a>. If you don’t know where to start or have other questions, feel free to <a href=\"/support.html\">contact us</a>!</p>");

				const frontmatter = {"title":"The tusd server hits v1.0.0","author":"acconut","redirect_from":"/blog/2019/09/20/tusd-100/","date":"2019-09-20T00:00:00.000Z","slug":"2019/09/20/tusd-100/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2019-09-20-tusd-100.md";
				const url = undefined;
				function rawContent() {
					return "\nToday, we are thrilled to announce the v1.0.0 release of our [tusd project](https://github.com/tus/tusd), the official reference implementation for the tus protocol. Don't let yourself be fooled by the version number, tusd has been production-ready and battle-tested for many years already.\n\nThis release ships with a few exciting new features but most of the changes were necessary to clean up technical debt which accumulated over the last four years. We try to avoid frequent breaking changes in tusd to reduce the impact of dependency upgrades on your project. However, this debt also prevented us from adding new highly-requested features and tusd 1.0 is now able to deliver those.\n\nA detailed list of all relevant changes in the 1.0 release can be found in the [release notes](https://github.com/tus/tusd/releases/tag/v1.0.0) where you are also able to download prebuilt binaries for Linux, macOS and Windows.\n\nDespite the number of breaking changes, I want to emphasize that **no changes to your tus clients** are necessary. All breaking changes are server-facing only and tusd offers the same tus HTTP interface as before. This was an important guarantee for us as we want to make it easy for you to upgrade tusd without worrying about older clients.\n\nFinally, I want to thank everyone again who helped to make this release happen! If you also want to contribute, you can find our open source code at [GitHub](https://github.com/tus). If you don't know where to start or have other questions, feel free to [contact us](/support.html)!\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}
				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return contentFragment;
				}
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, images, rawContent, url };
