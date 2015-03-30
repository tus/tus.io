/* global jQuery */
(function ($) {
  'use strict';

  var Tus = {};

  Tus.navToggler = function () {
    var $toggler = $('.header .toggler');
    var $navContainer = $('.nav-container');
    var toggleClass = 'open';

    $toggler.click(function () {
      $navContainer.toggleClass(toggleClass);
    });

    $(document).click(function () {
      if (!$navContainer.hasClass(toggleClass)) {
        $navContainer.removeClass(toggleClass);
      }
    });
  };

  $(document).ready(function () {
    Tus.navToggler();
  });
})(jQuery);
