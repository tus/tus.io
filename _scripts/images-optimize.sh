# Set magic variables for current file, directory, os, etc.
__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
__file="${__dir}/$(basename "${BASH_SOURCE[0]}")"
__base="$(basename ${__file} .sh)"
source "${__dir}/_b3bp.sh"

which mogrify  > /dev/null 2>&1 || (echo "Please: brew install imagemagick" && false)
which pngquant > /dev/null 2>&1 || (echo "Please: brew install pngquant"    && false)

mogrify -verbose -format png -resize 800x800\> "${IMAGES_DIR}/*.{png,jpg,jpeg}"
pngquant \
  --force \
  --skip-if-larger \
  --quality 90-100 \
  --ext '.png' \
  --speed 1 \
  ${IMAGES_DIR}/*.png
