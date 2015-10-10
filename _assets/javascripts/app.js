//=require jquery/jquery.js
//=require jquery-timeago/jquery.timeago.js
//=require on-the-githubs/js/jquery.on-the-githubs.js
//=require tus-js-client/dist/tus.js
//=require upload-demo.js


/* global jQuery */
(function ($) {
  'use strict';

  var Tus = {};

  Tus.navToggler = function () {
    var $toggler      = $('.header .toggler');
    var $navContainer = $('.nav-container');
    var toggleClass   = 'open';

    $toggler.click(function () {
      $navContainer.toggleClass(toggleClass);
    });

    $(document).click(function () {
      if (!$navContainer.hasClass(toggleClass)) {
        $navContainer.removeClass(toggleClass);
      }
    });
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  $(document).ready(function () {
    Tus.navToggler();

    if ($('.logos').length > 0) {
      var logos = shuffleArray(window.companyLogos);
      for (var i = 0, l = logos.length; i<l; i++) {
        var logo = $('<div class="slide two columns"><a href="' + logos[i].url + '"><img src="' + logos[i].src + '" alt="' + logos[i].name + '"></a></div>');
        $('.logos').append(logo);
      }
      $('.expender').click(function() {
        if ($('.logos').hasClass('expended')) {
          $('.logos').removeClass('expended').css('max-height', '150px');
          $('.expender').html('see more <span class="caret"/>');
        } else {
          $('.logos').addClass('expended').css('max-height', 5000);
          $('.expender').html('see less <span class="dropup"><span class="caret"></span></span>');
        }
      });
    }

    $('.on-the-githubs').onthegithubs();
  });
})(jQuery);
