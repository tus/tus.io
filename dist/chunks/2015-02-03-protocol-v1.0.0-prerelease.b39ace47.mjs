const id = "2015-02-03-protocol-v1.0.0-prerelease.md";
						const collection = "blog";
						const slug = "2015/02/03/protocol-v1.0.0-prerelease/";
						const body = "\nMore than a year ago the last release, `0.2.2` was published. Now the final 1.0\nrelease is just around the corner introducing breaking changes and a lot of new\nfeatures.\n\nThe major changes towards the core include the addition of the `TUS-Resumable`,\n`TUS-Max-Size`, `TUS-Extension` and `TUS-Version` headers while making the first\none mandatory. All these headers must be returned in the new `OPTIONS` request\nin order to enable protocol discovery. In addition the `Offset` header must not\nbe greater or lower than the current offset for the file.\n\nThe biggest changes were made by introducing the Upload-Expiration, Checksum,\nStream, Retries, Termination, Merge and Metadata extensions.\n\nAfter all of this work the protocol is now considered stable and ready for use\nin production environments. Speaking of implementations the official\n`tus-jquery-client` and\n`tusd` repositories are currently being\nupdated to support the 1.0 release.\n\nThe final 1.0 Release will be published by merging the\n[according pull request](https://github.com/tus/tus-resumable-upload-protocol/pull/57)\non GitHub once these changes are done. Furthermore, last feedback may be\nsubmitted there to adjust minor things.\n";
						const data = {title:"Protocol v1.0.0 Prerelease",author:"acconut",date:new Date(1422921600000)};
						const _internal = {
							filePath: "/Users/nick/dev/transloadit/tus.io/src/content/blog/2015-02-03-protocol-v1.0.0-prerelease.md",
							rawData: "\ntitle: Protocol v1.0.0 Prerelease\ncomments: true\nauthor: acconut\nredirect_from: /blog/2015/02/03/protocol-v1.0.0-prerelease/\ndate: 2015-02-03\nslug: 2015/02/03/protocol-v1.0.0-prerelease/",
						};

export { _internal, body, collection, data, id, slug };
