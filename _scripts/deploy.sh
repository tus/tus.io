# Set magic variables for current file, directory, os, etc.
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
source "${__dir}/_b3bp.sh"


onthegithubs_dir="node_modules/on-the-githubs"
ghpages_repo="tus/tus.io"
ghpages_branch="gh-pages"

mkdir -p /tmp/deploy-${ghpages_repo}

# Custom steps
rsync \
  --archive \
  --delete \
  --exclude=.git* \
  --exclude=node_modules \
  --exclude=lib \
  --itemize-changes \
  --checksum \
  --no-times \
  --no-group \
  --no-motd \
  --no-owner \
./_site/ /tmp/deploy-${ghpages_repo}

info 'This branch is just a deploy target. Do not edit. You changes will be lost.' > /tmp/deploy-${ghpages_repo}/README.md

cd /tmp/deploy-${ghpages_repo} \
  && git init && git checkout -B ${ghpages_branch} && git add --all . \
  && git commit -nm "Update ${ghpages_repo} _site by ${USER}" \
  && (git remote add origin gitgithub.com:${ghpages_repo}.git || true)  \
  && git push origin ${ghpages_branch}:refs/heads/${ghpages_branch} --force

rm -rf /tmp/deploy-${ghpages_repo}
