YAML     = require "js-yaml"
fs       = require "fs"
path     = require "path"
debug    = require("depurar")("tusio")
download = require "download"

imageAssetRelDir = process.env.IMAGES_DIR || "assets/img/images"
imageAssetDir    = "#{__dirname}/../#{imageAssetRelDir}"
imageConfigFile  = process.env.IMAGES_CFG || "#{__dirname}/../_data/logos.yml"
images           = YAML.safeLoad(fs.readFileSync(imageConfigFile, 'utf8'))

for image, i in images
  do (image, i)  ->
    if !image.src.match /^https?:\/\//i
      debug "Skipping already downloaded #{image.src}"
    else
      debug "Downloading #{image.src}"
      slug = image.name
        .toLowerCase()
        .replace /[^A-Za-z0-9\-\_\.]/g, "-"

      download(image.src).pipe(fs.createWriteStream(imageAssetDir + '/' + slug))

      images[i].src = "/#{imageAssetRelDir}/#{slug}"
      if i == images.length - 1
        fs.writeFileSync(imageConfigFile, YAML.safeDump(images))
        console.log "Rewritten '#{imageConfigFile}' for #{images[i].src}"
