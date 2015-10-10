# tus.io

The tus.io website.

## Setup

Install the required ruby gems:

```bash
$ gem install jekyll therubyracer redcarpet
```

Build assets:

```bash
$ npm install
$ bower install
$ npm run build
```

You would also be required to run this command
to fetch some info from original [Tus protocol](https://github.com/tus/tus-resumable-upload-protocol) repository:

```bash
$ make build-protocol
```

After this you can run the local development server like this:

```bash
$ jekyll --auto --server
```

On more recent Jekyll installs it's

```bash
$ jekyll serve --watch
```

Next, point your browser to http://127.0.0.1:4000/

**Note** Some things like the protocol, and contributor/stargazer lists are replaced with up to date versions on deploy.
If you want to have up to date versions of these locally too, run:

```bash
make protocol
make community
```

Or, to build everything:

```bash
make build
```

For linting CSS files:

```bash
npm run css:lint
```

## Deployment

The tus.io site is developed from the `master` branch in this repository.
It is built and then the results are forcefully pushed to the `gh-pages` branch of the `tus.io` repo on GitHub.

The protocol is pulled in as a submodule from the `tus-resumable-upload-protocol` repo.

Everyone with write access to this repo can type:

```bash
make deploy
```

To compile the Jekyll source into `./_site`, copy that into a random `TMPDIR`,
have a Git repo initialized there, and have the thing force-pushed to the `gh-pages` branch of the `tus.io` repo.

Up to ten minutes later (but mostly after a few seconds), GitHub will have updated the [tus.io](http://tus.io) site accordingly.

## How to add your company/project logo to the site

* Create a fork of this repository
* Clone it locally
* Create a new branch
* Add your logo image to /img/logos/ directory. Logo should be at least 150px of height. Name your logo with your company/project name.
* Update /_data/logos.yml file and add an entry for your company with the name, url and src (should point to the logo you just added).
* Commit your changes to your fork and create a pull request into the main repository.
