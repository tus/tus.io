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

				const html = updateImageReferences("<p>Today we are excited to announce that <a href=\"https://github.com/tus/tusd\">tusd</a> is now also able to store uploaded files in the Azure Cloud Storage! Just like all tus servers, tusd’s role is to accept incoming uploads from the tus clients and then relay them to the underlying storage providers. For a long time has tusd already supported storing uploads locally on disk, on AWS S3 and Google’s Cloud Storage. Thanks to an incredible contribution from <a href=\"https://github.com/omBratteng\">Ole-Martin Bratteng</a>, this support has been expanded to also cover the Azure Cloud Storage!</p>\n<h2 id=\"on-the-backend\">On the backend</h2>\n<p>The Azure Blob Storage implementation is only supporting the Block Blob. This was a concious choice to make the implementation easier to use, and is the most fitting blob type for tusd. The current service version supported is <code>2019-12-12</code>, which allows files up to 190.7 TiB in size (4000 MiB x 50,000 blocks).</p>\n<p>Upon starting tusd with Azure Blob Storage as the selected storage endpoint, it will atempt to connect to a container (also known as a Bucket in S3). If one does not exist, it will be created. You can also specify the access type of the container, which defaults to private, and the default blob access tier type which defaults to the inferred tier from the storage account.</p>\n<p>When tusd receives a chunk of data from the client, it will stage the chunk as a block in the Azure Blob Storage. When the client sends the last chunk of data, tusd will then send commit the block list to the Azure Blob Storage, which in part, creates the file in the Azure Blob Storage.</p>\n<p>We’ve also implemented support for <a href=\"https://github.com/Azure/Azurite\">Azurite</a>, which is a lightweight, self-hosted Azure Blob Storage emulator, this can be enabled by using the <code>-azure-endpoint</code> flag. This should also work for custom Azure Blob Storage endpoints, although it has not been tested fully.</p>\n<h2 id=\"give-it-a-try\">Give it a try</h2>\n<p>Support for Azure Cloud Storage is part of the <a href=\"https://github.com/tus/tusd/releases/tag/v1.7.1\">v1.7.1 release</a>, where the prebuilt binaries can be downloaded. Give this new feature a try and let us know on <a href=\"https://github.com/tus/tusd/issues\">GitHub</a> if you encounter any problems!</p>\n<p>To conclude this blog post, let’s again thank <a href=\"https://github.com/omBratteng\">Ole-Martin Bratteng</a> for this amazing contribution!</p>");

				const frontmatter = {"title":"Uploading files to Azure Storage using tusd","author":"acconut","date":"2021-08-10T00:00:00.000Z","slug":"2021/08/10/tusd-azure-storage/"};
				const file = "/Users/nick/dev/transloadit/tus.io/src/content/blog/2021-08-10-tusd-azure-storage.md";
				const url = undefined;
				function rawContent() {
					return "\nToday we are excited to announce that [tusd](https://github.com/tus/tusd) is now also able to store uploaded files in the Azure Cloud Storage! Just like all tus servers, tusd's role is to accept incoming uploads from the tus clients and then relay them to the underlying storage providers. For a long time has tusd already supported storing uploads locally on disk, on AWS S3 and Google's Cloud Storage. Thanks to an incredible contribution from [Ole-Martin Bratteng](https://github.com/omBratteng), this support has been expanded to also cover the Azure Cloud Storage!\n\n## On the backend\n\nThe Azure Blob Storage implementation is only supporting the Block Blob. This was a concious choice to make the implementation easier to use, and is the most fitting blob type for tusd. The current service version supported is `2019-12-12`, which allows files up to 190.7 TiB in size (4000 MiB x 50,000 blocks).\n\nUpon starting tusd with Azure Blob Storage as the selected storage endpoint, it will atempt to connect to a container (also known as a Bucket in S3). If one does not exist, it will be created. You can also specify the access type of the container, which defaults to private, and the default blob access tier type which defaults to the inferred tier from the storage account.\n\nWhen tusd receives a chunk of data from the client, it will stage the chunk as a block in the Azure Blob Storage. When the client sends the last chunk of data, tusd will then send commit the block list to the Azure Blob Storage, which in part, creates the file in the Azure Blob Storage.\n\nWe've also implemented support for [Azurite](https://github.com/Azure/Azurite), which is a lightweight, self-hosted Azure Blob Storage emulator, this can be enabled by using the `-azure-endpoint` flag. This should also work for custom Azure Blob Storage endpoints, although it has not been tested fully.\n\n## Give it a try\n\nSupport for Azure Cloud Storage is part of the [v1.7.1 release](https://github.com/tus/tusd/releases/tag/v1.7.1), where the prebuilt binaries can be downloaded. Give this new feature a try and let us know on [GitHub](https://github.com/tus/tusd/issues) if you encounter any problems!\n\nTo conclude this blog post, let's again thank [Ole-Martin Bratteng](https://github.com/omBratteng) for this amazing contribution!\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"on-the-backend","text":"On the backend"},{"depth":2,"slug":"give-it-a-try","text":"Give it a try"}];
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
