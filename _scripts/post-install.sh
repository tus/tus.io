#!/usr/bin/env bash

# Set magic variables for current file, directory, os, etc.
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
source "${__dir}/_b3bp.sh"

echo "--> Installing dependencies.."
bower install
which bundle 2>/dev/null || sudo gem install bundler -v 1.10 -n /usr/local/bin
bundle config build.libv8 --with-system-v8 || true
bundle install --path vendor/bundle || bundle update vendor/bundle
rsync -a --progress --delete ./node_modules/{tus-js-client,on-the-githubs} ./_assets/node_modules/
