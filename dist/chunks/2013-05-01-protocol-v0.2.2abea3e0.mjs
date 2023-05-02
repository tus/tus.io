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

				const html = updateImageReferences("<p>After releasing our first draft a few weeks ago, we received an incredible\namount of feedback and suggestions. Based on this feedback as well as\n<a href=\"http://lists.w3.org/Archives/Public/ietf-http-wg/2013AprJun/0155.html\">discussing</a>\nthe problems with the <a href=\"http://trac.tools.ietf.org/wg/httpbis/trac/wiki\">IETF HTTPbis Working Group</a>, we identified a few\nkey issues with <a href=\"https://github.com/tus/tus-resumable-upload-protocol/blob/v0.1/README.md\">v0.1</a> of the\nprotocol:</p>\n<ul>\n<li><code>PUT</code> requests are not appropriate for transferring partial resources</li>\n<li>The <code>Content-Range</code> and <code>Range</code> headers are not meant for resuming an\ninterrupted resource transfer.</li>\n</ul>\n<p>After lots of careful thinking, we came up with a new approach that uses:</p>\n<ul>\n<li><code>PATCH</code> instead of <code>PUT</code></li>\n<li>A new <code>Offset</code> header used by <code>HEAD</code> responses and <code>PATCH</code> requests alike</li>\n<li>A <code>Final-Length</code> header to provide the final file size to the server</li>\n</ul>\n<p>We also split the protocol into a core protocol which takes care of\nresumability, and nothing else, as well as optional protocol extensions.</p>\n<p>The result of this has just been published as v0.2 can be seen on the <a href=\"/protocols/resumable-upload.html\">protocol\npage</a>. Also included is a new <a href=\"/protocols/resumable-upload.html#7\">FAQ\nsection</a> which will expanded over time.</p>\n<p>We feel that the overall result is a drastic simplification of the problem down\nto its essence, and we encourage interested developers to implement prototypes.</p>\n<p>Our next step is upgrading tusd, the jquery client and the ios client to the\nnew protocol version. Once the protocol has reached a little more maturity, we\nare also thinking about providing an executable protocol verification tool for\nimplementers.</p>");

				const frontmatter = {"title":"Protocol v0.2","comments":true,"author":"felixge","redirect_from":"/blog/2013/05/01/protocol-v0.2/","date":"2013-05-01T00:00:00.000Z","slug":"2013/05/01/protocol-v0.2/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2013-05-01-protocol-v0.2.md";
				const url = undefined;
				function rawContent() {
					return "\nAfter releasing our first draft a few weeks ago, we received an incredible\namount of feedback and suggestions. Based on this feedback as well as\n[discussing](http://lists.w3.org/Archives/Public/ietf-http-wg/2013AprJun/0155.html)\nthe problems with the [IETF HTTPbis Working Group](http://trac.tools.ietf.org/wg/httpbis/trac/wiki), we identified a few\nkey issues with [v0.1](https://github.com/tus/tus-resumable-upload-protocol/blob/v0.1/README.md) of the\nprotocol:\n\n- `PUT` requests are not appropriate for transferring partial resources\n- The `Content-Range` and `Range` headers are not meant for resuming an\n  interrupted resource transfer.\n\nAfter lots of careful thinking, we came up with a new approach that uses:\n\n- `PATCH` instead of `PUT`\n- A new `Offset` header used by `HEAD` responses and `PATCH` requests alike\n- A `Final-Length` header to provide the final file size to the server\n\nWe also split the protocol into a core protocol which takes care of\nresumability, and nothing else, as well as optional protocol extensions.\n\nThe result of this has just been published as v0.2 can be seen on the [protocol\npage](/protocols/resumable-upload.html). Also included is a new [FAQ\nsection](/protocols/resumable-upload.html#7) which will expanded over time.\n\nWe feel that the overall result is a drastic simplification of the problem down\nto its essence, and we encourage interested developers to implement prototypes.\n\nOur next step is upgrading tusd, the jquery client and the ios client to the\nnew protocol version. Once the protocol has reached a little more maturity, we\nare also thinking about providing an executable protocol verification tool for\nimplementers.\n";
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
