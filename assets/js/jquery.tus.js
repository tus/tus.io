/*
 * tus-jquery-client
 * https://github.com/tus/tus-jquery-client
 *
 * Copyright (c) 2013 Transloadit Ltd and Contributors
 * http://tus.io/
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

(function ($) {
  'use strict';

  // The Public API
  var tus = window.tus = {
    upload: function(file, options) {
      var upload = new ResumableUpload(file, options);
      if (file) {
        upload._start();
      }
      return upload;
    },
    fingerprint: function(file) {
      return 'tus-' + file.name + '-' + file.type + '-' + file.size;
    }
  };

  function ResumableUpload(file, options) {
    // The file to upload
    this.file = file;
    // Options for resumable file uploads
    this.options = {
      // The tus upload endpoint url
      endpoint: options.endpoint,

      // The fingerprint for the file.
      // Uses our own fingerprinting if undefined.
      fingerprint: options.fingerprint,

      // @TODO: second option: resumable: true/false
      // false -> removes resume functionality
      resumable: options.resumable !== undefined ? options.resetBefore : true,
      resetBefore: options.resetBefore,
      resetAfter: options.resetAfter
    };

    // The url of the uploaded file, assigned by the tus upload endpoint
    this.fileUrl = null;

    // Bytes sent to the server so far
    this.bytesWritten = null;

    // @TODO Add this.bytesTotal again

    // the jqXHR object
    this._jqXHR = null;

    // Create a deferred and make our upload a promise object
    this._deferred = $.Deferred();
    this._deferred.promise(this);
  }

  // Creates a file resource at the configured tus endpoint and gets the url for it.
  ResumableUpload.prototype._start = function() {
    var self = this;

    // Optionally resetBefore
    if (!self.options.resumable || self.options.resetBefore === true) {
      self._urlCache(false);
    }

    if (!(self.fileUrl = self._urlCache())) {
      self._post();
    } else {
      self._head();
    }
  };

  ResumableUpload.prototype._post = function() {
    var self    = this;
    var options = {
      type: 'POST',
      url: self.options.endpoint,
      headers: {
        'Final-Length': self.file.size
      }
    };

    $.ajax(options)
      .fail(function(jqXHR, textStatus, errorThrown) {
        // @todo: Implement retry support
        self._emitFail('Could not post to file resource ' +
          self.options.endpoint + '. ' + textStatus);
      })
      .done(function(data, textStatus, jqXHR) {
        var location = jqXHR.getResponseHeader('Location');
        if (!location) {
          return self._emitFail('Could not get url for file resource. ' + textStatus);
        }

        self.fileUrl = location;
        self._uploadFile(0, self.file.size - 1);
      });
  };

  ResumableUpload.prototype._head = function() {
    var self    = this;
    var options = {
      type: 'HEAD',
      url: this.fileUrl,
      cache: false
    };

    console.log('Resuming known url ' + this.fileUrl);
    $.ajax(options)
      .fail(function(jqXHR, textStatus, errorThrown) {
        // @TODO: Implement retry support
        self._emitFail('Could not head at file resource: ' + textStatus);
      })
      .done(function(data, textStatus, jqXHR) {
        var offset = jqXHR.getResponseHeader('Offset');
        var bytesWritten = offset ? parseInt(offset, 10) : 0;
        self._uploadFile(bytesWritten, self.file.size - 1);
      });
  };

  // Uploads the file data to tus resource url created by _start()
  ResumableUpload.prototype._uploadFile = function(range_from, range_to) {
    var self  = this;
    this.bytesWritten = range_from;

    if (this.bytesWritten === this.file.size) {
      // Cool, we already completely uploaded this.
      // Update progress to 100%.
      this._emitProgress();
      return this._emitDone();
    }

    this._urlCache(self.fileUrl);
    this._emitProgress();

    var bytesWrittenAtStart = this.bytesWritten;

    var slice = self.file.slice || self.file.webkitSlice || self.file.mozSlice;
    var blob  = slice.call(self.file, range_from, range_to + 1, self.file.type);
    var xhr   = $.ajaxSettings.xhr();

    var options = {
      type: 'PATCH',
      url: self.fileUrl,
      data: blob,
      processData: false,
      contentType: self.file.type,
      cache: false,
      xhr: function() {
        return xhr;
      },
      headers: {
        'Offset': range_from
      }
    };

    $(xhr.upload).bind('progress', function(e) {
      self.bytesWritten = bytesWrittenAtStart + e.originalEvent.loaded;
      self._emitProgress(e);
    });

    this._jqXHR = $.ajax(options)
      .fail(function(jqXHR, textStatus, errorThrown) {
        // @TODO: Compile somewhat meaningful error
        // Needs to be cleaned up
        // Needs to have retry
        var msg = jqXHR.responseText || textStatus || errorThrown;
        self._emitFail(msg);
      })
      .done(function() {
        console.log('done', arguments, self, self.fileUrl);

        if (self.options.resetAfter === true) {
          self._urlCache(false);
        }

        self._emitDone();
      });
  };

  ResumableUpload.prototype.stop = function() {
    if (this._jqXHR) {
      this._jqXHR.abort();
    }
  };

  ResumableUpload.prototype._emitProgress = function(e) {
    this._deferred.notifyWith(this, [e, this.bytesWritten, this.file.size]);
  };

  ResumableUpload.prototype._emitDone = function() {
    this._deferred.resolveWith(this, [this.fileUrl, this.file]);
  };

  ResumableUpload.prototype._emitFail = function(err) {
    this._deferred.rejectWith(this, [err]);
  };

  ResumableUpload.prototype._urlCache = function(url) {
    var fingerPrint = this.options.fingerprint;
    if (fingerPrint === undefined) {
      fingerPrint = tus.fingerprint(this.file);
    }

    if (url === false) {
      console.log('Resetting any known cached url for ' + this.file.name);
      return localStorage.removeItem(fingerPrint);
    }

    if (url) {
      var result = false;
      try {
        result = localStorage.setItem(fingerPrint, url);
      } catch (e) {
        // most likely quota exceeded error
      }

      return result;
    }

    return localStorage.getItem(fingerPrint);
  };
})(jQuery);
