---
title: 'Standardizing Resumable Uploads with the IETF'
author: acconut
redirect_from: /blog/2023/08/09/resumable-uploads-ieft/
date: 2023-08-09
---

In the past year, we have worked together with the HTTP working group inside the Internet Engineering Task Force (IETF) to advance the state of resumable uploads and craft an official RFC for better file uploads over the internet. In this post, we share the latest developments from this journey.

With traditional file uploads, any upload progress will be lost if the connectivity between the user's device and the destination server is interrupted. The entire data then has to be retransmitted, which is especially problematic for large files or slow network connections. Resumable uploads improve the user experience by allowing the upload to be resumed from the point where the transfer failed.

When we started tus in 2013, the landscape of resumable uploads was fragmented. Many services, such as YouTube, implemented their own proprietary approach for solving this problem. Any open-source solution was usually tailored towards one platform, most commonly the web, and thus not easily usable from mobile platforms etc. With the tus project, we created an open protocol that is compatible with any platform, whether it be the web or mobile devices. Over the years, this has grown into an active ecosystem of [interoperable implementations](https://tus.io/implementations) for upload clients and servers. In addition, large providers, such a Cloudflare, Vimeo and Github, started to adopt resumable uploads via tus for their applications.

Last year, we announced as the next step that we are working together with the [Internet Engineering Task Force (IETF)](https://www.ietf.org/) on a standardized, official specification for resumable uploads over HTTP. The IETF is an internet standards-setting organization that defines the network protocols powering the entire internet, such as TCP, DNS, and most importantly for us, HTTP. Through this work, we hope to make resumable uploads **part of HTTP**, instead of just **using HTTP**. The benefit is that it will enable resumable uploads to be implemented by platforms directly, such as by browers and mobile SDKs, instead of having to be managed by applications on their own.

## What has happened?

A lot has happened since we started working together with the IETF. Two weeks ago, one of the triannual IETF meetings concluded, making it a great time to provide an update on this journey:

- In September 2022, our draft for resumable uploads has been adopted by the HTTP working group under the name [draft-ietf-httpbis-resumable-upload](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/). This means that the working group agrees that resumable uploads is a problem that should be solved inside HTTP and is interested in addressing this. As the group is discussing this topic, the draft will evolve and change over time.
- We published five revisions of our draft, integrating various feedback from the working group and its interested members. The latest revision, as of writing this, is draft-ietf-httpbis-resumable-upload-01.
- We attended the last three IETF meeting remotely and onsite in London, Yokohama, and San Francisco, where we had the chance to present this work and discuss it with the entire working group.
- The community added support to existing tus implementations to experiment with the new draft and gather first-hand experience. We collect details about these efforts in a [central repository](https://github.com/tus/draft-example/).
- Apple announced that they will be including support for resumable uploads in their native URLSession API starting with iOS 17. This is a huge milestone and makes it the first platform to provide such capabilities directly to application developers!

## What is next?

The resumable uploads specification is still an active draft and not a published RFC (yet). We are working on gathering feedback and experience to evolve the draft accordingly. If you are willing to follow this development or even participate, feel free to:

- Read the current draft in the [IETF datatracker](https://datatracker.ietf.org/doc/draft-ietf-httpbis-resumable-upload/).
- [Join the HTTP working group](https://httpwg.org/about/) and participate in the discussion on [GitHub](https://github.com/httpwg/http-extensions/labels/resumable-upload) or in the [mailing list](https://lists.w3.org/Archives/Public/ietf-http-wg/).
- Try out one of the [example implementations](https://github.com/tus/draft-example/). We already have examples for the web and iOS, and servers in Swift, .NET, and Go.

We are always eager to hear what people are thinking!

## What does this mean for the future of tus?

As we already explained in our [last blog post on this topic](/blog/2022/02/24/tus-v2), a potential resumable uploads standard from the IETF will not replace tus. Instead, we believe that they will complement each other. While the IETF standard aims to provide a basic approach for resumable uploads, tus 2.0 will built upon this standard and extend it with additional features, such as metadata handling, file expiration, parallel uploads etc, that do not fit into the scope of a single RFC. In addition, the tus project will provide and maintain official implementations and tools while assisting the community with building additional ones. As such, the future of resumable uploads is provided by the IETF standard and the tus project together.

## Thank you

A grateful “Thank You” goes especially to [Guoye Zhang](https://github.com/guoye-zhang), [Jonathan Flat](https://github.com/jrflat), [Jiten Mehta](https://github.com/jitenmehta), [Justin Ruggles](https://github.com/justinruggles), [Lucas Pardue](https://github.com/LPardue), [Stefan Matsson](https://github.com/smatsson), and the entire [HTTP working group](https://httpwg.org/). All of them have dedicated their time and efforts into working on resumable uploads. Thank you all!
