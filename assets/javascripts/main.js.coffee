# This is just to show that we can use the new jekyl-asset pipeline
# to write CoffeeScript a well, should we so desire.

(($) ->
  Tus = {}

  Tus.navToggler = ->
    $toggler      = $(".header .toggler")
    $navContainer = $(".nav-container")
    toggleClass   = "open"
    $toggler.click ->
      $navContainer.toggleClass toggleClass

    $(document).click ->
      if !$navContainer.hasClass(toggleClass)
        $navContainer.removeClass toggleClass

  $(document).ready ->
    Tus.navToggler()
    $(".on-the-githubs").onthegithubs()
) jQuery
