const path = require('path')
const _ = require('lodash')

module.exports.overrideRuntime = function ({ runtime, toolkit }) {
  let preBuilds = []

  if (!runtime.isDev) {
    preBuilds = preBuilds.concat([
      'npm run inject',
    ])
  }
  
  runtime['prebuild:content'] = preBuilds.join(' && ')

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
