# tus.io

The tus.io website.

## Setup

Install the required ruby gems:

```
gem install jekyll jekyll-less therubyracer redcarpet
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
