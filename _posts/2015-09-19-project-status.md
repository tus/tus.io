---
layout: post
title: Project Status
comments: true
date: 2015-09-19
author: kvz
---

Here's a quick update on the status of the project.

### 1.0 

We're close to finalizing 1.0. Our project 
lead [Marius Kleidl](https://github.com/Acconut) has been taking care
of integrating a large batch of improvements
that were made by [Naren Venkataraman](https://github.com/vayam) and this team.

Things still left to do:

- [Write a Developers Guide](https://github.com/tus/tus-resumable-upload-protocol/issues/59)
- Gather a *final round of feedback* on [the 1.0 proposal](https://github.com/tus/tus-resumable-upload-protocol/pull/57)

We're waiting for a *final round of feedback* to make sure every last bit 
is taken care of before cementing everything into our first stable release.

### Exposure & Swag

To make sure every developer and interested party had their change to chime in, 
we're trying to get some extra exposure for the project. We'll be covered
in [The Changelog](https://changelog.com/) on September 18 and Transloadit
is sponsoring conferences to hand out swag and raise tus awareness.

Swag is also for sale at the new [shop.tus.io](http://shop.tus.io/collections/all). The shop
currently only features two, pretty expensive, items and we're working with [Printful](https://www.theprintful.com/) to improve on that. 
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

### Demo

The demo section is currently receiving polishing by 
[Fahad Ibnay Heylaal](https://github.com/Acconut).

It uses our 1.0 [tus-js-client](https://github.com/tus/tus-js-client) and we've
updated the demo page to feature all the browsers & platforms the client has been 
tested to work on.

The demo page uploads files to a
to a 1.0 [tusd](https://github.com/tus/tusd) server written in Go, that we
deploy via the newly created [infra-tusd](https://github.com/tus/infra-tusd) repository.

### Infra

Still a work in progress, [infra-tusd](https://github.com/tus/infra-tusd) 
uses a powerful combination of [Ansible](http://www.ansible.com/) and 
[Terraform](https://terraform.io/) to 
spin up fully functioning tus servers with a single command. Every bit 
(except for the AWS & SSH keys has) been added to the repository 
and is publicly available.

Please each out if you'd like to help us:

- [Add local Vagrant support for testing the Ansible scripts](https://github.com/tus/infra-tusd/issues/1)

### Adoption

Finally, a few big companies have taken an interest 
in tus. tus will always remain open source and community owned, but 
we're excited that we're on the path to realizing our mission to
change how the world does file uploading.

We'll have more announcements on this soon!

If you (plan to) use tus in production, please add your to this issue and get your
company listed on the tus.io website:

- [Companies that (plan to) use tus](https://github.com/tus/tus.io/issues/28)
