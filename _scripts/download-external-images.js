const YAML = require('js-yaml')
const fs = require('fs')
const debug = require('depurar')('tusio')
const download = require('download')

const imageAssetRelDir = process.env.IMAGES_DIR || 'assets/img/images'
const imageAssetDir = `${__dirname}/../${imageAssetRelDir}`
const imageConfigFile = process.env.IMAGES_CFG || `${__dirname}/../_data/logos.yml`
const images = YAML.safeLoad(fs.readFileSync(imageConfigFile, 'utf8'))

for (let i = 0; i < images.length; i++) {
  const image = images[i]
  ;(({ src, name }, i) => {
    if (!src.match(/^https?:\/\//i)) {
      return debug(`Skipping already downloaded ${src}`)
    } else {
      debug(`Downloading ${src}`)
      const slug = name.toLowerCase().replace(/[^A-Za-z0-9\-_.]/g, '-')

      download(src).pipe(fs.createWriteStream(`${imageAssetDir}/${slug}`))

      images[i].src = `/${imageAssetRelDir}/${slug}`
      if (i === images.length - 1) {
        fs.writeFileSync(imageConfigFile, YAML.safeDump(images))
        return console.log(`Rewritten '${imageConfigFile}' for ${images[i].src}`)
      }
    }
  })(image, i)
}
