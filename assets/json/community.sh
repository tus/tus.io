#!/usr/bin/env bash
set -exu

if find members.json -mmin -60 |grep members.json; then
  # To protect against rate-limiter & high build times
  echo "Your github community json files where built in the last 60 minutes. Not rebuilding. "
  exit 0
fi

curl -ks https://api.github.com/orgs/tus/members > members.json

combined=""
for type in "collaborators" "subscribers" "stargazers" "issues"; do

  for repo in "tus.io" "tusd" "tus-jquery-client" "tus-ios-client" "tus-android-client" "tus-resumable-upload-protocol"; do
    current="$(curl -ks https://api.github.com/repos/tus/${repo}/${type} |tail -n +2 |sed '$d')"
    if [ $? -eq 0 ] && [ -n "${current}" ]; then
      [ -n "${combined}" ] && combined="${combined}, "
      combined="${combined}${current}"
    fi
  done

  [ -n "${combined}" ] && echo "[ ${combined} ]" > ${type}.json && combined=""
done

