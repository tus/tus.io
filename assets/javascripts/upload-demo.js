$(function () {
  'use strict'

  var tus = require('tus-js-client')

  var upload         = null
  var toggleBtn      = document.querySelector('#toggle-btn')
  var resumeCheckbox = document.querySelector('#resume')
  var input          = document.querySelector('input[type=file]')
  var $progress      = $('.progress')
  var $progressBar   = $('.progress-bar')
  var alertBox       = document.querySelector('#support-alert')
  var uploadList     = document.querySelector('.upload-list')

  if (!tus.isSupported) {
    alertBox.classList.remove('hidden')
  }

  if (!toggleBtn) {
    console.log('Toggle button not found on this page. Aborting upload-demo. ')
    return
  }

  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault()

    if (upload) {
      upload.abort()
      upload = null
      toggleBtn.textContent = 'resume upload'
    } else {
      if (input.files.length > 0) {
        startUpload()
      } else {
        input.click()
      }
    }
  })

  input.addEventListener('change', startUpload)

  function startUpload () {
    var file = input.files[0]
    // Only continue if a file has actually been selected.
    // IE will trigger a change event even if we reset the input element
    // using reset() and we do not want to blow up later.
    if (!file) {
      return
    }

    // Use the HTTPS protocol if the site is served over a secure connection,
    // in order to prevent the requests from being blocked by the browsers due
    // to their mixed-content and security rules.
    // In the other cases (including the http: and file: protocols), we simply
    // fall back to HTTP.
    var protocol = window.location.protocol === 'https:' ? 'https' : 'http'
    var endpoint = protocol + '://master.tus.io/files/'

    console.log('selected file', file)

    toggleBtn.textContent = 'pause upload'

    var options = {
      endpoint: endpoint,
      resume  : !resumeCheckbox.checked,
      metadata: {
        filename: file.name,
        filetype: file.type
      },
      onError : function (error) {
        if (error.originalRequest) {
          if (window.confirm('Failed because: ' + error + '\nDo you want to retry?')) {
            options.resume = false
            options.uploadUrl = upload.url
            upload = new tus.Upload(file, options)
            upload.start()
            return
          }
        } else {
          window.alert('Failed because: ' + error)
        }

        reset()
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
        $progressBar.css({width: percentage + '%'})
        console.log(bytesUploaded, bytesTotal, percentage + '%')
      },
      onSuccess: function () {
        var anchor = document.createElement('a')
        anchor.textContent = 'Download ' + upload.file.name + ' (' + upload.file.size + ' bytes)'
        anchor.href = upload.url
        anchor.className = 'button primary'
        uploadList.appendChild(anchor)

        reset()

        $('html, body').animate({
          scrollTop: $(uploadList).offset().top,
        }, 1000)
      },
    }

    upload = new tus.Upload(file, options)
    upload.start()
  }

  var animatedOutClass = 'animated flipOutX'
  var animatedInClass = 'animated fadeIn'
  function reset () {
    input.value = ''
    toggleBtn.textContent = 'start upload'
    upload = null

    $progress.removeClass('active')

    // hide
    window.setTimeout(function () {
      $progress.addClass(animatedOutClass)
      $progressBar.addClass('no-transition')

      // set to 0
      window.setTimeout(function () {
        $progressBar.css({width: 0})

        // show
        window.setTimeout(function () {
          $progressBar.removeClass('no-transition')
          $progress
            .removeClass(animatedOutClass)
            .addClass(animatedInClass)
        }, 300)
      }, 600)
    }, 1000)
  }
})
