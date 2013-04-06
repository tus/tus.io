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

## Deployment

This repository is configured to notify our CI server so that every push to the
master branch will be deployed automatically.
