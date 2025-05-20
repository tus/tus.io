---
title: 'tusd is now available in Nix package manager'
author: acconut
date: 2025-05-20
---

We're excited to announce that tusd, the reference server implementation of the
tus resumable upload protocol, is now available in the Nix package manager! This
milestone makes it significantly easier to install and use tusd on Linux and
macOS systems.

## What is tusd and tus?

**tusd** is the official reference implementation of the tus resumable upload
protocol. It serves as both a production-ready server for handling resumable
file uploads and a reference for developers implementing the tus protocol in
their own applications.

**tus** is an HTTP-based protocol for resumable file uploads, which allows file
uploads to be interrupted and resumed without the need to re-upload the previous
data. An interruption may happen on purpose, if the user wants to pause, or by
accident in case of a network issue or server outage (or your cat deciding to
take a nap on the keyboard).

## Easy installation with nix

Thanks to the efforts of [Niklas Hambüchen (nh2)](https://github.com/nh2), tusd
is now available in the nixpkgs repository. As of NixOS release 25.05, tusd
2.8.0 is available. This means you can easily install and run tusd using the Nix
package manager without having to build from source or manage binary downloads.

To get started with tusd using Nix:

1. [Install the Nix package manager](https://nixos.org/download.html) if you
   haven't already
2. Run the following command to use tusd:

```bash
nix-shell -p tusd --run 'tusd --help'
```

Or to install it in your environment:

```bash
nix-env -iA nixpkgs.tusd
```

If you are getting errors, such as `undefined variable 'tusd'`, you are using an
older release that doesn't include tusd yet. Please specify a more recent
channel:

```bash
nix-shell -p tusd -I nixpkgs=channel:nixos-25.05 --run 'tusd --help'
```

## Future plans

One of our goals has always been to reduce barriers to entry for using the tus
protocol. Package manager support is a significant step in that direction,
making it easier for developers to get started with tusd without dealing with
manual installation processes. For the future, we're exploring options to make
tusd more accessible through more package managers. In particular, we're
currently seeking help with packaging tusd for Debian and Ubuntu distributions.
If you're interested in this and/or making tusd available via other distribution
methods, please reach out to us on [GitHub](https://github.com/tus/tusd).

If you're using a system with Nix available, we encourage you to try out tusd
today with this new installation method and let us know what you think. As
always, we welcome your feedback and contributions to help make the tus
ecosystem even better.
