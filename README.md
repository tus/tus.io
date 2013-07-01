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

Everyone with PUSH access to the tus.io repository can type

```bash
gem install jekyll jekyll-less therubyracer redcarpet
make # builds protocols, community then runs rake site:publish
```

To compile the Jekyll source into `./_site`, copy that into a random `TMPDIR`,
have a Git repo initialized there, and have the thing force-pushed to the
[http://jekyllrb.com/docs/github-pages/] branch of the repository.

Up to ten minutes later (but mostly after a few seconds), GitHub will have updated the tus.io site accordingly. It can be checked directly (so long as there's no CNAME pointing to this) at [http://tus.github.io]().
