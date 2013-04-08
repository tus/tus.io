build:
	echo "---\nlayout: default\ntitle: tus resumable upload protocol\ncomments: true\n---\n" > protocols/resumable-upload.md
	curl -sk https://raw.github.com/tus/tus-resumable-upload-protocol/master/README.md >> protocols/resumable-upload.md
	#cd assets/json && ./community.sh