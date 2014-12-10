protocol_dir="lib/tus-resumable-upload-protocol"
protocol_html="protocol.html"
protocol_target="protocols/resumable-upload.html"

onthegithubs_dir="node_modules/on-the-githubs"

ghpages_repo="tus/tus.github.io"
ghpages_branch="master"


all: install build deploy

_site:
	bundle exec jekyll build

_protocol:
	git submodule update --init
	cd $(protocol_dir) && npm install
	make -C $(protocol_dir) $(protocol_html)
	echo "---\nlayout: protocol\ntitle: tus resumable upload protocol\ncomments: true\n---\n" > "$(protocol_target)"
	cat "$(protocol_dir)/$(protocol_html)" >> "$(protocol_target)"

_community:
	$(onthegithubs_dir)/bin/in-the-githubs \
	 --user tus \
	 --repo tus.io,tusd,tus-jquery-client,TUSKit,tus-android-client,tus-resumable-upload-protocol \
	 --format html \
	 --concurrency 1 \
	 --input _site/about.html \
	 --tag '<p>replaced-by-in-the-githubs</p>' \
	 --output _site/about.html \
	 --debug

preview: install build
	bundle exec jekyll serve --skip-initial-build

install:
	bundle install
	npm install

build: _protocol _site _community
	echo "Done :)"

deploy: build
	rm -rf /tmp/deploy-ghpages
	mkdir -p /tmp/deploy-ghpages

	# Custom steps
	cp -Raf ./_site/* /tmp/deploy-ghpages/
	rm -rf /tmp/deploy-ghpages/{lib,node_modules}

	echo 'This repo is just a deploy target. Do not edit. You changes will be lost.' > /tmp/deploy-ghpages/README.md

	cd /tmp/deploy-ghpages \
	 && git init && git add . \
	 && git commit -nm "Update $(ghpages_repo) _site by $${USER}" \
	 && git remote add origin git@github.com:$(ghpages_repo).git \
	 && git push origin master:refs/heads/$(ghpages_branch) --force

	rm -rf /tmp/deploy-ghpages


.PHONY: \
	_community \
	install \
	build \
	preview \
	_protocol \
	deploy \
	_site \
