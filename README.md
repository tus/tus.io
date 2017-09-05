[![Build Status](https://travis-ci.org/tus/tus.io.svg?branch=master)](https://travis-ci.org/tus/tus.io)
[![Join the community](https://slackin-xgybtegrsh.now.sh/badge.svg)](https://slackin-xgybtegrsh.now.sh)
<!-- ^-- could also be http://slack.tus.io but we can't have https and cloudflare enforces that now it seems -->

# tus.io

The tus.io website.

To work on the site locally, type:

```bash
type wget || sudo apt-get install wget || brew install wget
cd ~/code
git clone git@github.com:tus/tus.io.git
npm install
npm run inject:protocol
npm run inject:community
npm start
```

Uses [Lanyon](https://github.com/kvz/lanyon) under the hood

## Deployment

Done via Travis on pushes to master.

## How to add your company/project logo to the site

Just edit [logos.yml](https://github.com/tus/tus.io/edit/master/_data/logos.yml) directly and
save - this will send us a PR. We will download and include the externally linked logo ourselves
later on via `make download-logos && make optimize-logos`.
