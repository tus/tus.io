---
layout: default
title: FAQ
permalink: /faq.html
redirect_from: /guide.html
comments: true
---

# FAQ

Here are some Frequently Asked Questions and their answers. This document is still a work in progress and is being re-written as we speak. If you have any questions or topics you would like to see covered, [let us know](/support.html)!
{:.lead}

<div markdown="1" class="kramdown-toc">
  * This bullet will be replaced with the ToC
  {:toc}
</div>

## What is tus?

tus is a project aiming to make resumable file uploads easily usable and widely available. The most interesting parts of this project are the [protocol specification](/protocols/resumable-upload.html) and the many freely available [client and server implementations](/implementations.html).

When we say "resumable file uploads", we refer to the ability that uploads can be interrupted at any time and afterward be resumed from the state where the failure began. This interruption can be accidentally (e.g., a connection drop or a server crash) or voluntarily if the user decides to pause the upload. In traditional uploading implementations, your progress would be lost in such a situation, but tus enables you to recover from these interruptions and continue where the upload was stopped.

On a more technical note, the tus protocol is built upon HTTP/HTTPS to make it available on every platform including browsers, desktop software, and mobile applications. Furthermore, it also allows us to build upon the massive ecosystem and best practices that HTTP provides.

## When should I use tus?

If you are unsure whether tus is a good fit for your use case, here is a list of criteria. If one of these points applies to you, you could likely benefit from tus:

- You operate on partly unreliable networks where a connection can get easily dropped or a connection may not be available at all for some time, e.g., when using mobile data.
- You handle large files and want to avoid having to reupload parts of it, just because the upload got interrupted (Note: "large" is a relative word. A 10MB file can be large if you have an uplink speed of 100KB/s).
- You want to provide your users with the ability to pause an upload and resume it later (maybe even after a few days).
- You do not want to rely on proprietary upload solutions but instead, prefer to build upon free and open source projects.

Having that said, there are also a few situations where you might not want to use tus. This is mainly in scenarios where you handle many very small files (a few KBs) on a slow network and where the overhead of additional HTTP requests would significantly impact the performance. If you want us to assist you in your decision-making, [contact us](/support.html) and we are happy to give you some advice.

## How do I install tus and get started?

You'll need a:

- server implementation (you can read how to [get started with tusd](https://github.com/tus/tusd/#documentation), which is the most mature option), and a:
- client implementation (such as the bare-bones [tus-js-client](https://github.com/tus/tus-js-client#installation) for browsers and Node.js, or if you need a rich UI, [Uppy](https://uppy.io/docs/#getting-started).

Tus is a low-level building block and there's no one right way to do deploy resumable file uploads with it. Still, to get started quickly for the majority of use cases, we recommend using tusd in combination with Uppy. The ecosystem is rich, however, and you'll know it if one of our community-maintained client/server [implementations](https://tus.io/implementations.html) in Ruby, Python, Elixir, etc., are a better fit for your platform.

Finally, if you don't care for self-hosting tus servers, [Transloadit](https://transloadit.com) offers a tus-based upload handling service that can export to the storage of your choice (and can optionally encode or resize files passing through). The setup steps are then to create an account and add an Uppy HTML tag to your website, or check out [non-browser client integrations](https://transloadit.com/docs/#sdks).

## How does tus work?

This section covers the more low-level details of how tus performs an upload. If you are using one of our open-source [implementations](/implementations.html), you don't have to worry about these details but they may still be helpful to ease debugging and troubleshooting.

A tus upload is broken down into different HTTP requests, where each one has a different purpose:

- At first, the client sends a `POST` request to the server to initiate the upload. This *upload creation request* tells the server basic information about the upload, such as its size or additional metadata. If the server accepts this upload creation request, it will return a successful response with the `Location` header set to the *upload URL*. The upload URL is used to uniquely identify and reference the newly-created upload resource.
- Once the upload has been created, the client can start to transmit the actual upload content by sending a `PATCH` request to the upload URL, as returned in the previous `POST` request. Ideally, this `PATCH` request should contain as much upload content as possible to minimize the upload duration. The `PATCH` request must also contain the `Upload-Offset` header, which tells the server at which byte offset the server should write the uploaded data. If the `PATCH` request successfully transfers the entirety of the upload content, then your upload is done!
- If the `PATCH` request got interrupted or failed for another reason, the client can attempt to resume the upload. To resume, the client must know how much data the server has received. This information is obtained by sending a `HEAD` request to the upload URL and inspecting the returned `Upload-Offset` header. Once the client knows the upload offset, it can send another `PATCH` request until the upload is completely done.
- Optionally, if the client wants to delete an upload because it won't be needed anymore, a `DELETE` request can be sent to the upload URL. After this, the upload can be cleaned up by the server, and resuming the upload is not possible anymore.

If you want to see these requests in action, you can head over to our [demo](/demo.html) where the actual HTTP requests are shown on the page!

## How do I integrate tus into my application?

If you want to add tus to your application, you need a server and client component. For a quick start, we recommend having a look at our list of open-source [implementations](/implementations.html
). The exact setup steps vary for each implementation, but the basic scheme is as follows:

The tus server is usually deployed alongside your main application server in its process. A proxy is then used to route the requests to either the tus server or your application server. The tus server usually stores the uploads on disk, but some servers (such as our reference implementation [tusd](https://github.com/tus/tusd)) are also capable of storing the data directly on different cloud providers, such as AWS S3 or Google Cloud Storage.

Once you have a tus server set up, you can integrate the tus client into your client application. We offer tus clients for a variety of environments, including browsers, Android, iOS, Java and Node.js. If you want to add application-specific pieces of information to your upload, such as the current user's ID, you can add them as key-value-pairs to the upload's metadata. This metadata is then also available to the tus server for custom processing.

Finally, most tus servers offer a way to subscribe to specific events, such as if a new upload is created or finished. For example, [tusd](https://github.com/tus/tusd) has a [hook system](https://github.com/tus/tusd/blob/master/docs/hooks.md) that can be used to execute custom scripts or send HTTP requests if a specific event occurs. These can be used to move the completed uploads to another location and provide them with your application for further processing. It's also possible to access the upload's metadata set by the tus client in your client application inside these hooks.

## How do I scale tus?

The tus protocol has been designed with scaling in mind to handle increasing numbers of connections and uploads. While the exact details vary for different server implementations, these are the basic concepts:

If multiple tus servers have a shared storage system (a network disk or cloud storage), they can be grouped together and placed behind a load balancer. You only need to ensure that there is no parallel access to a single upload resource from multiple tus servers. The implementations can achieve this in two ways:

- If your application ensures that an upload is always accessed by only one client, you can enable sticky sessions for your load balancer. In this case, the HTTP requests for the client will always be routed to the same tus server that can handle the concurrency correctly.
- Alternatively, you can use a distributed lock (e.g., etcd or Redis) to ensure exclusive access to an upload resource. The lock must then be held as long as a server wants to retrieve or modify an upload resource.

Let's look at an example to see why this complex setup may be necessary. In our scenario, we have a single tus client and two tus servers, A and B, which are positioned behind a load balancer.

1. The client connects to server A through the load balancer and starts to upload data using a `PATCH` request.
2. After some time, the connection between the client and server A is interrupted. The important detail here is that the client can know very quickly that the connection has been dropped while the server is unaware of this situation. The server is therefore still waiting for more upload data to be written to the upload resource.
3. The client now wants to resume the upload, but connects to server B through the load balancer. If no locking were to be in place, server B and server A may write data to the same upload resource simultaneously leading to corrupt data.

This can be prevented if either sticky sessions were enabled, so the client would have connected to server A again, or if a shared locking mechanism between the servers would be required.

## How can I deal with bad HTTP proxies?

If you are dealing with HTTP proxies that strip/modify HTTP headers or can't handle `PATCH` requests properly, you should consider using HTTPS. This will make it impossible for proxies to modify your requests and lets you use the `X-HTTP-Method-Override` header, which allows you to take advantage of `POST` requests.

If that is not an option for you, please reach out to us. We are open to defining a compatibility protocol extension.

## How are pause/resume handled? When should I delete partial uploads?

The tus protocol is built upon the principles of simple pausing and resuming. To pause an upload, you are allowed to end the current open request. The server will store the uploaded data as long as no violations against other constraints (e.g., checksums) or internal errors occur. Once you are ready to resume an upload, send a `HEAD` request to the corresponding upload URL to obtain the available offset. After receiving a valid response, you can upload more data using `PATCH` requests. You should keep in mind that the server may delete an unfinished upload if it is not continued for a long period (see [Expiration](/protocols/resumable-upload.html#expiration
) extension).

Before deleting an outstanding upload, the server should give the client enough time to resolve potential networking issues. Since this duration depends heavily on the underlying application model, the protocol does not contain a specific number, but we recommend one week for a general use case.

## How can I get the file name or file type for an upload?

The tus protocol does not have a direct mechanism to obtain the type or filename of an upload as the specification does not have the principle of a disk-based file, allowing you to upload arbitrary data using tus. However, the desired functionality can be achieved by utilizing metadata. A client can attach the file's name and type to an upload when it's being created by setting the `Upload-Metadata` header. On the other side, the server can read these values and determine the name and type of the upload.

## Why is the protocol using custom headers?

We have carefully investigated the use of existing headers such as `Range` and `Content-Range`, but unfortunately, they are defined in a way that makes them unsuitable for resumable file uploads.

We also considered using existing `PATCH` payload formats such as [multipart/byteranges](http://greenbytes.de/tech/webdav/draft-ietf-httpbis-p5-range-latest.html#internet.media.type.multipart.byteranges), but unfortunately, the XHR2 [FormData interface](http://www.w3.org/TR/XMLHttpRequest/#interface-formdata) does not support custom headers for multipart parts, and the [send() method](http://www.w3.org/TR/XMLHttpRequest/#the-send-method) does not allow streaming arbitrary data without loading all of it into memory.

That being said, custom headers also allowed us to greatly simplify the client and server implementations, so we're quite happy with them.

## Why are you not using the "X-" prefix for your headers?

The "X-" prefix for headers has been deprecated, see [RFC 6648](https://datatracker.ietf.org/doc/html/rfc6648).

## What does "tus" even mean?

Historically it stood for **T**ransloadit **U**pload **S**erver, later repurposed to The Upload Server. But really, it's just known now as tus. Often written in the lower casing as an homage to unix ancestry, and (when it was still an abbreviation) to desperately avoid yelling TUS in all caps. We used to insist on lowercasing, but have gotten more pragmatic from our encounters with journalists, who insist on it being Tus in their articles, and there's not much we can do about it. So now we just say: write it however you feel like that day :smile:
