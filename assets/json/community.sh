#!/usr/bin/env bash
current="$(curl -ks https://api.github.com/orgs/tus/members |tail -n +2 |sed '$d')"
[ $? -eq 0 ] && [ -n "${current}" ] && combined="${current}"
for type in "collaborators" "subscribers" "stargazers"; do
  for repo in "tus.io" "tusd" "tus-jquery-client" "tus-ios-client" "tus-android-client" "tus-resumable-upload-protocol"; do
    current="$(curl -ks https://api.github.com/repos/tus/${repo}/${type} |tail -n +2 |sed '$d')"
    [ $? -eq 0 ] && [ -n "${current}" ] && combined="${combined}, ${current}"
  done
done

[ -n "${combined}" ] && echo "[ ${combined} ]" > community.json
