---
layout: default
title: Resumable File Upload Demo
comments: true
---

## {{ page.title }}

This demo is a proof of concept for resumable file uploads built using the [tus-js-client](https://github.com/tus/tus-js-client). 

It sends your files
to a [tusd](https://github.com/tus/tusd) server written in Go, that we
deployed via [infra-tusd](https://github.com/tus/infra-tusd).

### Instructions

 1. Select a large file.
 2. Watch it upload for a bit, then close this tab before it finishes.
 3. Come back to the tab, select the same file again, the upload should resume where it left off.

<p class="alert hidden" id="support-alert">
  <b>Warning!</b> Your browser does not seem to support the features necessary to run this demo. The buttons below may work but probably will fail silently.
</p>
<noscript>
  <p class="alert">
    <b>Warning!</b> Either you disabled JavaScript or your browser does not support it. However, this demo requires JavaScript. The buttons below  will fail silently unless you activate it, at least for this page.
  </p>
</noscript>

<input type="file">
<label>
  <input type="checkbox" id="resume">
  Perform full upload (even if we could resume)
</label>

<div class="row">
  <div class="nine columns">
    <div class="progress">
      <div class="progress-bar progress-bar-striped" style="width: 0%;"></div>
    </div>
  </div>
  <div class="three columns">
    <button class="u-full-width" id="stop-btn" disabled> abort upload</button>
  </div>
</div>

<hr />
<h3>Uploads</h3>
<p class="upload-list">
  Succesful uploads will be listed here. Try one!<br>
</p>

---------------------------------------

### Compatibility

The [tus-js-client](https://github.com/tus/tus-js-client) used in
this demo has been [tested](https://s3.amazonaws.com/archive.travis-ci.org/jobs/68939799/log.txt) and works with the following browsers:

#### iOS

- passed: iphone 4.3 on Mac 10.6
- passed: iphone 5.0 on Mac 10.6
- passed: iphone 5.1 on Mac 10.8
- passed: iphone 6.0 on Mac 10.8
- passed: iphone 6.1 on Mac 10.8
- passed: iphone 7.0 on Mac 10.9
- passed: iphone 7.1 on Mac 10.9
- passed: iphone 8.0 on Mac 10.10
- passed: iphone 8.2 on Mac 10.10
- passed: iphone 8.1 on Mac 10.10

#### Android

- passed: android 4.0 on Linux
- passed: android 4.1 on Linux
- passed: android 4.2 on Linux
- passed: android 4.3 on Linux
- passed: android 4.4 on Linux
- passed: android 5.0 on Linux
- passed: android 5.1 on Linux


#### OSX

- passed: safari 6 on Mac 10.8
- passed: safari 7 on Mac 10.9
- passed: safari 5 on Mac 10.6
- passed: safari 8 on Mac 10.10

#### Linux

- passed: firefox 31 on Linux
- passed: firefox 32 on Linux
- passed: firefox 33 on Linux
- passed: firefox 34 on Linux
- passed: firefox 35 on Linux
- passed: firefox 36 on Linux
- passed: firefox 37 on Linux
- passed: firefox 38 on Linux
- passed: chrome 31 on Linux
- passed: chrome 32 on Linux
- passed: chrome 33 on Linux
- passed: chrome 35 on Linux
- passed: chrome 34 on Linux
- passed: chrome 37 on Linux
- passed: chrome 36 on Linux
- passed: chrome 38 on Linux
- passed: chrome 39 on Linux
- passed: chrome 40 on Linux
- passed: chrome 41 on Linux
- passed: chrome 42 on Linux
- passed: chrome 43 on Linux

#### Windows

- passed: internet explorer 10 on Windows 2012
- passed: internet explorer 11 on Windows 2012 R2
- passed: internet explorer 9 on Windows 2008
- passed: opera 12 on Windows 2003
- passed: opera 11 on Windows 2003

Going forward, all relevant browsers will be supported with as many features
as possible. All browsers will be able to perform at least simple multipart
uploads.

Using the `X-HTTP-Method-Override` header, it's possible to run tus
even on platforms that won't let you do `PUT` and `PATCH` requests.
