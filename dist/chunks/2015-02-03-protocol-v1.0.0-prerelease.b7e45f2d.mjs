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

				const html = updateImageReferences("<p>More than a year ago the last release, <code>0.2.2</code> was published. Now the final 1.0\nrelease is just around the corner introducing breaking changes and a lot of new\nfeatures.</p>\n<p>The major changes towards the core include the addition of the <code>TUS-Resumable</code>,\n<code>TUS-Max-Size</code>, <code>TUS-Extension</code> and <code>TUS-Version</code> headers while making the first\none mandatory. All these headers must be returned in the new <code>OPTIONS</code> request\nin order to enable protocol discovery. In addition the <code>Offset</code> header must not\nbe greater or lower than the current offset for the file.</p>\n<p>The biggest changes were made by introducing the Upload-Expiration, Checksum,\nStream, Retries, Termination, Merge and Metadata extensions.</p>\n<p>After all of this work the protocol is now considered stable and ready for use\nin production environments. Speaking of implementations the official\n<code>tus-jquery-client</code> and\n<code>tusd</code> repositories are currently being\nupdated to support the 1.0 release.</p>\n<p>The final 1.0 Release will be published by merging the\n<a href=\"https://github.com/tus/tus-resumable-upload-protocol/pull/57\">according pull request</a>\non GitHub once these changes are done. Furthermore, last feedback may be\nsubmitted there to adjust minor things.</p>");

				const frontmatter = {"title":"Protocol v1.0.0 Prerelease","comments":true,"author":"acconut","redirect_from":"/blog/2015/02/03/protocol-v1.0.0-prerelease/","date":"2015-02-03T00:00:00.000Z","slug":"2015/02/03/protocol-v1.0.0-prerelease/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2015-02-03-protocol-v1.0.0-prerelease.md";
				const url = undefined;
				function rawContent() {
					return "\nMore than a year ago the last release, `0.2.2` was published. Now the final 1.0\nrelease is just around the corner introducing breaking changes and a lot of new\nfeatures.\n\nThe major changes towards the core include the addition of the `TUS-Resumable`,\n`TUS-Max-Size`, `TUS-Extension` and `TUS-Version` headers while making the first\none mandatory. All these headers must be returned in the new `OPTIONS` request\nin order to enable protocol discovery. In addition the `Offset` header must not\nbe greater or lower than the current offset for the file.\n\nThe biggest changes were made by introducing the Upload-Expiration, Checksum,\nStream, Retries, Termination, Merge and Metadata extensions.\n\nAfter all of this work the protocol is now considered stable and ready for use\nin production environments. Speaking of implementations the official\n`tus-jquery-client` and\n`tusd` repositories are currently being\nupdated to support the 1.0 release.\n\nThe final 1.0 Release will be published by merging the\n[according pull request](https://github.com/tus/tus-resumable-upload-protocol/pull/57)\non GitHub once these changes are done. Furthermore, last feedback may be\nsubmitted there to adjust minor things.\n";
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
