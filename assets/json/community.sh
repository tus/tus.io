#!/usr/bin/env bash
set -exu
curl -ks https://api.github.com/orgs/tus/members > members.json

combined=""
for type in "collaborators" "subscribers" "stargazers"; do
  for repo in "tus.io" "tusd" "tus-jquery-client" "tus-ios-client" "tus-android-client" "tus-resumable-upload-protocol"; do
    current="$(curl -ks https://api.github.com/repos/tus/${repo}/${type} |tail -n +2 |sed '$d')"
    if [ $? -eq 0 ] && [ -n "${current}" ]; then
      [ -n "${combined}" ] && combined="${combined}, "
      combined="${combined}${current}"
    fi
  done

  [ -n "${combined}" ] && echo "[ ${combined} ]" > ${type}.json && combined=""
done

