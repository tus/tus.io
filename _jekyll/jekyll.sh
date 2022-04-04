#!/usr/bin/env bash
# shellcheck disable=SC1090
# Docker is slow on macOS for many small files, so we have ditched it in favor
# of setting up ruby & jekyll on your local system with this script. We then pass
# the Jekyll path to Lanyon so it used that and not the Docker container it comes with.
#
# You can then run like:
#
#   env LANYON_JEKYLL=${HOME}/code/content/_jekyll/jekyll.sh make start
#
#
# Copyright (c) 2020, Transloadit-II GmbH
# Authors:
#  - Kevin van Zonneveld <kevin@transloadit.com>

set -o pipefail
set -o errexit
set -o nounset
# set -o xtrace

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
rubyVersion="3.1.0"        # https://www.ruby-lang.org/en/downloads/
rubyInstallVersion="0.8.3" # https://github.com/postmodern/ruby-install/tags
chrubyVersion="0.3.9"      # https://github.com/postmodern/chruby/tags

if [ "${USER}" = "darkangelbge" ]; then
  rubyVersion="2.6.6"
fi

pushd "${__dir}" > /dev/null
  if [ ! -d "${HOME}/.rubies/ruby-${rubyVersion}" ]; then
    echo "--> ${HOME}/.rubies/ruby-${rubyVersion} does not exist, installing Ruby v${rubyVersion} now .. "
    if ! "${__dir}/bin/ruby-install" --version |grep -E " ${rubyInstallVersion}\$" >/dev/null 2>&1; then
      echo "--> ruby-install ${rubyVersion} is not installed, installing ruby-install ${rubyVersion} now .. "
      rm -f "${__dir}/bin/ruby-install"
      mkdir -p ./tmp
      pushd ./tmp > /dev/null
        curl -fsSLo "ruby-install-v${rubyInstallVersion}.tar.gz" "https://github.com/postmodern/ruby-install/archive/v${rubyInstallVersion}.tar.gz"
        tar -xzvf "ruby-install-v${rubyInstallVersion}.tar.gz"
        pushd "ruby-install-${rubyInstallVersion}" > /dev/null
          mkdir -p "${__dir}/bin/" "${__dir}/share/chruby/"
          rsync -ai bin/ruby-install "${__dir}/bin/ruby-install"
          rsync -ai share/ruby-install/ "${__dir}/share/ruby-install"
        popd > /dev/null
      popd > /dev/null
    fi
    if ! "${__dir}/bin/ruby-install" --version |grep -E "${rubyInstallVersion}\$" >/dev/null 2>&1; then
      echo "--> installation of ruby-install ${rubyInstallVersion} failed"
      exit 1
    fi
    mkdir -p ./src
    "${__dir}/bin/ruby-install" -s "${__dir}/src" ruby "${rubyVersion}"

    rm -f Gemfile.lock Gemfile.hash
  fi

  if ! "${__dir}/bin/chruby-exec" --version |grep -E " ${chrubyVersion}\$" >/dev/null 2>&1; then
    echo "--> chruby ${chrubyVersion} is not installed, installing chruby ${chrubyVersion} now .. "
    mkdir -p ./tmp
    pushd ./tmp > /dev/null
      curl -fsSLo "chruby-v${chrubyVersion}.tar.gz" "https://github.com/postmodern/chruby/archive/v${chrubyVersion}.tar.gz"
      tar -xzvf "chruby-v${chrubyVersion}.tar.gz"
      pushd "chruby-${chrubyVersion}" > /dev/null
        mkdir -p "${__dir}/bin/" "${__dir}/share/chruby/"
        cp -afv bin/chruby-exec "${__dir}/bin/chruby-exec"
        cp -afv share/chruby/auto.sh "${__dir}/share/chruby/auto.sh"
        cp -afv share/chruby/chruby.sh "${__dir}/share/chruby/chruby.sh"
      popd > /dev/null
    popd > /dev/null
    if ! "${__dir}/bin/chruby-exec" --version |grep -E " ${chrubyVersion}\$" >/dev/null 2>&1; then
      echo "--> installation of chruby ${rubyInstallVersion} failed"
      exit 1
    fi

    rm -f Gemfile.lock Gemfile.hash
  fi

  # Can't use no unset with chruby :'( https://github.com/postmodern/chruby/issues/417
  set +u
  source "${__dir}/share/chruby/chruby.sh"
  source "${__dir}/share/chruby/auto.sh"

  if ! ruby -v |grep -E "^ruby ${rubyVersion}" >/dev/null 2>&1; then
    echo "--> chruby to ${rubyVersion}"
    chruby "${rubyVersion}"
    echo "${rubyVersion}" > "${__dir}/.ruby-version"
  fi

  if [ ! -f Gemfile.lock ]; then
    echo "--> installing gems .. "
    if [[ "${OSTYPE}" == "darwin"* ]]; then
      # we'll see which one of these we'll need on Alex' machine :)
      true
      # brew install libxml2
      # gem install nokogiri -- --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/usr/include/libxml2   --use-system-libraries
      # bundle config build.nokogiri --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/usr/include/libxml2 --use-system-libraries
      # brew upgrade libxml2
      # export PKG_CONFIG_PATH="/usr/local/opt/libxml2/lib/pkgconfig"
      # gem install nokogiri -v '1.6.8'
      # https://gist.github.com/sobstel/f6a490d854a2e5a214c3f2cd9c366032
    elif [[ -e "$(which dpkg)" ]]; then
      # gem pristine ffi
      if ! dpkg -s libxslt1-dev > /dev/null || ! dpkg -s libxml2-dev > /dev/null; then
        echo ""
        echo "==> On your behalf, I would like to run: 'sudo DEBIAN_FRONTEND=noninteractive apt-get -y install libxslt1-dev libxml2-dev' in ${PWD}"
        echo ""
        sudo DEBIAN_FRONTEND=noninteractive apt-get -y install libxslt1-dev libxml2-dev
      fi
    else
      echo ""
      echo "!!! Unable to check if XML dependencies are installed. If the below fails, make sure that libxslt1 and libxml2 dynamic libraries are available."
      echo ""
    fi
    bundle config build.ffi --enable-system-libffi   # for bundle install
    gem install pkg-config -v "1.4.1"
    gem install concurrent-ruby -v "1.1.6"
    bundle install
  fi

  # Only run bundle update if the Gemfile changed
  newHash="${rubyVersion}---$(openssl dgst -sha256 Gemfile)"
  oldHash=$(cat Gemfile.hash 2>/dev/null) || true
  if [[ "${newHash}" != "${oldHash}" ]]; then
    echo "--> Gemfile's new hash: '${newHash}' is different from old one: '${oldHash}'. Updating gems .."
    time bundle update
  fi
  echo "${newHash}" > Gemfile.hash

  if [ "${1}" = "autoupgrade" ]; then
    type bundle-auto-update || gem install bundler-auto-update
    rm -f Gemfile.lock Gemfile.hash
    bundle-auto-update -c true
    exit 0
  fi

  bundle exec jekyll "${@}"
popd > /dev/null
