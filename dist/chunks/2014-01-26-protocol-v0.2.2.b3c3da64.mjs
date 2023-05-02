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

				const html = updateImageReferences("<p>This is a minor protocol release:</p>\n<ul>\n<li>Add Content-Type to PATCH example.(<a href=\"https://github.com/vayam\">Naren Venkataraman</a>)</li>\n<li>s/Final-Length/Entity-Length/g (<a href=\"https://github.com/felixge\">Felix Geisendörfer</a>)</li>\n<li>Fix <a href=\"https://github.com/tus/tus-resumable-upload-protocol/pull/32\">#31</a>:\nHEAD request with non-existent resources should return 404 or 403. (<a href=\"https://github.com/vayam\">Naren Venkataraman</a>)</li>\n</ul>\n<p>All patches can be seen <a href=\"https://github.com/tus/tus-resumable-upload-protocol/compare/v0.2.1...v0.2.2\">here</a>.</p>");

				const frontmatter = {"title":"Protocol v0.2.2","comments":true,"author":"vayam","redirect_from":"/blog/2014/01/26/protocol-v0.2.2/","date":"2014-01-26T00:00:00.000Z","slug":"2014/01/26/protocol-v0.2.2/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2014-01-26-protocol-v0.2.2.md";
				const url = undefined;
				function rawContent() {
					return "\nThis is a minor protocol release:\n\n- Add Content-Type to PATCH example.([Naren Venkataraman](https://github.com/vayam))\n- s/Final-Length/Entity-Length/g ([Felix Geisendörfer](https://github.com/felixge))\n- Fix [#31](https://github.com/tus/tus-resumable-upload-protocol/pull/32):\n  HEAD request with non-existent resources should return 404 or 403. ([Naren Venkataraman](https://github.com/vayam))\n\nAll patches can be seen [here](https://github.com/tus/tus-resumable-upload-protocol/compare/v0.2.1...v0.2.2).\n";
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
