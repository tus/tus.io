/* global $, console, tus, alert */

$(function () {
  'use strict';

  var upload         = null;
  var stopBtn        = document.querySelector('#stop-btn');
  var resumeCheckbox = document.querySelector('#resume');
  var input          = document.querySelector('input[type=file]');
  var $progress      = $('.progress');
  var $progressBar   = $('.progress-bar');
  var alertBox       = document.querySelector('#support-alert');
  var uploadList     = document.querySelector('.upload-list');

  if (!tus.isSupported) {
    alertBox.classList.remove('hidden');
  }

  stopBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (upload) {
      upload.abort();
    }
  });

  input.addEventListener('change', function (e) {
    var file = e.target.files[0];
    console.log('selected file', file);

    stopBtn.disabled = false;

    var options = {
      endpoint: 'http://master.tus.io:8080/files/',
      resume: !resumeCheckbox.checked,
      onError: function (error) {
        reset();
        alert('Failed because: ' + error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
        $progressBar.css({width: percentage + '%'});
        console.log(bytesUploaded, bytesTotal, percentage + '%');
      },
      onSuccess: function () {
        reset();
        var anchor = document.createElement('a');
        anchor.textContent = 'Download ' + upload.file.name + ' (' + upload.file.size + ' bytes)';
        anchor.href = upload.url;
        anchor.className = 'button primary';
        uploadList.appendChild(anchor);
      }
    };

    upload = new tus.Upload(file, options);
    upload.start();
  });

  var animatedOutClass = 'animated flipOutX';
  var animatedInClass = 'animated fadeIn';
  function reset() {
    input.value = '';
    stopBtn.disabled = true;
    $progress.removeClass('active');

    // hide
    window.setTimeout(function () {
      $progress.addClass(animatedOutClass);
      $progressBar.addClass('no-transition');

      // set to 0
      window.setTimeout(function () {
        $progressBar.css({width: 0});

        // show
        window.setTimeout(function () {
          $progressBar.removeClass('no-transition');
          $progress
            .removeClass(animatedOutClass)
            .addClass(animatedInClass);
        }, 300);
      }, 600);
    }, 1000);
  }
});
