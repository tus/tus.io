#!/usr/bin/env bash

# Set magic variables for current file, directory, os, etc.
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
source "${__dir}/_b3bp.sh"

onthegithubs_dir="node_modules/on-the-githubs"

echo "--> Building community.."
find _includes/community.html -mtime +10 -exec rm -rf {} \; || true
[ -f _includes/community.html ] || (echo "<p>replaced-by-in-the-githubs</p>" > _includes/community.html \
  && ${onthegithubs_dir}/bin/in-the-githubs \
   --user tus \
   --repo tus.io,tusd,tus-jquery-client,TUSKit,tus-android-client,tus-resumable-upload-protocol \
   --format html \
   --concurrency 1 \
   --input _includes/community.html \
   --tag '<p>replaced-by-in-the-githubs</p>' \
   --output _includes/community.html \
   --debug)
