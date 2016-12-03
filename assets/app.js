var $ = require('jquery');
window.jQuery = $;
window.$ = $;

require('jquery-timeago/jquery.timeago.js')
require('on-the-githubs/js/jquery.on-the-githubs.js')
require('./javascripts/app.js')

require('skeleton/css/normalize.css')
require('skeleton/css/skeleton.css')
require('animate.css/source/_base.css')
require('animate.css/source/fading_entrances/fadeIn.css')
require('animate.css/source/flippers/flipOutX.css')
require('./stylesheets/app.css.less')

// check if HMR is enabled
if (module.hot) {
  module.hot.accept('./javascripts/app.js', function () {
    require('./javascripts/app.js');
  });
  module.hot.accept('./stylesheets/app.css.less', function () {
    require('./stylesheets/app.css.less');
  });
}
