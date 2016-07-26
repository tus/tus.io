YAML     = require "js-yaml"
fs       = require "fs"
debug    = require("depurar")("tusio")
Download = require "download"

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
        .replace /[^A-Za-z\-\_]/g, "-"

      new Download()
        .get(image.src)
        .dest(imageAssetDir)
        .rename(basename: slug)
        .run (err, files)->
          debug
            images          :images
            err            :err
            files          :files
            imageConfigFile :imageConfigFile
            imageAssetDir   :imageAssetDir

          if err
            throw err

          images[i].src = "/#{imageAssetRelDir}/#{files[0].basename}"
          fs.writeFileSync(imageConfigFile, YAML.safeDump(images))
          console.log "Rewritten '#{imageConfigFile}' for #{images[i].src}"
