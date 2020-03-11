[![Build Status](https://travis-ci.org/tus/tus.io.svg?branch=master)](https://travis-ci.org/tus/tus.io)
[![Join the community](/assets/img/community-forum-35a78b.svg)](https://community.transloadit.com/c/tus)

# tus.io

The tus.io website.

## Work on the website locally

This uses [Lanyon](https://github.com/kvz/lanyon) under the hood.

Docker and Node 8+ are a requirement for local website development.

To work on the site locally, type:

```bash
type wget || sudo apt-get install wget || brew install wget
cd ~/code
git clone git@github.com:tus/tus.io.git
yarn
npm run inject:protocol
npm run inject:community
npm start
```

## Deployment

Done via Travis on pushes to master.

## How to add your company/project logo to the site

Just edit [logos.yml](https://github.com/tus/tus.io/edit/master/_data/logos.yml) directly and
save - this will send us a PR. We will download and include the externally linked logo ourselves
later on via `make download-logos && make optimize-logos`.
