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

				const html = updateImageReferences("<p>Hey everybody, we’re starting a new blog here to discuss file uploading, and\nthe protocol we are working on. So keep an eye on this space!</p>");

				const frontmatter = {"title":"Hello world","comments":true,"author":"kvz","date":"2013-04-06T00:00:00.000Z","slug":"2013/04/06/hello-world/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2013-04-06-hello-world.md";
				const url = undefined;
				function rawContent() {
					return "\nHey everybody, we're starting a new blog here to discuss file uploading, and\nthe protocol we are working on. So keep an eye on this space!\n";
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
