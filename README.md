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

**Note** Some things like the protocol, and contributor/stargazer lists are replaced with
up to date versions on deploy.
If you want to have up to date versions of these locally too, run:

```bash
make build
```

## Deployment

The tus.io site is developed from this repository.
It is built and then pushed into the `master` branch of the `tus.github.io` repo. 
This is done so we can host it on `tus.io` without subdirs 
(would not be possible with a project page in `gh-pages` branch).

The protocol is pulled in as a submodule from  the `tus-resumable-upload-protocol` repo.

Everyone with PUSH access to the (`tus.io` and) `tus.github.io` repo can type:

```bash
gem install jekyll jekyll-less therubyracer redcarpet
make # builds protocols, community then runs rake site:publish
```

To compile the Jekyll source into `./_site`, copy that into a random `TMPDIR`,
have a Git repo initialized there, and have the thing force-pushed to master branch of the `tus.github.io` repo.

Up to ten minutes later (but mostly after a few seconds), 
GitHub will have updated the [tus.io]() site accordingly. 
