$(function() {
  'use strict';

  fixFirefoxHeaders();

  var host = window.tusdEndpoint || 'http://localhost:1080';
  var $progress = $('.js_progress');
  var $download = $('.js_download');

  $('#js_upload').fileupload({
      url: host + '/files',
      maxChunkSize: 16 * 1024 * 1024,
      multipart: false,
      add: function(e, data) {
        $('.js_file').hide();
        $('.js_progress').parent().show();
        upload(data);
      },
      fail: function(e, data) {
        setTimeout(function() {
          upload(data);
        }, 1000);
      },
      progress: function(e, data) {
        var progress = (data.loaded / data.total * 100).toFixed(2);
        setProgress(progress);
      },
      done: function(e, data) {
        console.log(arguments);
        success(data);
      }
  });

  function upload(data) {
    var file = data.files[0];
    var localId = fingerprint(file);
    var size = file.size;

    data.url = localStorage.getItem(localId);

    if (!data.url) {
      $.ajax({
        type: 'POST',
        url: host + '/files',
        headers: {
          'Content-Range': 'bytes */' + size,
          'Content-Disposition': 'attachment; filename="' + encodeURI(file.name) + '"'
        },
        success: function(theData, status, jqXHR) {
          var url = host + jqXHR.getResponseHeader('Location');
          localStorage.setItem(localId, url);

          data.url = url;
          data.method = 'PUT';
          data.submit();
        },
        error: function(xhr) {
          setTimeout(function() {
            upload(data);
          }, 1000);
        }
      });
      return;
    }

    $.ajax({
      type: 'HEAD',
      url: data.url,
      success: function(theData, status, jqXHR) {
        var range = jqXHR.getResponseHeader('Range');
        var m = range && range.match(/bytes=\d+-(\d+)/);
        if (!m) {
          localStorage.removeItem(localId);
          upload(data);
          return;
        }

        var uploadedBytes = parseInt(m[1], 10)+1;
        if (uploadedBytes === size) {
          success(data);
          return;
        }

        data.uploadedBytes = uploadedBytes;
        data.method = 'PUT';
        data.submit();
      },
      error: function(xhr) {
        if (xhr.status === 404) {
          localStorage.removeItem(localId);
          upload(data);
          return;
        }

        console.log('error checking', data.url, 'status', xhr.status);
        setTimeout(function() {
          upload(data);
        }, 1000);
      }
    });
  }

  function fingerprint(file) {
    return 'file-'+file.name+'-'+file.size;
  }

  function setProgress(percentage) {
    $progress.css('width', percentage+'%');
  }

  function success(data) {
    setProgress(100);
    $progress.parent().hide();
    $download.attr('href', data.url);
    $download.show();
    $download.text('Download '+data.files[0].name);
  }

  // This is required at the moment to get CORS headers support for Firefox.
  // Based on http://bugs.jquery.com/ticket/10338#comment:13
  function fixFirefoxHeaders() {
    var _super = $.ajaxSettings.xhr;
    $.ajaxSetup({
      xhr: function() {
        var xhr = _super();
        var getAllResponseHeaders = xhr.getAllResponseHeaders;

        xhr.getAllResponseHeaders = function() {
          var allHeaders = getAllResponseHeaders.call(xhr);
          if (allHeaders) {
            return allHeaders;
          }

          allHeaders = "";
          var concatHeader = function(i, headerName) {
            if (xhr.getResponseHeader(headerName)) {
              allHeaders += headerName + ": " + xhr.getResponseHeader(headerName) + "\n";
            }
          };

          $(["Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma"]).each(concatHeader);

          // non-simple headers (add more as required)
          $(["Location", "Range", "Content-Range"]).each(concatHeader);

          return allHeaders;
        };

        return xhr;
      }
    });
  }
});
