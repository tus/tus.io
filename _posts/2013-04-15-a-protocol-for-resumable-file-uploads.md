---
layout: post
title: A protocol for resumable file uploads
comments: true
date: 2013-04-15 15:00:00
author: felixge
---

**tl;dr:** We are happy to announce version 0.1 of the [tus resumable upload
protocol](/protocols/resumable-upload.html) and are interested in your
feedback!

With mobile devices becoming the dominant source of user generated media files,
reliable file uploading through unreliable mobile networks has become an
important issue for anybody interested in content acquisition.

Reliability here means the ability to detect network errors, and resuming an
upload without having to start from the beginning. In many scenarios this can
mean the difference between a file reaching your application, or the user
giving up in frustration.

Ideally, this should be a trivial feature to add. In reality however, there is
quite a lack of solutions in this space. Sure, there are a few JavaScript
libraries that claim to support resumable uploading, but in reality you will
end up spending a lot of time coming up with your own API for it, or
implementing a poorly specified one specific to a library. This is incredibly
frustrating, especially if you are planning to support this feature on multiple
platforms such as HTML5, iOS and Android.

Now, if you're a big company like Google, you may sit down and create such a
protocol for your needs. And in fact, Google has been working on a [such a
protocol](http://code.google.com/p/gears/wiki/ResumableHttpRequestsProposal)
since 2010, for the now defunct Google Gears. The latest incarnation of this
are two incompatible protocols for [Google
Drive](https://developers.google.com/drive/manage-uploads) and
[YouTube](https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol).
But unfortunately both of these protocols rely on a non-standard http status
code (`308 Resume Incomplete`), and are far from being generic enough for
general adoption.

This means that smaller companies are currently doomed to invent, implement and
maintain their own incompatible protocols and solutions for something that
should be a trivial component of a modern application.

We find this unacceptable, so the [tus project](http://www.tus.io/) is a
community project that was born in order to level the playing field and make
resumable file uploading easy for anybody to implement.

Today we are happy to release version 0.1 of [our
protocol](/protocols/resumable-upload.html). Interested developers are
encouraged to experiment with it, and we are very interested in any feedback
you may have.

Later this week we will also release some initial clients for
[jQuery](https://github.com/tus/tus-jquery-client) and
[iOS](https://github.com/tus/tus-ios-client), so make sure to follow this blog
and these repositories for future updates!

Please let us know what you think!
