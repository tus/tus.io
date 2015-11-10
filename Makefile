SHELL     := /usr/bin/env bash
logos_cfg := _data/logos.yml
logos_dir := assets/img/logos
press_cfg := _data/press.yml
press_dir := assets/img/press

onthegithubs_dir="node_modules/on-the-githubs"
ghpages_repo="tus/tus.io"
ghpages_branch="gh-pages"

.PHONY: all
all: install build deploy


.PHONY: save-press-stats
save-press-stats:
	$(MAKE) save-logos-stats logos_dir=$(press_dir)

.PHONY: download-press
download-press:
	$(MAKE) download-logos logos_dir=$(press_dir)

.PHONY: optimize-press
optimize-press:
	$(MAKE) optimize-logos logos_dir=$(press_dir)


.PHONY: save-logos-stats
save-logos-stats:
	@which gsort    > /dev/null 2>&1 || (echo "Please brew install coreutils"   && false)
	@which identify > /dev/null 2>&1 || (echo "Please brew install imagemagick" && false)
	identify -format " - %f %b %G\n" $(logos_dir)/*.{svg,png} |gsort -hk3 > $(logos_dir)/README.md
	du -hs $(logos_dir) >> $(logos_dir)/README.md

.PHONY: download-logos
download-logos:
	@DEBUG=*:* LOGOS_DIR=$(logos_dir) LOGOS_CFG=$(logos_cfg) coffee ./_scripts/download-external-logos.coffee
	$(MAKE) save-logos-stats logos_dir=$(logos_dir)

.PHONY: optimize-logos
optimize-logos:
	$(MAKE) download-logos logos_dir=$(logos_dir)
	@which mogrify  > /dev/null 2>&1 || (echo "Please brew install imagemagick" && false)
	@which pngquant > /dev/null 2>&1 || (echo "Please brew install pngquant"    && false)

	mogrify -format png -resize 800x800\> $(logos_dir)/*.png $(logos_dir)/*.jpg $(logos_dir)/*.jpeg
	pngquant \
	  --force \
	  --skip-if-larger \
		--quality 90-100 \
		--ext '.png' \
		--speed 1 \
		$(logos_dir)/*.png
	$(MAKE) save-logos-stats logos_dir=$(logos_dir)

.PHONY: install
install:
	@echo "--> Installing dependencies.."
	@npm install
	@bower install
	@which bundle 2>/dev/null || sudo gem install bundler -v 1.10 -n /usr/local/bin
	@bundle install --path vendor/bundle

.PHONY: build-site
build-site:
	@echo "--> Building site.."
	@bundle exec jekyll build

.PHONY: build-protocol
build-protocol:
	@echo "--> Fetching latest protocol.."
	@find _includes/tus.md -mtime +10 -exec rm -rf {} \; || true
	@[ -f _includes/tus.md ] || (wget \
	  https://raw.githubusercontent.com/tus/tus-resumable-upload-protocol/master/protocol.md \
		--quiet \
		--output-document=_includes/tus.md \
		&& echo "$$(tail -n +3 ./_includes/tus.md)" > ./_includes/tus.md)
	@# Removes first two lines to allow our own h2 header

.PHONY: build-community
build-community:
	@echo "--> Building community.."
	@find _includes/community.html -mtime +10 -exec rm -rf {} \; || true
	@[ -f _includes/community.html ] || (echo "<p>replaced-by-in-the-githubs</p>" > _includes/community.html \
		&& $(onthegithubs_dir)/bin/in-the-githubs \
		 --user tus \
		 --repo tus.io,tusd,tus-jquery-client,TUSKit,tus-android-client,tus-resumable-upload-protocol \
		 --format html \
		 --concurrency 1 \
		 --input _includes/community.html \
		 --tag '<p>replaced-by-in-the-githubs</p>' \
		 --output _includes/community.html \
		 --debug)

.PHONY: build
build: build-protocol build-site build-community
	@echo "--> Building all.."
	@echo "Done :)"

.PHONY: preview-quick
preview-quick: build-site
	@echo "--> Running preview-quick.."
	bundle exec jekyll serve --watch --unpublished --skip-initial-build

.PHONY: pull
pull:
	@echo "--> Running pull.."
	@git pull

.PHONY: preview
preview: install build
	@echo "--> Running preview.."
	bundle exec jekyll serve --watch --unpublished --skip-initial-build

.PHONY: deploy
deploy: pull build
	@echo "--> Deploying to GitHub pages.."
	@mkdir -p /tmp/deploy-$(ghpages_repo)

	# Custom steps
	@rsync \
    --archive \
    --delete \
    --exclude=.git* \
    --exclude=node_modules \
    --exclude=lib \
    --itemize-changes \
    --checksum \
    --no-times \
    --no-group \
    --no-motd \
    --no-owner \
	./_site/ /tmp/deploy-$(ghpages_repo)

	@echo 'This branch is just a deploy target. Do not edit. You changes will be lost.' > /tmp/deploy-$(ghpages_repo)/README.md

	@cd /tmp/deploy-$(ghpages_repo) \
	  && git init && git checkout -B $(ghpages_branch) && git add --all . \
	  && git commit -nm "Update $(ghpages_repo) _site by $${USER}" \
	  && (git remote add origin git@github.com:$(ghpages_repo).git || true)  \
	  && git push origin $(ghpages_branch):refs/heads/$(ghpages_branch) --force

	@rm -rf /tmp/deploy-$(ghpages_repo)
