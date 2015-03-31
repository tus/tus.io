onthegithubs_dir="node_modules/on-the-githubs"
ghpages_repo="tus/tus.io"
ghpages_branch="gh-pages"

.PHONY: all
all: install build deploy

.PHONY: install
install:
	@echo "--> Installing dependencies.."
	@npm install
	@bower install
	@jekyll --version || sudo gem install jekyll -v '2.5.2'

.PHONY: build-assets
build-assets:
	@echo "--> Building assets.."
	@npm run build

.PHONY: build-site
build-site:
	@echo "--> Building site.."
	@jekyll build

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
build: build-protocol build-assets build-site build-community
	@echo "--> Building all.."
	@echo "Done :)"

.PHONY: preview-quick
preview-quick: build-assets build-site
	@echo "--> Running preview-quick.."
	jekyll serve --watch --unpublished --skip-initial-build

.PHONY: pull
pull: 
	@echo "--> Running pull.."
	@git pull

.PHONY: preview
preview: install build
	@echo "--> Running preview.."
	jekyll serve --watch --unpublished --skip-initial-build

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

	@echo 'This repo is just a deploy target. Do not edit. You changes will be lost.' > /tmp/deploy-$(ghpages_repo)/README.md

	@cd /tmp/deploy-$(ghpages_repo) \
	  && git init && git checkout -B $(ghpages_branch) && git add --all . \
	  && git commit -nm "Update $(ghpages_repo) _site by $${USER}" \
	  && (git remote add origin git@github.com:$(ghpages_repo).git || true)  \
	  && git push origin $(ghpages_branch):refs/heads/$(ghpages_branch) --force

	@rm -rf /tmp/deploy-$(ghpages_repo)
