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

				const html = updateImageReferences("<p>Since the tus project began in 2013, countless contributors with various technical backgrounds have joined our mission and helped move the protocol forward. Many people have contributed their knowledge to tus over these years, some as front-end developers and server engineers, and others as security professionals or network administrators. This variety is of great importance as it allows us to look at problems from different angles and find the optimal solution for everyone involved. Furthermore, since we want the tus protocol to be available and usable for many applications, it’s essential to get feedback from as many people as possible.</p>\n<p>To ensure that we do not lose this variety and to avoid living in our own technical bubble, we have formed the <strong>tus Advisory Group</strong>. Our approach has always been that important decisions about the future of the project must always be preceded by input from multiple people with different backgrounds, since these decisions have the potential to impact many applications and organizations. Questions and proposals must be discussed in the open, so everyone who is willing to take part in the conversation has the opportunity to do so.</p>\n<p>That’s where the tus Advisory Group comes in! It consists of contributors from the community who would like to be more engaged with the protocol and shape its further development. The group’s members will discuss fundamental questions about the direction that tus should take in the future. Of course, all of those conversations will always be open and available for everyone to join! The Advisory Group is not a closed circle but instead a formation that will be invited to weigh in on all major discussions regarding tus.</p>\n<p>As of writing this, the group consists of: <a href=\"https://github.com/smatsson\">Stefan Matsson</a>, the person behind <a href=\"https://github.com/tusdotnet/tusdotnet\">tusdotnet</a>; <a href=\"https://github.com/nigoroll\">Nils Goroll</a>, who we can thank for the <a href=\"https://code.uplex.de/uplex-varnish/libvmod-tus\">tus Varnish Cache module</a>; and <a href=\"https://github.com/Acconut\">Marius Kleidl</a>, who currently leads the tus project. We hope that by forming this group, we can keep our high level of variety and ensure further development of the tus project in such a way that it benefits as many people as possible!</p>\n<p>If you are interested in joining the Advisory Group or want to get more involved in the project, feel free to <a href=\"/support.html\">reach out to us</a>!</p>");

				const frontmatter = {"title":"Announcing the tus Advisory Group","author":"acconut","redirect_from":"/blog/2020/11/12/tus-advisory-group/","date":"2020-11-12T00:00:00.000Z","slug":"2020/11/12/tus-advisory-group/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2020-11-12-tus-advisory-group.md";
				const url = undefined;
				function rawContent() {
					return "\nSince the tus project began in 2013, countless contributors with various technical backgrounds have joined our mission and helped move the protocol forward. Many people have contributed their knowledge to tus over these years, some as front-end developers and server engineers, and others as security professionals or network administrators. This variety is of great importance as it allows us to look at problems from different angles and find the optimal solution for everyone involved. Furthermore, since we want the tus protocol to be available and usable for many applications, it's essential to get feedback from as many people as possible.\n\nTo ensure that we do not lose this variety and to avoid living in our own technical bubble, we have formed the **tus Advisory Group**. Our approach has always been that important decisions about the future of the project must always be preceded by input from multiple people with different backgrounds, since these decisions have the potential to impact many applications and organizations. Questions and proposals must be discussed in the open, so everyone who is willing to take part in the conversation has the opportunity to do so.\n\nThat's where the tus Advisory Group comes in! It consists of contributors from the community who would like to be more engaged with the protocol and shape its further development. The group's members will discuss fundamental questions about the direction that tus should take in the future. Of course, all of those conversations will always be open and available for everyone to join! The Advisory Group is not a closed circle but instead a formation that will be invited to weigh in on all major discussions regarding tus.\n\nAs of writing this, the group consists of: [Stefan Matsson](https://github.com/smatsson), the person behind [tusdotnet](https://github.com/tusdotnet/tusdotnet); [Nils Goroll](https://github.com/nigoroll), who we can thank for the [tus Varnish Cache module](https://code.uplex.de/uplex-varnish/libvmod-tus); and [Marius Kleidl](https://github.com/Acconut), who currently leads the tus project. We hope that by forming this group, we can keep our high level of variety and ensure further development of the tus project in such a way that it benefits as many people as possible!\n\nIf you are interested in joining the Advisory Group or want to get more involved in the project, feel free to [reach out to us](/support.html)!\n";
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
