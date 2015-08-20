---
layout: default
title: Resumable File Upload Demo
comments: true
---

## {{ page.title }}

This demo is a proof of concept for resumable file uploads built using the <a href="https://github.com/tus/tus-js-client">tus-js-client</a>.

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

For this proof of concept, the following browsers were tested:

#### OSX

 - Safari 6.0.2 on OS 10.8.2 (working)
 - Chrome 24.0.1312.52 on OS 10.8.2 (working)
 - Firefox 19.0.2 on OS 10.8.2 (working)
 - Opera 12.12 on OS X 10.8.3 (working)

#### iOS

 - Safari on iOS 6.1.2 (working)

#### Linux

 - Iceweasel (Firefox) 10.0.12 on Debian GNU/Linux stable PPC (working)
 - Firefox 19 on Ubuntu 12.04 LTS (working)
 - Chromium 26.0.1410.43 on Linux (working)

#### Windows

 - IE 9.0 on Win7 (broken, probably needs CORS workarounds)
 - IE 10.0 on Win8 (working)
 - Firefox 20.0.1 on Win7 64 (working)
 - Firefox 20.0.1 on Windows XP Pro SP3 (working)
 - Chrome 26.0.1410.64 on Win7 Pro 64 (working)
 - Opera on Win7 (working)

Going forward, all relevant browsers will be supported with as many features
as possible. All browsers will be able to perform at least simple multipart
uploads.
