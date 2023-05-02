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

				const html = updateImageReferences("<p>tus is brought to you by the people behind <a href=\"https://transloadit.com\"><img src=\"/images/transloadit-logo.png\" width=\"16\" height=\"16\" loading=\"lazy\"></a> <a href=\"https://transloadit.com\">Transloadit</a> but the source code to all of our implementations, this website and even the protocol itself is accessible to everyone under MIT license, directly from our <a href=\"https://github.com/tus\">GitHub</a> organization.</p>");

				const frontmatter = {"title":"Open source","order":3};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/features/open-source.md";
				const url = undefined;
				function rawContent() {
					return "\ntus is brought to you by the people behind <a href=\"https://transloadit.com\"><img src=\"/images/transloadit-logo.png\" width=\"16\" height=\"16\" loading=\"lazy\" /></a> <a href=\"https://transloadit.com\">Transloadit</a> but the source code to all of our implementations, this website and even the protocol itself is accessible to everyone under MIT license, directly from our [GitHub](https://github.com/tus) organization.\n";
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
