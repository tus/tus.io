---
layout: post
title: Project Status
comments: true
date: 2015-09-19
author: kvz
---

Here's a quick update on the status of the project.

## 1.0 

We're close to finalizing 1.0 in [this pull request](https://github.com/tus/tus-resumable-upload-protocol/pull/57). 

Our project lead [Marius Kleidl](https://github.com/Acconut) has been taking care
of integrating a large batch of improvements
that were made by [Naren Venkataraman](https://github.com/vayam) and this team.

Things still left to do:

- Write a Developers Guide
- Add a page that lists companies who (plan to) deploy tus
- Gather a *final round of feedback*

We're waiting for a *final round of feedback* to make sure every last bit 
is taken care of before cementing everything into our first stable release.

## Exposure & Swag

To make sure every developer and interested party had their change to chime in, 
we're trying to get some extra exposure for the project. We'll be covered
in [The Changelog](https://changelog.com/) on September 18 and Transloadit
is sponsoring conferences to hand out swag and raise tus awareness.

Swag is also for sale at the new [shop.tus.io](http://shop.tus.io/collections/all). The shop
currently only features two, pretty expensive, items and we're working with [Printful](https://www.theprintful.com/) to make these
more accessible. Know that any profit flows back to the project. Our books are open to 
anyone who wants to verify.

## Implementations

While 1.0 could potentially still be changed, we don't expect major changes
so our official implementations are already 1.0 ready.

All official projects have been updated to the 1.0 branch already
for which a big thank you goes out to [Mark R. Masterson](https://github.com/MMasterson)
and Marius for upgrading many of our implementations. 

Marius also added 1.0 Android and 
standalone Java implementations as official tus projects.

## Demo

The demo section is currently receiving some polishing by 
[Fahad Ibnay Heylaal](https://github.com/Acconut).

It uses our 1.0 [tus-js-client](https://github.com/tus/tus-js-client) and we've
updated the demo page to feature all the browsers & platforms the client has been 
tested to work on.

The demo page uploads files to a
to a 1.0 [tusd](https://github.com/tus/tusd) server written in Go, that we
deploy via the newly created [infra-tusd](https://github.com/tus/infra-tusd) repository.

## Infra

Still a work in progress, [infra-tusd](https://github.com/tus/infra-tusd) 
uses a powerful combination of [Ansible](http://www.ansible.com/) and 
[Terraform](https://terraform.io/) to 
spin up fully functioning tus servers with a single command. Every bit 
except for the AWS & server keys are open sourced, so please reach out if
you'd like to help us with our todo:

- Add local Vagrant support for testing the Ansible scripts

## Adoption

Finally, we're talking to a few of the internet's largest companies
that have taken an interest in tus and are looking to roll out support.

More announcements on this soon!
