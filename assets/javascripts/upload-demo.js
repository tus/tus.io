'use strict'

const ago = require('s-ago')
const tus = require('tus-js-client')

const container = document.querySelector('#js-upload-container')
const alertBox  = document.querySelector('#js-support-alert')

if (!tus.isSupported) {
  alertBox.classList.remove('hidden')
}

/**
 * Fill the container with a file input element.
 */
function drawFileInput () {
  container.innerHTML = `
    <div class="heading">Select a file you want to upload:</div>
    <input type="file" id="js-file-input" />
  `

  const input = container.querySelector('#js-file-input')
  input.addEventListener('change', () => {
    const file = input.files[0]
    // Only continue if a file has actually been selected.
    // IE will trigger a change event even if we reset the input element
    // using reset() and we do not want to blow up later.
    if (!file) {
      return
    }

    console.log('demo: selected file', file)

    const options = {
      endpoint: 'https://tusd.tusdemo.net/files/',
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      addRequestId: true,
    }

    const upload = new tus.Upload(file, options)
    drawPreviousUploadSelect(upload).catch((error) => {
      console.error(error)
    })
  })
}

/**
 * Fill the container with buttons to select if an upload should be resumed
 */
async function drawPreviousUploadSelect (upload) {
  let previousUploads = await upload.findPreviousUploads()

  // We only want to consider uploads that were started within the last three hours.
  const threeHoursAgo = Date.now() - 3 * 60 * 60 * 1000
  previousUploads = previousUploads
    .map((upload) => {
      upload.creationTime = new Date(upload.creationTime)
      return upload
    })
    .filter(upload => upload.creationTime > threeHoursAgo)
    .sort((a, b) => b.creationTime - a.creationTime)

  // If no upload was previously started, we can directly start the upload.
  if (previousUploads.length === 0) {
    return drawUploadControls(upload)
  }

  const time = ago(previousUploads[0].creationTime)
  container.innerHTML = `
    <div class="heading">You already started uploading this file ${time}. Do you want to resume this upload?</div>
    <button data-resume="0" class="button button-primary">Yes, resume</button>
    <button data-resume="false">No, start over</button>
  `

  // The code is also able to deal with multiple options here, but we don't
  // use it at the moment.
  const buttons = container.querySelectorAll('button[data-resume]')
  Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (event) => {
      const value = event.target.getAttribute('data-resume')
      const index = parseInt(value, 10)
      if (!isNaN(index)) {
        upload.resumeFromPreviousUpload(previousUploads[index])
      }

      drawUploadControls(upload)
    })
  })
}

/**
 * Fill the container with a progress bar and a pause/unpause button.
 */
function drawUploadControls (upload) {
  container.innerHTML = `
    <div class="heading">The upload is running:</div>
    <div class="upload-row">
      <div class="progress indeterminate">
        <div class="progress-bar"></div>
      </div>
      <button id="js-upload-toggle">Pause</button>
    </div>
    <div class="upload-text-progress" id="js-upload-text-progress"></div>
  `

  const progress      = container.querySelector('.progress')
  const progressBar   = container.querySelector('.progress-bar')
  const pauseButton   = container.querySelector('#js-upload-toggle')
  const textProgress  = container.querySelector('#js-upload-text-progress')
  const textHeading   = container.querySelector('.heading')
  let isUploadRunning = true

  pauseButton.addEventListener('click', () => {
    if (isUploadRunning) {
      upload.abort()
      isUploadRunning = false
      pauseButton.textContent = 'Resume'
      textHeading.textContent = 'The upload is paused:'
      progress.classList.add('paused')
    } else {
      upload.start()
      isUploadRunning = true
      pauseButton.textContent = 'Pause'
      textHeading.textContent = 'The upload is running:'
      progress.classList.remove('paused')
    }
  })

  upload.options.onError = (error) => {
    console.log('demo: error', error)

    if (error.originalRequest) {
      const text = `The upload was interrupted by a network failure or server error. Usually, this failure will disappear by retrying the upload. If the error does not disappear, please contact us.

Details: ${error}

Do you want to retry the upload?`
      if (window.confirm(text)) {
        upload.start()
        return
      }
    } else {
      window.alert('Failed because: ' + error)
    }

    drawFileInput()
  }

  upload.options.onProgress = (bytesUploaded, bytesTotal) => {
    const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2) + '%'
    progress.classList.remove('indeterminate')
    progressBar.style.width = percentage
    console.log('demo: progress', bytesUploaded, bytesTotal, percentage)
    textProgress.textContent = `Uploaded ${formatBytes(bytesUploaded)} of ${formatBytes(bytesTotal)} (${percentage})`
  }

  upload.options.onSuccess = () => {
    drawDownloadLink(upload)
  }

  upload.start()
}

/**
 * Fill the container with a download link after the upload is finished.
 */
function drawDownloadLink (upload) {
  container.innerHTML = `
    <div class="heading">The upload is complete!</div>

    <a href="${upload.url}" target="_blank" class="button button-primary">
      Download ${upload.file.name} (${formatBytes(upload.file.size)})
    </a>
    <br />
    or
    <a href="#" id="js-reset-demo">Upload another file</a>
  `

  const resetButton = container.querySelector('#js-reset-demo')
  resetButton.addEventListener('click', (event) => {
    event.preventDefault()
    drawFileInput()
  })
}

/**
 * Turn a byte number into a human readable format.
 * Taken from https://stackoverflow.com/a/18650828
 */
function formatBytes (bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

if (container) {
  drawFileInput()
} else {
  console.log('demo: Container not found on this page. Aborting upload-demo.js')
}
