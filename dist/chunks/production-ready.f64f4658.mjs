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

				const html = updateImageReferences("<p>tus is ready for use in production. It has undergone numerous rounds of improvements and received valuable feedback from people working at Vimeo, Google and multiple other well-known companies.</p>");

				const frontmatter = {"title":"Production-ready","order":2};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/features/production-ready.md";
				const url = undefined;
				function rawContent() {
					return "\ntus is ready for use in production. It has undergone numerous rounds of improvements and received valuable feedback from people working at Vimeo, Google and multiple other well-known companies.\n";
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
