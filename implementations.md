---
layout: default
title: Implementations
comments: true
---

## {{page.title}}


### Client-side

- [tus-jquery-client](https://github.com/tus/tus-jquery-client)
Add resumable file uploads to web apps that are built with jQuery
- [tus-ios-client](https://github.com/tus/tus-ios-client)
Add resumable file uploads to iOS apps <span class="muted">&mdash; Coming Soon</span>
- [tus-android-client](https://github.com/tus/tus-android-client)
Add resumable file uploads to Android apps <span class="muted">&mdash; Coming Soon</span>

<hr />

### Server-side

- [tusd](https://github.com/tus/tusd)
A stand-alone server written in go to handle resumable file uploads
using the tus protocol

### Tus implementations in the wild

Drop a line if you built an open source tus implementation, and you'll be listed here

- [eahydra/tusclient](https://github.com/eahydra/tusclient)
tus `v0.2.1` resumable file upload client in Go
by [eahydra](https://github.com/eahydra)
- [vayam/tuspy](https://github.com/vayam/tuspy)
tus `v0.2.0` resumable file upload client in Python
by [Naren Venkataraman](https://github.com/vayam)
- [vayam/brewtus](https://github.com/vayam/brewtus)
tus `v0.2.1` resumable file upload server in node.js
by [Naren Venkataraman](https://github.com/vayam)
- [leblanc-simon/php-tus](https://github.com/leblanc-simon/php-tus)
tus `v0.2.1` resumable file upload client in PHP
by [Simon Leblanc](https://github.com/leblanc-simon)

### More ...

The tus protocol is very simple and because it builds on standard HTTP calls it
could be implemented as Ruby libraries, Wordpress plugins, etc.

The tus organisation on Github can provide a home for many more implementations
than we're currently trying to push out. Feel free to help out!

You'll first be listed in the 'in the wild' section, and if you're interested, you could
become a maintainer of your language/platform inside the tus organisation.
