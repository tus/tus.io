var $ = require('jquery')
window.jQuery = $
window.$ = $

require('./javascripts/app.js')
require('./stylesheets/app.css.less')

// check if HMR is enabled
if (module.hot) {
  module.hot.accept('./javascripts/app.js', function () {
    require('./javascripts/app.js')
  })
  module.hot.accept('./stylesheets/app.css.less', function () {
    require('./stylesheets/app.css.less')
  })
}
