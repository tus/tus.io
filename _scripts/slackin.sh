#!/usr/bin/env bash
set -o errexit
set -o errtrace
set -o nounset
set -o pipefail
# set -o xtrace

now -v || npm install -g now

now \
  -e SLACK_CHANNELS="tus" \
  -e SLACK_API_TOKEN="${SLACK_API_TOKEN}" \
  -e SLACK_SUBDOMAIN="${SLACK_SUBDOMAIN}" rauchg/slackin \
  --npm
