build:
	echo "---\nlayout: default\ntitle: Protocol\ncomments: true\n---\n" > protocol.md
	curl -sk https://raw.github.com/tus/tus-resumable-upload-protocol/master/README.md >> protocol.md
	echo "\nCheckout Github for [the latest version of this this document](https://github.com/tus/tus-resumable-upload-protocol/blob/master/README.md)" >> protocol.md

