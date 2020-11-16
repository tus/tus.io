var $ = require('jquery')
window.jQuery = $
window.$ = $

require('./javascripts/app.js')
require('./stylesheets/app.scss')

// check if HMR is enabled
if (module.hot) {
  module.hot.accept('./javascripts/app.js', () => { require('./javascripts/app.js') })
}
