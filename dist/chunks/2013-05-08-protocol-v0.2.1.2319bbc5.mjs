const id = "2013-05-08-protocol-v0.2.1.md";
						const collection = "blog";
						const slug = "2013/05/08/protocol-v0.2.1/";
						const body = "\nThis is a minor protocol release:\n\n- Fix [#19](https://github.com/tus/tus-resumable-upload-protocol/pull/19):\n  Final-Length header was called Final-Size in one place by accident. ([Naren\n  Venkataraman](https://github.com/vayam))\n- Define that PATCH requests MUST use `application/offset+octet-stream` as the\n  `Content-Type`. ([Felix Geisendörfer](https://github.com/felixge))\n- Define that `Final-Length` values MUST NOT be negative. ([Felix\n  Geisendörfer](https://github.com/felixge))\n\nAll patches can be seen [here](https://github.com/tus/tus-resumable-upload-protocol/compare/v0.2...v0.2.1).\n";
						const data = {title:"Protocol v0.2.1",author:"felixge",date:new Date(1367971200000)};
						const _internal = {
							filePath: "/Users/nick/dev/transloadit/tus.io/src/content/blog/2013-05-08-protocol-v0.2.1.md",
							rawData: "\ntitle: Protocol v0.2.1\ncomments: true\nauthor: felixge\nredirect_from: /blog/2013/05/08/protocol-v0.2.1/\ndate: 2013-05-08\nslug: 2013/05/08/protocol-v0.2.1/",
						};

export { _internal, body, collection, data, id, slug };
