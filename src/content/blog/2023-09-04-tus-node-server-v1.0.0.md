---
title:
  'tus Node.js server 1.0.0: new packages, rewritten in TypeScript, and much
  more'
author: murderlon
date: 2023-09-04
---

The [Node.js tus server](https://github.com/tus/tus-node-server) has been
revived and is now officially semver stable! It has been completely rewritten in
TypeScript and was split into separate packages. There is a new system for
events and hooks, as well as elaborate docs with examples. And those are just a
few of the many fixes and features that we will dive into below.

## What is tus?

tus is an HTTP-based protocol for resumable file uploads. Resumable means that
an upload can be picked up again at any moment, after it was interrupted for
whatever reason, without the need to re-upload the previous data. An
interruption may happen on purpose, if the user wants to pause, or by accident
in case of a network issue or server outage (or your cat deciding to take a nap
on the keyboard).

The developers behind tus are currently working together with the influential
HTTP working group inside the Internet Engineering Task Force (IETF) – the
internet standards-setting organization that defines the network protocols
powering the entire internet – to
[make resumable uploads an official standard](https://tus.io/blog/2023/08/09/resumable-uploads-ietf)
across the web.

[tus-node-server][] is an official implementation of the tus resumable upload
protocol. It is capable of accepting uploads of all sorts and sizes, and storing
them locally on disk, or remotely on Google Cloud Storage or AWS S3 (or any
other S3-compatible storage system). Due to its modularization and
extensibility, support for nearly any other cloud provider could easily be
added.

## History

The Node.js tus server, [tus-node-server][], was originally published by
[@bhstahl][] in May 2016. As with many open source projects, not everyone has
the time to maintain things for free in their own time and as such,
[tus-node-server][] was more or less abandoned at the end of 2018.

In 2021, [@acconut][], [@mitjap][], and others sprung some life into the server
again by upgrading dependencies and adding a few essential features that were
missing. However, there was still a lot of work ahead before the server could be
considered stable and on par with the [protocol specification][].

At the start of 2023, [Transloadit][] graciously allowed me ([@murderlon][]) to
work on the server on company time. This, together with the help of
contributors, kick-started the effort towards `1.0.0`.

## The new major release

After a long beta phase, the new major is now ready.

Here is an overview of the features and fixes that were implemented since work
was resumed in 2023, up until today's `1.0.0` release.

### Split packages under the `@tus` scope

For modularity and to signal the official packages, the server has been split
into separate packages under the `@tus` scope:

- [`@tus/server`][] The tus server. Standalone or integrate it into your Node.js
  server.
- [`@tus/file-store`][] Store files on disk.
- [`@tus/s3-store`][] Store files on AWS S3.
- [`@tus/gcs-store`][] Store files on Google Cloud Storage.

### Highlights

- 🔒 Completely rewritten in TypeScript
- 📦 Split into separate packages
- 🪝 New events and hooks system
- 📝 New elaborate docs with examples
- 🚢 Upgraded all dependencies to the latest
- 🔄 Redesigned stores for better separation of concerns
- ✅ Rewrote all tests for stores and allowed for shared tests between stores
- ⏳ Added the Expiration extension to `@tus/file-store`
- ⏩ Respect forwarded headers (`Forwarded`, `X-Forwarded-Host`,
  `X-Forwarded-Proto`)
- 🧮 Calculate optimal part size for S3. This is important to avoid the
  10,000-parts limit for large uploads.
- 🧩 Handle chunks under the minimum S3 part size. Chunks that are smaller than
  the minimum S3 part size are buffered and uploaded when they reach the minimum
  part size.
- 🏗 Use GitHub Actions for CI

### At a glance

Let’s look at an example of the new packages and some of the features from an
integration perspective. We will use the [`@tus/server`][] and
[`@tus/s3-store`][] packages.

```js
const { Server, EVENTS } = require('@tus/server')
const { S3Store } = require('@tus/s3-store')
// ...

const host = '127.0.0.1'
const port = 1080
const datastore = new S3Store({
  s3ClientConfig: {
    bucket: process.env.AWS_BUCKET,
    region: process.env.AWS_REGION,
    // Alternative auth methods now also supported
    credentials: new aws.ECSCredentials({
      httpOptions: { timeout: 5000 },
      maxRetries: 10,
    }),
  },
})
const server = new Server({
  path: '/files',
  datastore,
  // New hooks
  async onIncomingRequest(req, res) {
   // we can use this for access control
  },
  async onUploadCreate(req, res, upload) {
  // we can validate metadata here and reject the upload
  },
  async onUploadFinish(req, res, upload) {
  // we can use this to do post-processing or
  // move the upload to a different bucket
  },
})

// New events system
server.on(EVENTS.POST_CREATE, (req, res, upload => {})
server.on(EVENTS.POST_RECEIVE, (req, res, upload => {})
server.on(EVENTS.POST_FINISH, (req, res, upload => {})
server.on(EVENTS.POST_TERMINATE, (req, res, id => {})

server.listen({ host, port })
```

#### Examples

There are also examples showcasing how to integrate the server with [Express][],
[Koa][], [Fastify][], and [Next.js][].

Still curious how to use hooks? There is also an example showing how to
[validate metadata][] and [access control][] with (pseudo-code) JSON Web Tokens.

### Bug fixes

- Fixed memory leaks on interrupted upload.
- Fixed a race condition in S3 store, resulting in a buffered chunk not being
  concatenated to the upload.
- Fixed invalid character errors for `x-amz-meta-file` header when using the S3
  store.
- Implemented a fix for HEAD request not returning `Upload-Offset` when S3
  multipart upload is finished.
- Removed the content-length response header for 204 status code, which is not
  allowed by the HTTP spec.
- Implemented a fix to reject partial uploads if the [concatenation][] extension
  is not supported.
- Handle `Upload-Defer-Length` consistently for all stores.
- Fixed the upload ID when using S3 store with Digital Ocean Spaces.
- Fixed the bucket exists check for the Google Cloud Storage store.
- Fixed the emit upload complete event when using the [creation-with-upload][]
  extension.
- Fixed the validation of the `Upload-Length` header in the patch handler.

## What is next?

This major release focuses on stability, and getting the server and the stores
production-ready.

Here are some of the features we are focusing on next:

- Support for custom lockers and providing a distributed lock. This would
  prevent concurrent access to the same resources, allowing for horizontal
  scaling without sticky sessions.
- Support for the `Tux-Max-Size` header. This would make it possible to limit
  the maximum upload size and could also help to prevent large payload attacks.
- Structured logging with configurable log levels.
- Consistent support for [protocol extensions][] across all stores.
- Support for different JavaScript runtimes, such as Deno, Cloudflare Workers,
  and AWS Lambda.

Take the [tus server][tus-node-server] for a spin (or try the
[demo](https://github.com/tus/tus-node-server#demos)) and let us know what you
think!

[tus-node-server]: https://github.com/tus/tus-node-server
[@mitjap]: https://github.com/mitjap
[@acconut]: https://github.com/acconut
[@bhstahl]: https://github.com/bhstahl
[@murderlon]: https://github.com/murderlon
[protocol specification]: https://tus.io/protocols/resumable-upload
[Transloadit]: https://transloadit.com/open-source
[`@tus/server`]:
  https://github.com/tus/tus-node-server/tree/main/packages/server
[`@tus/file-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/file-store
[`@tus/s3-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/s3-store
[`@tus/gcs-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/gcs-store
[creation-with-upload]:
  https://tus.io/protocols/resumable-upload.html#creation-with-upload
[concatenation]: https://tus.io/protocols/resumable-upload.html#concatenation
[tus-max-size]: https://tus.io/protocols/resumable-upload.html#max-size
[protocol extensions]:
  https://tus.io/protocols/resumable-upload#protocol-extensions
[Express]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#example-integrate-tus-into-express
[Koa]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#example-integrate-tus-into-koa
[Fastify]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#example-integrate-tus-into-fastify
[Next.js]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#example-integrate-tus-into-nextjs
[validate metadata]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#example-validate-metadata-when-an-upload-is-created
[access control]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#example-access-control
