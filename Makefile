protocol_dir="lib/tus-resumable-upload-protocol"
protocol_html="protocol.html"
protocol_target="protocols/resumable-upload.html"

onthegithubs_dir="node_modules/on-the-githubs"

ghpages_repo="tus/tus.io"
ghpages_branch="gh-pages"

.PHONY: all
all: install build deploy

.PHONY: build-site
build-site:
	@bundle exec jekyll build

.PHONY: build-protocol
build-protocol:
	@git submodule update --init
	@cd $(protocol_dir) && git checkout master && git pull && npm install
	@make -C $(protocol_dir) $(protocol_html)
	@echo "---\nlayout: protocol\ntitle: tus resumable upload protocol\ncomments: true\n---\n" > "$(protocol_target)"
	@cat "$(protocol_dir)/$(protocol_html)" >> "$(protocol_target)"

.PHONY: build-community
build-community:
	@$(onthegithubs_dir)/bin/in-the-githubs \
	 --user tus \
	 --repo tus.io,tusd,tus-jquery-client,TUSKit,tus-android-client,tus-resumable-upload-protocol \
	 --format html \
	 --concurrency 1 \
	 --input _site/about.html \
	 --tag '<p>replaced-by-in-the-githubs</p>' \
	 --output _site/about.html \
	 --debug

.PHONY: preview
preview: install build
	@bundle exec jekyll serve --skip-initial-build

.PHONY: install
install:
	@bundle install
	@npm install

.PHONY: build
build: build-protocol build-site build-community
	@echo "Done :)"

.PHONY: deploy
deploy:
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

	@echo 'This repo is just a deploy target. Do not edit. You changes will be lost.' > /tmp/deploy-$(ghpages_repo)/README.md

	@cd /tmp/deploy-$(ghpages_repo) \
	 && git init && git checkout -B $(ghpages_branch) && git add --all . \
	 && git commit -nm "Update $(ghpages_repo) _site by $${USER}" \
	 && git remote add origin git@github.com:$(ghpages_repo).git \
	 && git push origin $(ghpages_branch):refs/heads/$(ghpages_branch) --force

	@rm -rf /tmp/deploy-$(ghpages_repo)
