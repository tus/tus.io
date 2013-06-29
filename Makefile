protocol_dir="lib/tus-resumable-upload-protocol"
protocol_html="protocol.html"
protocol_target="protocols/resumable-upload.html"

all: protocol community site

# generate protocol.html file, assumes git submodule is current
protocol:
	git submodule update --init
	make -C $(protocol_dir) $(protocol_html)
	echo "---\nlayout: protocol\ntitle: tus resumable upload protocol\ncomments: true\n---\n" > "$(protocol_target)"
	cat "$(protocol_dir)/$(protocol_html)" >> "$(protocol_target)"

# generate contributor lists
community:
	cd assets/json && ./community.sh

site: 
	rake site:publish

.PHONY: all protocol community site
