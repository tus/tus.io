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

				const html = updateImageReferences("<p><strong>tl;dr:</strong> We are happy to announce version 0.1 of the\n<a href=\"/protocols/resumable-upload.html\">tus resumable upload protocol</a> and are interested in your\nfeedback!</p>\n<p>With mobile devices becoming the dominant source of user generated media files,\nreliable file uploading through unreliable mobile networks has become an\nimportant issue for anybody interested in content acquisition.</p>\n<p>Reliability here means the ability to detect network errors, and resuming an\nupload without having to start from the beginning. In many scenarios this can\nmean the difference between a file reaching your application, or the user\ngiving up in frustration.</p>\n<p>Ideally, this should be a trivial feature to add. In reality however, there is\nquite a lack of solutions in this space. Sure, there are a few JavaScript\nlibraries that claim to support resumable uploading, but in reality you will\nend up spending a lot of time coming up with your own API for it, or\nimplementing a poorly specified one specific to a library. This is incredibly\nfrustrating, especially if you are planning to support this feature on multiple\nplatforms such as HTML5, iOS and Android.</p>\n<p>Now, if you’re a big company like Google, you may sit down and create such a\nprotocol for your needs. And in fact, Google has been working on a <a href=\"http://code.google.com/p/gears/wiki/ResumableHttpRequestsProposal\">such a\nprotocol</a>\nsince 2010, for the now defunct Google Gears. The latest incarnation of this\nare two incompatible protocols for <a href=\"https://developers.google.com/drive/manage-uploads\">Google\nDrive</a> and\n<a href=\"https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol\">YouTube</a>.\nBut unfortunately both of these protocols rely on a non-standard http status\ncode (<code>308 Resume Incomplete</code>), and are far from being generic enough for\ngeneral adoption.</p>\n<p>This means that smaller companies are currently doomed to invent, implement and\nmaintain their own incompatible protocols and solutions for something that\nshould be a trivial component of a modern application.</p>\n<p>We find this unacceptable, so the <a href=\"https://www.tus.io/\">tus project</a> is a\ncommunity project that was born in order to level the playing field and make\nresumable file uploading easy for anybody to implement.</p>\n<p>Today we are happy to release version 0.1 of <a href=\"/protocols/resumable-upload.html\">our\nprotocol</a>. Interested developers are\nencouraged to experiment with it, and we are very interested in any feedback\nyou may have.</p>\n<p>Later this week we will also release some initial clients for\n<a href=\"https://github.com/tus/tus-jquery-client\">jQuery</a> and\n<a href=\"https://github.com/tus/TUSKit\">iOS</a>, so make sure to follow this blog\nand these repositories for future updates!</p>");

				const frontmatter = {"title":"A protocol for resumable file uploads","comments":true,"author":"felixge","redirect_from":"/blog/2013/04/15/a-protocol-for-resumable-file-uploads/","date":"2013-04-15T00:00:00.000Z","slug":"2013/04/15/a-protocol-for-resumable-file-uploads/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2013-04-15-a-protocol-for-resumable-file-uploads.md";
				const url = undefined;
				function rawContent() {
					return "\n**tl;dr:** We are happy to announce version 0.1 of the\n[tus resumable upload protocol](/protocols/resumable-upload.html) and are interested in your\nfeedback!\n\nWith mobile devices becoming the dominant source of user generated media files,\nreliable file uploading through unreliable mobile networks has become an\nimportant issue for anybody interested in content acquisition.\n\nReliability here means the ability to detect network errors, and resuming an\nupload without having to start from the beginning. In many scenarios this can\nmean the difference between a file reaching your application, or the user\ngiving up in frustration.\n\nIdeally, this should be a trivial feature to add. In reality however, there is\nquite a lack of solutions in this space. Sure, there are a few JavaScript\nlibraries that claim to support resumable uploading, but in reality you will\nend up spending a lot of time coming up with your own API for it, or\nimplementing a poorly specified one specific to a library. This is incredibly\nfrustrating, especially if you are planning to support this feature on multiple\nplatforms such as HTML5, iOS and Android.\n\nNow, if you're a big company like Google, you may sit down and create such a\nprotocol for your needs. And in fact, Google has been working on a [such a\nprotocol](http://code.google.com/p/gears/wiki/ResumableHttpRequestsProposal)\nsince 2010, for the now defunct Google Gears. The latest incarnation of this\nare two incompatible protocols for [Google\nDrive](https://developers.google.com/drive/manage-uploads) and\n[YouTube](https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol).\nBut unfortunately both of these protocols rely on a non-standard http status\ncode (`308 Resume Incomplete`), and are far from being generic enough for\ngeneral adoption.\n\nThis means that smaller companies are currently doomed to invent, implement and\nmaintain their own incompatible protocols and solutions for something that\nshould be a trivial component of a modern application.\n\nWe find this unacceptable, so the [tus project](https://www.tus.io/) is a\ncommunity project that was born in order to level the playing field and make\nresumable file uploading easy for anybody to implement.\n\nToday we are happy to release version 0.1 of [our\nprotocol](/protocols/resumable-upload.html). Interested developers are\nencouraged to experiment with it, and we are very interested in any feedback\nyou may have.\n\nLater this week we will also release some initial clients for\n[jQuery](https://github.com/tus/tus-jquery-client) and\n[iOS](https://github.com/tus/TUSKit), so make sure to follow this blog\nand these repositories for future updates!\n";
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
