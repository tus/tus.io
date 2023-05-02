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

				const html = updateImageReferences("<p>Just a quick update from the team!</p>\n<p>We had a fun month as we learned that <a href=\"https://github.com/git-lfs/git-lfs/blob/main/docs/man/git-lfs-config.5.ronn#transfer-upload--download-settings\">Git LFS supports our protocol for transmitting large files</a>, and Clouflare uses it to power the uploading component of their <a href=\"https://blog.cloudflare.com/how-cloudflare-streams/\">new streaming product</a>. The ‘tus’ community on GitHub continues to thrive and we’re seeing issues raised and addressed on a daily basis. You guys are awesome!</p>\n<p>Tus was also featured in a magazine: Streaming Media. Since they were asking for supporting graphic material, we asked our designer <a href=\"https://twitter.com/nqst\">Alexander Zaytsev</a> to explain the Concat Extension in a visual way, and he came up with the following:</p>\n<img style=\"max-width: 100%; max-height: 100%\" src=\"/assets/img/concat.jpeg\">\n<p>We thought it was really cool, but we also wanted to share it and hear what <em>you</em> think!</p>\n<p>All the best from the team at <a href=\"https://transloadit.com\">Transloadit</a> and see you on GitHub or the forum!</p>");

				const frontmatter = {"title":"Adoption","meta_description":"A quick update from the team at Transloadit on tus, the open protocol for resumable file uploads.","author":"kvz","comments":true,"redirect_from":"/blog/2018/09/25/adoption/","date":"2018-09-25T00:00:00.000Z","slug":"2018/09/25/adoption/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2018-09-25-adoption.md";
				const url = undefined;
				function rawContent() {
					return "\nJust a quick update from the team!\n\nWe had a fun month as we learned that [Git LFS supports our protocol for transmitting large files](https://github.com/git-lfs/git-lfs/blob/main/docs/man/git-lfs-config.5.ronn#transfer-upload--download-settings), and Clouflare uses it to power the uploading component of their [new streaming product](https://blog.cloudflare.com/how-cloudflare-streams/). The 'tus' community on GitHub continues to thrive and we're seeing issues raised and addressed on a daily basis. You guys are awesome!\n\nTus was also featured in a magazine: Streaming Media. Since they were asking for supporting graphic material, we asked our designer [Alexander Zaytsev](https://twitter.com/nqst) to explain the Concat Extension in a visual way, and he came up with the following:\n\n<img style=\"max-width: 100%; max-height: 100%\" src=\"/assets/img/concat.jpeg\">\n\nWe thought it was really cool, but we also wanted to share it and hear what _you_ think!\n\nAll the best from the team at [Transloadit](https://transloadit.com) and see you on GitHub or the forum!\n";
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
