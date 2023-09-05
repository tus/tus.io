---
title: 'Tus Node.js 1.0.0: new packages, rewritten in TypeScript, and much more'
author: murderlon
date: 2023-09-04
---

The [Node.js tus server](https://github.com/tus/tus-node-server) has been
revived and is now officially semver stable! It has been completely rewritten in
TypeScript, split into separate packages, has new events and hooks system,
elaborate docs with examples, and many fixes and features we’ll dive into below.

## History

The Node.js tus server, [tus-node-server][], was originally published by
[@bhstahl][] in May 2016. As with many open source projects, not everyone has
the time to maintain things for free in their own time and as such
[tus-node-server][] was more or less abandoned at the end of 2018.

In 2021, [@acconut][], [@mitjab][], and others sprung some live into the server
again by upgrading dependencies adding some missing essential features. However
there was still a lot of work ahead before the server could be considered stable
and on par with the [protocol specification][].

At the start of 2023, [Transloadit][] graciously allowed me ([@murderlon][]) to
work on the server while getting paid. This, together with the help of
contributors, kick-started the effort towards `1.0.0`.

## The new major release

After a long beta phase the new major is now ready.

Here is an overview of the features and fixes since work was resumed in 2023 up
until the `1.0.0` release.

### Split packages under the `@tus` scope

For modularity and to signal the official packages; the server has been split
into separate packages under the `@tus` scope.

- [`@tus/server`][]. The tus server. Standalone or integrate it into your
  Node.js server.
- [`@tus/file-store`][]. Store files on disk.
- [`@tus/s3-store`][]. Store files on AWS S3.
- [`@tus/gcs-store`][]. Store files on Google Cloud Storage.

### Highlights

- 🔒 Completely rewritten in TypeScript
- 📦 Split into separate packages
- 🪝 New events and hooks system
- 📝 New elaborate docs with examples.
- 🚢 Upgrade all dependencies to latest.
- 🔄 Redesigned stores for better separation of concerns
- ✅ Rewrite all tests for stores and share tests between stores.
- ⏳ Add the Expiration extension to `@tus/file-store`.
- 🛡 Respect forwarded headers (`Forwarded`, `X-Forwarded-Host`,
  `X-Forwarded-Proto`).
- 🧮 Calculate optimal part size for S3. This is important to avoid the 10,000
  parts limit for large uploads.
- 🧩 Handle chunks under the minimum S3 part size. Clients can also send chunks
  that are smaller than the minimum S3 part size. These chunks are buffered and
  uploaded when they reach the minimum part size.
- 🏗 Use GitHub Actions for CI.

### At a glance

Let’s look at an example of the new packages and some of the features from an
integration perspective.

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

// New event system
server.on(EVENTS.POST_CREATE, (req, res, upload => {})
server.on(EVENTS.POST_RECEIVE, (req, res, upload => {})
server.on(EVENTS.POST_FINISH, (req, res, upload => {})
server.on(EVENTS.POST_TERMINATE, (req, res, id => {})

server.listen({ host, port })
```

### Bug fixes

- Fix memory leaks on interrupted upload
- Fix race condition in S3 store resulting in a buffered chunk not being
  concatenated to the upload.
- Fix invalid character errors for "x-amz-meta-file” header when using the S3
  store.
- Fix for HEAD request not returning Upload-Offset when S3 multipart upload is
  finished
- Remove content-length response header for 204 status code, which is not
  allowed by the HTTP spec.
- Reject partial upload if [concatenation][] extension is not supported.
- Fix [creation-defer-length][] extension for all stores
- Fix upload ID when using S3 store with Digital Ocean Spaces.
- Fix the bucket exists check for the Google Cloud Storage store.
- Fix emit upload complete event when using creation-with-upload extension.
- Fix validation of upload-length header in patch handler.

## What is next

This major release focused on stability and getting the server and the stores
production ready.

Some features we are focussing on next:

- Support for custom lockers and providing a distributed lock. This would
  prevent concurrent access to the same resources, allowing for horizontal
  scaling.
- Support for the `Tux-Max-Size` header. This would allow for limiting the
  maximum upload size. This could also help prevent large payload attacks.
- Structured logging with configurable log levels.
- Supporting [protocol extensions][] consistently across all stores.
- Support for different JavaScript runtimes, such as Deno, Cloudfare Workers,
  AWS Lambda.

Take the tus server for a spin (or try the
[demo](https://github.com/tus/tus-node-server#demos)) and let us know what you
think!

[tus-node-server]: https://github.com/tus/tus-node-server
[@mitjab]: https://github.com/mitjab
[@acconut]: https://github.com/acconut
[@bhstahl]: https://github.com/bhstahl
[@murderlon]: https://github.com/murderlon
[protocol specification]: https://tus.io/protocols/resumable-upload
[Transloadit]: https://transloadit.com
[`@tus/server`]:
  https://github.com/tus/tus-node-server/tree/main/packages/server
[`@tus/file-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/file-store
[`@tus/s3-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/s3-store
[`@tus/gcs-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/gcs-store
[creation-defer-length]:
  https://tus.io/protocols/resumable-upload.html#creation-with-upload
[concatenation]: https://tus.io/protocols/resumable-upload.html#concatenation
[tus-max-size]: https://tus.io/protocols/resumable-upload.html#max-size
[protocol extensions]:
  https://tus.io/protocols/resumable-upload#protocol-extensions
