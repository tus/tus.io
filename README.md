# tus.io

The tus.io website.

To work on the site locally, type:

```bash
cd ~code
git clone git@github.com:tus/tus.io.git
make preview
```

This will run a chain of different [`Makefile`](/Makefile) targets that will 
install prerequisites, download the latest version of our protocol, community 
info, and then build all e.g. markdown & less files to html & css into `_site`.

It will then fire up a Jekyll server and will offer you to click on 
http://127.0.0.1:4000 where the tus.io site will be running.

When you make changes, Jekyll automatically rebuilds, and you can refresh
your browser after a few seconds.

## Deployment

The tus.io site is developed from the `master` branch in this repository.
It is built and then the results are forcefully pushed to the `gh-pages` branch of the `tus.io` repo on GitHub.

The protocol is pulled in as a submodule from the `tus-resumable-upload-protocol` repo.

Everyone with write access to this repo can type:

```bash
make deploy
```

.. to compile the Jekyll source into `./_site`, copy that into a random `TMPDIR`,
have a Git repo initialized there, and have the thing force-pushed to the `gh-pages` branch of the `tus.io` repo.

Up to ten minutes later (but mostly after a few seconds), GitHub will have updated the [tus.io](http://tus.io) site accordingly.

## How to add your company/project logo to the site

### Easy

Just edit [logos.yml](https://github.com/tus/tus.io/edit/master/_data/logos.yml) directly and
save - this will send us a PR. We will download and include the externally linked logo ourselves
later on.

### Harder

If you want to save us some work, you could:

* Create a fork of this repository
* Clone it locally
* Create a new branch
* Add your logo image to `assets/img/logos/` directory. Logo should be at least 150px of height and max 800px wide. Name your logo with your company/project name.
* Update `_data/logos.yml` file and add an entry for your company with the name, url and src (should point to the logo you just added).
* Commit your changes to your fork and create a pull request into the main repository.
