---
title: 'Standardizing Resumable Uploads with the IETF'
author: acconut
redirect_from: /blog/2023/08/09/resumable-uploads-ieft/
date: 2023-08-09
---

In the past year, we have worked together with the HTTP working group inside the Internet Engineering Task Force (IETF) to advance the state of resumable uploads and craft an official RFC for better file uploads over the internet. In this post, we share the latest developments from this journey.

With traditional file uploads, any upload progress will be lost if the connectivity between the user's device and the destination server is interrupted. The data then has to be retransmitted in its entirety, which is especially problematic for large files or on slow network connections. Resumable uploads improve the user experience by allowing the upload to be resumed from the point where the transfer failed.

When we started tus in 2013, the landscape of resumable uploads was fragmented. Many services, such as YouTube, implemented their own proprietary approach for solving the problem of unreliable uploads. Any open-source solution was usually tailored towards one platform, most commonly the web, and thus not easily usable on mobile platforms etc. With the tus project, we created an open protocol that is compatible with any platform, be it the web or mobile devices. Over the years, it has grown into an active ecosystem of [interoperable implementations](https://tus.io/implementations) for upload clients and servers. In addition, large providers such as Cloudflare, Vimeo and GitHub started to adopt resumable uploads via tus for their applications.

Last year, we announced the next step: working together with the [Internet Engineering Task Force (IETF)](https://www.ietf.org/) on a standardized, official specification for resumable uploads over HTTP. The IETF is an internet standards-setting organization that defines the network protocols powering the entire internet, such as TCP, DNS and, most importantly for us, HTTP. Through this work, we hope to make resumable uploads **part of HTTP**, instead of just **using HTTP**. This would enable platforms, such as browsers and mobile SDKs, to implement resumable uploads directly, rather than having application developers come up with solutions of their own.

## What has happened?

A lot has happened since we started working together with the IETF. Two weeks ago, one of the triennial IETF meetings concluded, making this a great time to give you an update on our journey:

- In September 2022, our draft for resumable uploads was adopted by the HTTP working group under the name [draft-ietf-httpbis-resumable-upload](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/). This means that the working group agrees that the resumability of uploads is something that should be handled inside HTTP, and is interested in addressing this. As the group is in the process of discussing this topic, the draft will evolve over time.
- We published five revisions of our draft, integrating various feedback from the working group and its interested members. The latest revision, as of writing this, is draft-ietf-httpbis-resumable-upload-01.
- We attended the last three IETF meetings, either remotely or on-site, in London, Yokohama and San Francisco, where we had the chance to present our work and discuss it with the entire working group.
- The community then started to experiment with the new draft and gather first-hand experience by implementing it in existing tus implementations. We collect details about these efforts in a [central repository](https://github.com/tus/draft-example/).
- Apple has announced that it will include [support for resumable uploads](https://developer.apple.com/videos/play/wwdc2023/10006/) in its native URLSession API, starting with iOS 17. This is a huge milestone, as it will be the first platform to provide such capabilities directly to application developers!

## What is next?

The resumable uploads specification is still an active draft and not a published RFC (yet). We are gathering feedback and experience to evolve the draft accordingly. If you are willing to follow this development, or even participate in it, feel free to:

- read the current draft in the [IETF Datatracker](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/);
- [join the HTTP working group](https://httpwg.org/about/) to participate in the discussion on [GitHub](https://github.com/httpwg/http-extensions/labels/resumable-upload) or in the [mailing list](https://lists.w3.org/Archives/Public/ietf-http-wg/); and
- try out one of the [example implementations](https://github.com/tus/draft-example/). We already have examples for the web and iOS, and servers in Swift, .NET, and Go.

We are always eager to hear what you are thinking!

## What does this mean for the future of tus?

A goal of tus has been to make resumable, and thus reliable uploads universally available. With the adoption of this draft by the IETF, we are seeing our ambition come to fruition. It is impossible to predict the future, but we expect the majority of our protocol to be replaced by an upcoming resumable uploads standard. This includes the core protocol, as well as the creation, creation with upload, and termination extensions. It is also likely that the checksum extension will be replaced by [draft-ietf-httpbis-digest-headers](https://datatracker.ietf.org/doc/draft-ietf-httpbis-digest-headers/), which defines a new set of integrity headers for HTTP. 

Not every feature from tus 1.0 fits into the tight scope of an RFC. This leaves the expiration and concatenation extensions for tus 2.0, as there is currently no direct replacement inside HTTP for them (as far as we are aware). tus 2.0 could also cover smaller details, such a metadata handling and discovery of optional features.

The following table outlines how sections of tus 1.0 might be covered in the future:

| tus 1.0 sections                                                                                      | Will be covered in the future by ...                                                                          |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Core protocol](https://tus.io/protocols/resumable-upload#core-protocol)                              | [draft-ietf-httpsbis-resumable-upload](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/) |
| [Creation extension](https://tus.io/protocols/resumable-upload#creation)                              | [draft-ietf-httpsbis-resumable-upload](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/) |
| [Creation-with-upload extension](https://tus.io/protocols/resumable-upload#creation-with-upload)      | [draft-ietf-httpsbis-resumable-upload](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/) |
| [Termination extension](https://tus.io/protocols/resumable-upload#termination)                        | [draft-ietf-httpsbis-resumable-upload](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/) |
| [Checksum extension](https://tus.io/protocols/resumable-upload#checksum)                              | [draft-ietf-httpbis-digest-headers](https://datatracker.ietf.org/doc/draft-ietf-httpbis-digest-headers/)      |
| [Expiration extension](https://tus.io/protocols/resumable-upload#expiration)                          | tus 2.0                                                                                                       |
| [Concatenation extension](https://tus.io/protocols/resumable-upload#concatenation) (parallel uploads) | tus 2.0                                                                                                       |

Putting the protocol specification aside, the tus project also maintains a set of official client and server implementations. We hope that in the future, platforms such as browsers and mobile SDKs can provide resumable uploads directly, reducing the need for an additional resumable upload client in each application. Similarly, server frameworks and proxies could implement support for resumable uploads, allowing developers to build an application without a separate upload server. These are still vague ideas today, but with [Apple's new resumable upload APIs](https://developer.apple.com/videos/play/wwdc2023/10006/), we are seeing the first steps being taken in this direction. We are excited about a future where the core feature of our implementations will be covered by platforms directly. However, this journey has also taught us that it will take the ecosystem a long time to fully catch on. Until it hasn’t, we will be here to maintain implementations to fill the gaps, provide stewardship for the community, and work on protocol extensions that don’t quite fit in an RFC.

As such, the future of resumable uploads is provided by the IETF standard (at its core) and the tus project (community, extensions, and missing components) together.

## Thank you

A major debt of gratitude is owed to [Guoye Zhang](https://github.com/guoye-zhang), [Jonathan Flat](https://github.com/jrflat), [Jiten Mehta](https://github.com/jitenmehta), [Justin Ruggles](https://github.com/justinruggles), [Lucas Pardue](https://github.com/LPardue), [Stefan Matsson](https://github.com/smatsson), and the entire [HTTP working group](https://httpwg.org/). All of them have dedicated their time and efforts to making universally available resumable uploads a reality. Thank you all!
