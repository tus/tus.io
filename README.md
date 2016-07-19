# tus.io

The tus.io website.

To work on the site locally, type:

```bash
cd ~/code
git clone git@github.com:tus/tus.io.git
npm run start
```

This will run a chain of different scripts that will 
install prerequisites, download the latest version of our protocol, community 
info, and then build all e.g. markdown & less files to html & css into `_site`.

It will then fire up a static webserver server and a browser pointing it to
http://127.0.0.1:3000 where the tus.io site will be running, and automatically refreshed
as you make changes.

## Deployment

tus.io is deployed onto GitHub pages, but since we have many custom build requirements that
GitHub can't support for us (like building community pages and the protocol), 
we curate content in `master`, build ourselves locally, then 
directly push artifacts to to the `gh-pages` branch of the `tus.io` repo on GitHub.

```bash
npm run deploy
```

This compiles the Jekyll source into `./_site`, copies that into a random `TMPDIR`,
initializes a Git repo there, and force-pushes to the `gh-pages` branch of the `tus.io` repo.

Up to ten minutes later (but mostly after a few seconds), GitHub will have updated the [tus.io](http://tus.io) site accordingly.

## How to add your company/project logo to the site

Just edit [logos.yml](https://github.com/tus/tus.io/edit/master/_data/logos.yml) directly and
save - this will send us a PR. We will download and include the externally linked logo ourselves
later on via `make download-logos && make optimize-logos`.
