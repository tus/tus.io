#!/bin/bash
#
# Githubs community aggregator
# Version v0.0.2
# As seen on: http://www.tus.io/about.html
#
# Aggregates all people involved in several projects within an
# organistation/owner and combines them into .json files.
# The .json files are then pulled from your webroot by jQuery to
# render all those pretty faces.
# Only does this if the aggregated files are older than x minutes to
# avoid hitting the Github API3 rate limiter.
#
# Licensed under MIT: http://kvz.io/licenses/LICENSE-MIT
# Copyright (c) 2013 Kevin van Zonneveld
# http://twitter.com/kvz
#
# Usage:
#  LOG_LEVEL=7 OWNER=tus ./community.sh
#
#
# Based on BASH3 Boilerplate v0.0.3 (https://github.com/kvz/bash3boilerplate)
# Licensed under MIT: http://kvz.io/licenses/LICENSE-MIT
# Copyright (c) 2013 Kevin van Zonneveld
# http://twitter.com/kvz
#


### Configuration
#####################################################################

# Set magic variables for current FILE & DIR
__DIR__="$(cd "$(dirname "${0}")"; echo $(pwd))"
__FILE__="${__DIR__}/$(basename "${0}")"

# Environment variables
[ -z "${LOG_LEVEL}" ] && LOG_LEVEL="6" # 7 = debug, 0 = emergency
[ -z "${OWNER}" ]     && OWNER="tus"
[ -z "${TYPES}" ]     && TYPES="collaborators contributors subscribers stargazers issues"
[ -z "${REPOS}" ]     && REPOS="tus.io tusd tus-jquery-client tus-ios-client tus-android-client tus-resumable-upload-protocol"
[ -z "${CACHE_DIR}" ] && CACHE_DIR="${__DIR__}" # holds all individual .json files, raw copy of Github's
[ -z "${WEB_DIR}" ]   && WEB_DIR="${__DIR__}"   # holds combined .json files


### Functions
#####################################################################

function _fmt ()      {
  color_ok="\x1b[32m"
  color_bad="\x1b[31m"

  color="${color_bad}"
  if [ "${1}" = "debug" ] || [ "${1}" = "info" ] || [ "${1}" = "notice" ]; then
    color="${color_ok}"
  fi

  color_reset="\x1b[0m"
  if [ "${TERM}" != "xterm" ] || [ -t 1 ]; then
    # Don't use colors on pipes or non-recognized terminals
    color=""; color_reset=""
  fi
  echo -e "$(date -u +"%Y-%m-%d %H:%M:%S UTC") ${color}$(printf "[%9s]" ${1})${color_reset}";
}
function emergency () {                             echo "$(_fmt emergency) ${@}" || true; exit 1; }
function alert ()     { [ "${LOG_LEVEL}" -ge 1 ] && echo "$(_fmt alert) ${@}" || true; }
function critical ()  { [ "${LOG_LEVEL}" -ge 2 ] && echo "$(_fmt critical) ${@}" || true; }
function error ()     { [ "${LOG_LEVEL}" -ge 3 ] && echo "$(_fmt error) ${@}" || true; }
function warning ()   { [ "${LOG_LEVEL}" -ge 4 ] && echo "$(_fmt warning) ${@}" || true; }
function notice ()    { [ "${LOG_LEVEL}" -ge 5 ] && echo "$(_fmt notice) ${@}" || true; }
function info ()      { [ "${LOG_LEVEL}" -ge 6 ] && echo "$(_fmt info) ${@}" || true; }
function debug ()     { [ "${LOG_LEVEL}" -ge 7 ] && echo "$(_fmt debug) ${@}" || true; }

function fetch () {
  local url="https://api.github.com/"
  local file="${CACHE_DIR}/"
  for arg; do
    url="${url}${arg}/"
    file="${file}${arg}-"
  done

  url="${url%?}"
  file="${file%?}.json"

  # To protect against rate-limiter & long waits
  if [ "$(find "${file}" -mmin -60 |wc -l)" -eq 0 ]; then
    curl -ks "${url}" -o "${file}"
    sleep 2
  fi

  cat "${file}"
}


### Validation (decide what's required for running your script and error out)
#####################################################################

[ -z "${LOG_LEVEL}" ] && emergency "Cannot continue without LOG_LEVEL. "


### Runtime
#####################################################################

# Exit on error. Append ||true if you expect an error.
# set -e is safer than #!/bin/bash -e because that is nutralised if
# someone runs your script like `bash yourscript.sh`
set -eu

# Bash will remember & return the highest exitcode in a chain of pipes.
# This way you can catch the error in case mysqldump fails in `mysqldump |gzip`
set -o pipefail


# Members is organisation wide
combined_file="${WEB_DIR}/combined-${OWNER}-members.json"
info "Writing ${combined_file}"
fetch orgs ${OWNER} members > "${combined_file}"

# Rest is sourced per type & repo
for type in $(echo ${TYPES}); do
  combined=""
  combined_file="${WEB_DIR}/combined-${OWNER}-${type}.json"
  for repo in $(echo ${REPOS}); do
    # use sed vs head because that does not work on OSX
    current="$(fetch repos ${OWNER} ${repo} ${type} |tail -n +2 |sed '$d')"
    if [ $? -eq 0 ] && [ -n "${current}" ]; then
      combined="${combined}${current}, "
    fi
  done

  if [ -n "${combined}" ]; then
    combined="${combined:0:${#combined}-2}"
  fi

  info "Writing ${combined_file}"
  echo "[ ${combined} ]" > "${combined_file}"
done
