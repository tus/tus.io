# Set magic variables for current file, directory, os, etc.
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
source "${__dir}/_b3bp.sh"

info "--> Fetching latest protocol.."
find _includes/tus.md -mtime +10 -exec rm -rf {} \; || true
[ -f _includes/tus.md ] || (wget \
  https://raw.githubusercontent.com/tus/tus-resumable-upload-protocol/master/protocol.md \
  --quiet \
  --output-document=_includes/tus.md \
  && echo "$(tail -n +3 ./_includes/tus.md)" > ./_includes/tus.md)
# Removes first two lines to allow our own h2 header
