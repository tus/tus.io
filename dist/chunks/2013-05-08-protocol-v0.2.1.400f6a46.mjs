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

				const html = updateImageReferences("<p>This is a minor protocol release:</p>\n<ul>\n<li>Fix <a href=\"https://github.com/tus/tus-resumable-upload-protocol/pull/19\">#19</a>:\nFinal-Length header was called Final-Size in one place by accident. (<a href=\"https://github.com/vayam\">Naren\nVenkataraman</a>)</li>\n<li>Define that PATCH requests MUST use <code>application/offset+octet-stream</code> as the\n<code>Content-Type</code>. (<a href=\"https://github.com/felixge\">Felix Geisendörfer</a>)</li>\n<li>Define that <code>Final-Length</code> values MUST NOT be negative. (<a href=\"https://github.com/felixge\">Felix\nGeisendörfer</a>)</li>\n</ul>\n<p>All patches can be seen <a href=\"https://github.com/tus/tus-resumable-upload-protocol/compare/v0.2...v0.2.1\">here</a>.</p>");

				const frontmatter = {"title":"Protocol v0.2.1","comments":true,"author":"felixge","redirect_from":"/blog/2013/05/08/protocol-v0.2.1/","date":"2013-05-08T00:00:00.000Z","slug":"2013/05/08/protocol-v0.2.1/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2013-05-08-protocol-v0.2.1.md";
				const url = undefined;
				function rawContent() {
					return "\nThis is a minor protocol release:\n\n- Fix [#19](https://github.com/tus/tus-resumable-upload-protocol/pull/19):\n  Final-Length header was called Final-Size in one place by accident. ([Naren\n  Venkataraman](https://github.com/vayam))\n- Define that PATCH requests MUST use `application/offset+octet-stream` as the\n  `Content-Type`. ([Felix Geisendörfer](https://github.com/felixge))\n- Define that `Final-Length` values MUST NOT be negative. ([Felix\n  Geisendörfer](https://github.com/felixge))\n\nAll patches can be seen [here](https://github.com/tus/tus-resumable-upload-protocol/compare/v0.2...v0.2.1).\n";
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
