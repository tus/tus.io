// This is just to show that we can use the new jekyl-asset pipeline
// to write CoffeeScript a well, should we so desire.

($ => {
  const Tus = {}

  Tus.navToggler = () => {
    const $toggler = $('.header .toggler')
    const $navContainer = $('.nav-container')
    const toggleClass = 'open'
    $toggler.click(() => $navContainer.toggleClass(toggleClass))

    return $(document).click(() => {
      if (!$navContainer.hasClass(toggleClass)) {
        return $navContainer.removeClass(toggleClass)
      }
    })
  }

  return $(document).ready(() => {
    Tus.navToggler()
    return $('.on-the-githubs').onthegithubs()
  })
})(jQuery)
