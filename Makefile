build:
	echo "---\nlayout: default\ntitle: Protocol\n---\n" > protocol.md
	curl -sk https://raw.github.com/tus/tus-resumable-upload-protocol/master/README.md >> protocol.md


