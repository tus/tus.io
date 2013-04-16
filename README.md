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

Next, point your browser to http://127.0.0.1:4000/

**Note** Some things like the protocol, and contributor/stargazer lists are replaced with
up to date versions on deploy.  
If you want to have up to date versions of these locally too, run:

```bash
make build
```

## Deployment

This repository is configured to notify our CI server so that every push to the
master branch will be deployed automatically.
