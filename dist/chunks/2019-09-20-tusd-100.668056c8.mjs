const id = "2019-09-20-tusd-100.md";
						const collection = "blog";
						const slug = "2019/09/20/tusd-100/";
						const body = "\nToday, we are thrilled to announce the v1.0.0 release of our [tusd project](https://github.com/tus/tusd), the official reference implementation for the tus protocol. Don't let yourself be fooled by the version number, tusd has been production-ready and battle-tested for many years already.\n\nThis release ships with a few exciting new features but most of the changes were necessary to clean up technical debt which accumulated over the last four years. We try to avoid frequent breaking changes in tusd to reduce the impact of dependency upgrades on your project. However, this debt also prevented us from adding new highly-requested features and tusd 1.0 is now able to deliver those.\n\nA detailed list of all relevant changes in the 1.0 release can be found in the [release notes](https://github.com/tus/tusd/releases/tag/v1.0.0) where you are also able to download prebuilt binaries for Linux, macOS and Windows.\n\nDespite the number of breaking changes, I want to emphasize that **no changes to your tus clients** are necessary. All breaking changes are server-facing only and tusd offers the same tus HTTP interface as before. This was an important guarantee for us as we want to make it easy for you to upgrade tusd without worrying about older clients.\n\nFinally, I want to thank everyone again who helped to make this release happen! If you also want to contribute, you can find our open source code at [GitHub](https://github.com/tus). If you don't know where to start or have other questions, feel free to [contact us](/support.html)!\n";
						const data = {title:"The tusd server hits v1.0.0",author:"acconut",date:new Date(1568937600000)};
						const _internal = {
							filePath: "/Users/nick/dev/transloadit/tus.io/src/content/blog/2019-09-20-tusd-100.md",
							rawData: "\ntitle: \"The tusd server hits v1.0.0\"\nauthor: acconut\nredirect_from: /blog/2019/09/20/tusd-100/\ndate: 2019-09-20\nslug: 2019/09/20/tusd-100/",
						};

export { _internal, body, collection, data, id, slug };
