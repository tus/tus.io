import 'regenerator-runtime/runtime'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-c' // can't use objectivec without c
import 'prismjs/components/prism-objectivec'
import 'prismjs/components/prism-swift'

import 'timeago/jquery.timeago.js'
import 'on-the-githubs/js/jquery.on-the-githubs.js'
import './upload-demo.js'
import './request-viewer.js'

;($ => {
  const Tus = {}

  Tus.navToggler = () => {
    const $toggler      = $('.header .toggler')
    const $navContainer = $('.nav-container')
    const toggleClass   = 'open'
    $toggler.click(() => $navContainer.toggleClass(toggleClass))

    $(document).click(() => {
      if (!$navContainer.hasClass(toggleClass)) {
        $navContainer.removeClass(toggleClass)
      }
    })
  }

  Tus.versionSelector = () => {
    const $select = $('#js-version-select')
    $select.change(() => {
      window.location.href = $select.val()
    })
  }

  $(document).ready(() => {
    Tus.navToggler()
    Tus.versionSelector()
    $('.on-the-githubs').onthegithubs()
  })
})(jQuery)

Prism.highlightAll()
