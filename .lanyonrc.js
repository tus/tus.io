const path = require('path')
const _ = require('lodash')

module.exports.overrideRuntime = function ({ runtime, toolkit }) {
  let preBuilds = []

  if (!runtime.isDev) {
    preBuilds = preBuilds.concat([
      'npm run inject',
    ])
  }
  
  let postBuilds = []

  if (!runtime.isDev) {
    postBuilds = postBuilds.concat([
      `sudo chown -R ${process.env.USER} '${runtime.contentBuildDir}'`,
    ])
  }
  
  // Chown jekyll parent directories to avoid: `Permission denied @ dir_s_mkdir - /Users/`...
  let chownDirs = []
  let parts = runtime.contentBuildDir.split('/')
  let cont = ''
  for (let i in parts) {
    let part = parts[i]
    if (!part) continue
    cont = `${cont}/${part}`
    chownDirs.push(cont)
  }
  let dirlist = chownDirs.map((i) => `'${i}'`).join(' ')
  preBuilds.push(`cd '${runtime.cacheDir}' && ${toolkit.dockerString(`bash -c "chown jekyll.jekyll ${dirlist}" || true`, { runtime })}`)

  runtime['prebuild:content'] = preBuilds.join(' && ')
  runtime['postbuild:content'] = postBuilds.join(' && ')

  return runtime
}

module.exports.overrideConfig = function ({ config, toolkit }) {
  if (config.runtime.isDev) {
    config.jekyll.url = 'http://localhost:3000'
  }

  config.jekyll.profile = true
  config.jekyll.trace = true

  if (config.runtime.isDev) {
    config.jekyll.unpublished = true
    config.jekyll.future = true
    config.jekyll.incremental = true // <-- for clarify; incremental is the default also
  } else {
    config.jekyll.incremental = false
  }

  return config
}
