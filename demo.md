---
layout: default
title: Resumable File Upload Demo
comments: true
---

## {{ page.title }}

This demo is a proof of concept for resumable file uploads.

### Instructions

 1. Select a large file.
 2. Watch it upload for a bit, then close this tab before it finishes.
 3. Come back to the tab, select the same file again, the upload should resume where it left off.

<div class="demo-form-container">
  <form id="js_upload">
    <input class="js_file" name="upload" type="file" />
  </form>

  <div class="progress">
    <div class="progress-bar progress-bar-striped active js_progress" style="width: 0%"></div>
  </div>

  <a class="button button-primary download js_download">Download</a>
</div>

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
