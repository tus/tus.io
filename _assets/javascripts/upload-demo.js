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

  if (!stopBtn) {
    console.log('Stop button not found on this page. Aborting upload-demo. ');
    return;
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

  // Fetch the lastest job results from SauceLabs to build the browser matrix.
  // Only proceed and send the request if we are on the demo page
  if(location.pathname != "/demo.html") return;

  // We use crossorigin.me for adding the required CROS headers since
  // SauceLabs does not do this by default.
  $.getJSON("http://crossorigin.me/https://saucelabs.com/rest/v1/marius_transloadit/jobs?limit=100&full=true", function(jobs) {
    var matrix = {},
        buildId = jobs[0].build;

    // Insert jobs into a table
    jobs.forEach(function(job) {
      // Ignore jobs which are not run in the latestest build
      if(job.build != buildId) return;

      var browser = job.browser;

      if(!(browser in matrix)) {
        matrix[browser] = [];
      }

      matrix[browser].push({
        version: job.browser_short_version,
        passed: !!job.passed
      });
    });

    // `matrix` contains the verions grouped by the browser name but
    // we want the in a table-like format stored in rows and columns
    var table = [];

    for(var i = 0; true; i++) {
      var cellFound = false;

      table[i] = [];

      for(var browser in matrix) {
        var cell = matrix[browser][i];

        if(cell) {
          cellFound = true;
        } else {
          cell = null;
        }

        table[i].push(cell);

      }

      if(!cellFound) {
        delete table[i];
        break;
      }
    }

    // Build a HTML table from the arrays
    var html = "<table class='u-full-width'><tr>";

    var browserAlias = {
      iphone: "iPhone",
      android: "Android",
      opera: "Opera",
      safari: "Safari",
      googlechrome: "Chrome",
      firefox: "Firefox",
      iexplore: "IE"
    };

    for(var browser in matrix) {
      html += "<th>" + browserAlias[browser] + "</th>";
    }

    html += "</tr>";

    table.forEach(function(row) {
      html += "<tr>";

      row.forEach(function(cell) {
        html += "<td>";
        if(cell != null) {
          if(!cell.passed) {
            html += "<del>" + cell.version + "</del>";
          } else {
            html += cell.version;
          }
        }
        html += "</td>";
      });

      html += "</tr>";
    });

    html += "</table>";

    $("#browser-matrix").html(html);
  });
});
