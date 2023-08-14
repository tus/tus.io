import * as tus from 'tus-js-client'
import ago from 's-ago'
import { signal } from '@preact/signals'
import { useCallback, useId } from 'preact/hooks'
import type { ChangeEvent } from 'preact/compat'
import styles from './UploadDemo.module.css'
import prettyBytes from 'pretty-bytes'
import clsx from 'clsx'

const supported = signal(tus.isSupported)
const upload = signal<tus.Upload | null>(null)
const previousUploads = signal<tus.PreviousUpload[]>([])
const showUploadProgress = signal<boolean>(false)
const showPreviousUploads = signal<boolean>(false)
const isUploadRunning = signal<boolean>(false)
const isUploadComplete = signal<boolean>(false)
const progressBarWidth = signal<string>(`0%`)
const progress = signal<string>('')

export function UploadDemo() {
  const id = useId()

  const startUpload = useCallback(() => {
    if (!upload.value) return

    upload.value.options.onError = (error) => {
      console.log('demo: error', error)

      if (error instanceof tus.DetailedError && error.originalRequest) {
        const text = `The upload was interrupted by a network failure or server error. Usually, this failure will disappear by retrying the upload. If the error does not disappear, please contact us.

Details: ${error.message}

Do you want to retry the upload?`

        if (window.confirm(text)) {
          upload.value?.start()
          return
        }
      } else {
        window.alert('Failed because: ' + error.message)
      }

      isUploadRunning.value = false
      upload.value = null
    }

    upload.value.options.onProgress = (bytesUploaded, bytesTotal) => {
      progressBarWidth.value =
        ((bytesUploaded / bytesTotal) * 100).toFixed(2) + '%'

      progress.value = `Uploaded ${prettyBytes(bytesUploaded)} of ${prettyBytes(
        bytesTotal,
      )} (${progressBarWidth.value})`

      console.log(
        'demo: progress',
        bytesUploaded,
        bytesTotal,
        progressBarWidth.value,
      )
    }

    upload.value.options.onSuccess = () => {
      showUploadProgress.value = false
      isUploadComplete.value = true
    }

    showPreviousUploads.value = false
    showUploadProgress.value = true
    isUploadRunning.value = true
    upload.value.start()
  }, [])

  const handleChange = useCallback(
    async (event: ChangeEvent) => {
      if (!(event.target instanceof HTMLInputElement)) return
      if (!event.target.files) return

      const file: File = event.target.files[0]

      // Only continue if a file has actually been selected.
      // IE will trigger a change event even if we reset the input element
      // using reset() and we do not want to blow up later.
      if (!file) return

      console.log('demo: selected file', file)

      const options = {
        endpoint: 'https://tusd.tusdemo.net/files/',
        metadata: {
          filename: file.name,
          filetype: file.type,
        },
        addRequestId: true,
      }

      const newUpload = new tus.Upload(file, options)

      const allPreviousUploads = await newUpload.findPreviousUploads()

      // We only want to consider uploads that were started within the last three hours.
      const threeHoursAgo = Date.now() - 3 * 60 * 60 * 1000

      const lastThreeHrsPrevUploads = allPreviousUploads
        .filter(
          (upload) => new Date(upload.creationTime).getTime() > threeHoursAgo,
        )
        .sort(
          (a, b) =>
            new Date(b.creationTime).getTime() -
            new Date(a.creationTime).getTime(),
        )

      upload.value = newUpload
      previousUploads.value = lastThreeHrsPrevUploads

      if (lastThreeHrsPrevUploads.length === 0) {
        startUpload()
        return
      }

      showPreviousUploads.value = true
    },
    [startUpload],
  )

  return (
    <>
      {!supported.value && (
        <p class={styles.alert}>
          <strong>Warning!</strong> Your browser does not seem to support the
          features necessary to run this demo. The buttons below may work but
          probably will fail silently.
        </p>
      )}

      <noscript>
        <p class={styles.alert}>
          <strong>Warning!</strong> Either you disabled JavaScript or your
          browser does not support it. However, this demo requires JavaScript.
          The buttons below will fail silently unless you activate it, at least
          for this page.
        </p>
      </noscript>

      {supported.value && (
        <>
          <div class={styles.root}>
            {!upload.value && (
              <>
                <label class={styles.label} htmlFor={id}>
                  Select a file you want to upload
                </label>
                <input
                  id={id}
                  type="file"
                  onChange={(event) => {
                    void handleChange(event)
                  }}
                />
              </>
            )}

            {upload.value && (
              <>
                {showUploadProgress.value && (
                  <>
                    <p class={styles.heading}>
                      {isUploadRunning.value
                        ? 'The upload is running:'
                        : 'The upload is paused:'}
                    </p>

                    <div class={styles.row}>
                      <div
                        class={styles.progress}
                        data-state={
                          isUploadRunning.value ? 'running' : 'paused'
                        }
                      >
                        <div
                          class={styles['progress-bar']}
                          style={{ width: progressBarWidth.value }}
                        />
                      </div>

                      <button
                        class={styles.button}
                        onClick={() => {
                          if (isUploadRunning.value) {
                            void upload.value?.abort()
                            isUploadRunning.value = false
                          } else {
                            upload.value?.start()
                            isUploadRunning.value = true
                          }
                        }}
                      >
                        {isUploadRunning.value ? 'Pause' : 'Resume'}
                      </button>
                    </div>

                    <p class={styles['progress-text']}>{progress}</p>
                  </>
                )}

                {showPreviousUploads.value && (
                  <>
                    <p class={styles.heading}>
                      You already started uploading this file{' '}
                      {ago(new Date(previousUploads.value[0].creationTime))}. Do
                      you want to resume this upload?
                    </p>
                    <div class={styles.buttons}>
                      <button
                        class={clsx(styles.button, styles.primary)}
                        onClick={() => {
                          upload.value?.resumeFromPreviousUpload(
                            previousUploads.value[0],
                          )
                          startUpload()
                        }}
                      >
                        Yes, resume
                      </button>
                      <button
                        class={styles.button}
                        onClick={() => {
                          startUpload()
                        }}
                      >
                        No, start over
                      </button>
                    </div>
                  </>
                )}

                {isUploadComplete.value && (
                  <>
                    <p class={styles.heading}>The upload is complete!</p>
                    <div class={styles.buttons}>
                      {upload.value.file instanceof File && (
                        <>
                          <a
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            href={upload.value.url!}
                            target="_blank"
                            class={clsx(styles.button, styles.primary)}
                            rel="noreferrer"
                          >
                            Download {upload.value.file.name} (
                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
                            {prettyBytes(upload.value.file.size)})
                          </a>
                          or
                        </>
                      )}
                      <button
                        class={styles.button}
                        onClick={() => {
                          upload.value = null
                          previousUploads.value = []
                          showUploadProgress.value = false
                          showPreviousUploads.value = false
                        }}
                      >
                        Upload another file
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
