---
layout: post
title: Project Status
comments: true
author: kvz
redirect_from: /blog/2015/09/19/project-status/
---

Here's a quick update on the status of the project.

<!--more-->

### 1.0

We're finalizing 1.0. Our project
lead [Marius Kleidl](https://github.com/Acconut) has been taking care
of integrating a large batch of improvements
that were made by Vimeo's [Naren Venkataraman](https://github.com/vayam) and this team.

Things still left to do:

- [Write a Developers Guide](https://github.com/tus/tus-resumable-upload-protocol/issues/59)
- Gather a *final round of feedback* on [the 1.0 proposal](https://github.com/tus/tus-resumable-upload-protocol/pull/57)

We're waiting for a *final round of feedback* to make sure every last bit
is taken care of before cementing everything into our first stable release.

### Exposure & Swag

To make sure every developer and interested party had their change to chime in,
we're trying to get some extra exposure for the project. We'll be covered
in the upcoming [Changelog](https://changelog.com/) and Transloadit
is sponsoring conferences to hand out swag and raise tus awareness.

Swag is also for sale at the new [Transloadit shop](https://shop.transloadit.com/). The shop
currently features a variety of Transloadit, Uppy and Tus products and we're working with [Printful](https://www.theprintful.com/) to improve on that.
Know that any profit flows back to the project and our books are open to
anyone who wants to verify.

### Implementations

While 1.0 could potentially still be changed, we don't expect major changes
so our official implementations have already been made 1.0 compatible.

All official projects have been updated to the 1.0 branch already
for which a big thank you goes out to [Mark R. Masterson](https://github.com/MMasterson)
and Marius who upgraded all of our implementations.

Marius also added Android and
standalone Java implementations as official tus projects, and replaced our jQuery
implementation with a standalone [tus-js-client](https://github.com/tus/tus-js-client).

If you're interested in building & maintaining new 1.0 implementations, becoming
a member of tus core, leave a note here:

 - [More 1.0 implementations](https://github.com/tus/tus-resumable-upload-protocol/issues/67)

### Design

The whole site has been given a new layout by [Fahad Ibnay Heylaal](https://github.com/fahad19) and
a completely new logo was designed by [Milan Vuckovic](https://twitter.com/milan_vuckovic).

We're currently working on improving other:

 - [Design issues](https://github.com/tus/tus.io/issues)

### Demo

Since the first publication of the tus protocol, our website featured a
[demo page](/demo.html) allowing users to see a tus in action, interactively.
In the past this service had some issues with reliability and browser-support.
Because of this past, we updated the entire stack used by the demo.

It now uses our newly created [tus-js-client](https://github.com/tus/tus-js-client)
and we've updated the demo page to feature all the browsers & platforms the
client has been tested to work on.
The demo page uploads files to a [tusd 1.0](https://github.com/tus/tusd)
server written in Go, that we deploy via the newly created
infra-tusd repository.

### Infra

Still a work in progress, infra-tusd
uses a powerful combination of [Ansible](http://www.ansible.com/) and
[Terraform](https://terraform.io/) to
spin up fully functioning tus servers with a single command. Every bit
(except for the AWS & SSH keys) has been added to the repository
and is publicly available.

Please reach out if you'd like to help us:

- Add local Vagrant support for testing the Ansible scripts

### Adoption

Finally, a few big companies have taken an interest
in tus. tus will always remain open source and community owned, but
we're excited that we're on the path to realizing our mission to
change how the world does file uploading.

We'll have more announcements on this soon!

If you (plan to) use tus in production, please comment on this issue and get your
company listed on the tus.io website:

- [Companies that (plan to) use tus](https://github.com/tus/tus.io/issues/28)
