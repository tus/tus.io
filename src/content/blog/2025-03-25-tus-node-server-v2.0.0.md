---
title:
  'tus Node.js server 2.0.0: integrate in all meta-frameworks and JS runtimes'
author: murderlon
date: 2025-03-25
---

The Node.js tus server can now run in all meta frameworks and Node.js compatible
runtimes. Deprecated options have been removed, and the server is ESM-only. The
packages now require Node.js >=20.19.0, the release that backported
`require(esm)`, allowing us to output ESM and import ESM packages without
affecting consumers on CommonJS. But that’s not all, let’s dive in.

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

## Looking back

tus Node.js [1.0.0](https://tus.io/blog/2023/09/04/tus-node-server-v100) brought
modular packages, TypeScript, and stability. Since that major release more we’ve
been shipping lots of improvements in minor versions, such as:

- Support for [custom lockers][locker] and distributed locks. This prevents
  concurrent access to the same resources, allowing for horizontal scaling
  without sticky sessions.
- Configuring a [max size][]. This makes it possible to limit the maximum upload
  size and could also help to prevent large payload attacks.
- Supporting more [protocol extensions][extensions].
- A new [`@tus/azure-store`][] package for
  [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs).
- Support for multi-tenant environments.
- Lots of stability improvements to [`@tus/s3-store`][].
- Allowing hooks to override metadata.
- Customizing upload URLs and
  [custom nested directories](https://github.com/tus/tus-node-server/tree/main/packages/server#example-store-files-in-custom-nested-directories)
- [And much more...](https://github.com/tus/tus-node-server/compare/%40tus/server%401.0.0...%40tus/server%402.0.0)

All while maintaining backwards compatibility. It has been battle tested at
scale in multiple large companies, including in a multi-tenant setup at
[Supabase](https://supabase.com).

However, these days people run JavaScript servers in lots of places and
environments. It has become quite common to not run your own Node.js server but
leverage new (serverless) runtimes, such as AWS Lambda, Cloudflare, Deno Deploy,
or Bun. Thanks to the [WinterTC](https://wintertc.org/), the Technical Committee
on Web-interoperable Server Runtimes, we can more or less everywhere write
servers with the web APIs: `Request` and `Response`.

Or you might be using a full-stack meta-framework, such as Next.js, Nuxt, React
Router, SvelteKit, etc. In which case you write your API or server logic there,
with similar `Request`/`Response` request handlers.

When a server is written specifically for Node.js with `http.IncomingMessage`
and `http.ServerResponse` handlers, there is no way to integrate in those
environments and frameworks.

## tus Node.js 2.0.0

### ESM-only

Considered impossible for as long as most can remember, all LTS releases of
Node.js can now
[`require(esm)`](https://joyeecheung.github.io/blog/2024/03/18/require-esm-in-node-js/)
from CommonJS. An incredible achievement and finally relieving maintainers from
choosing whether to publish CommonJS, ESM, or both.

With this release we bump the minimum required Node.js version from >=16
to >=20.19.0, the specific release that backported `require(esm)`.

While we don’t depend on any ESM-only packages yet, it does give us the
flexibility to do so should we need it, ensuring we can pick the best tools to
offer the best uploading experience.

### Running anywhere where JavaScript runs

tus Node.js 2.0.0 can now be integrated in all Node.js compatible runtimes and
meta-frameworks. This major version is a rewrite of all handlers to be based on
`Request` and `Response`, as it’s possible to convert Node’s request/response
objects to those but not the other way around.

Use the new `handleWeb()` method for `Request` based handlers, such as in Bun:

```js
import { Server } from '@tus/server'
import { FileStore } from '@tus/file-store'

const tus = new Server({
  path: '/files',
  datastore: new FileStore({ directory: './files' }),
})

Bun.serve({
  routes: {
    '/files/*': (req) => tus.handleWeb(req),
  },
})
```

Use the `handle()` method for integrating into traditional Node.js frameworks,
such as Fastify:

```js
import fastify from 'fastify'
import { Server } from '@tus/server'
import { FileStore } from '@tus/file-store'

const app = fastify()
const tus = new Server({
  path: '/files',
  datastore: new FileStore({ directory: './files' }),
})
app.addContentTypeParser(
  'application/offset+octet-stream',
  // Leave body untouched
  (request, payload, done) => done(null),
)
app.all('/files', (req, res) => tus.handle(req.raw, res.raw))
app.all('/files/*', (req, res) => tus.handle(req.raw, res.raw))
app.listen(3000)
```

Or run the server standalone:

```js
import { Server } from '@tus/server'
import { FileStore } from '@tus/file-store'

const host = '127.0.0.1'
const port = 1080

const tus = new Server({
  path: '/files',
  datastore: new FileStore({ directory: './files' }),
})
tus.listen({ host, port })
```

## What is next?

With this release, the server is in really good shape. Nonetheless some
improvements might be on the horizon soon.

- Structured logging with log levels.
- New distributed locks: a S3 locker based on
  [conditional writes](https://www.morling.dev/blog/leader-election-with-s3-conditional-writes/)
  and Google Cloud Storage locker (already WIP) with a
  [similar approach](https://www.joyfulbikeshedding.com/blog/2021-05-19-robust-distributed-locking-algorithm-based-on-google-cloud-storage.html),
  removing the need for something like Redis or Postgres.
- Even more stability?

Take the [tus server][tus-node-server] for a spin and let us know what you
think!

[tus-node-server]: https://github.com/tus/tus-node-server
[locker]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#optionslocker
[max size]:
  https://github.com/tus/tus-node-server/tree/main/packages/server#optionsmaxsize
[extensions]: https://tus.io/protocols/resumable-upload#protocol-extensions
[`@tus/azure-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/azure-store
[`@tus/s3-store`]:
  https://github.com/tus/tus-node-server/tree/main/packages/s3-store
