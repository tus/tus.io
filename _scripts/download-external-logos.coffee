YAML     = require "js-yaml"
fs       = require "fs"
debug    = require("depurar")("tusio")
Download = require "download"

logoAssetRelDir = "assets/img/logos"
logoAssetDir    = "#{__dirname}/../#{logoAssetRelDir}"
logoConfigFile  = "#{__dirname}/../_data/logos.yml"
logos           = YAML.safeLoad(fs.readFileSync(logoConfigFile, 'utf8'))

for logo, i in logos
  do (logo, i)  ->
    if logo.src.match /^https?:\/\//i
      slug = logo.name
        .toLowerCase()
        .replace /[^A-Za-z\-\_]/g, "-"

      new Download()
        .get(logo
        .src)
        .dest(logoAssetDir)
        .rename(basename: slug)
        .run (err, files)->
          debug
            logos          :logos
            err            :err
            files          :files
            logoConfigFile :logoConfigFile
            logoAssetDir   :logoAssetDir

          if err
            throw err

          logos[i].src = "/#{logoAssetRelDir}/#{files[0].basename}"
          fs.writeFileSync(logoConfigFile, YAML.safeDump(logos))
          console.log "Rewritten '#{logoConfigFile}' for #{logos[i].src}"
