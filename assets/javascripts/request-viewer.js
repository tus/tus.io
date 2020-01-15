const RESPONSE_HEADERS = [
  'Location',
  'Tus-Resumable',
  'Upload-Offset',
  'Upload-Length',
  'Upload-Metadata',
]

const xhrOpen = XMLHttpRequest.prototype.open
const xhrSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader
const xhrSend = XMLHttpRequest.prototype.send

XMLHttpRequest.prototype.open = function (method, url, ...args) {
  this._requestDetails = {
    id          : Math.round(Math.random() * 1e9),
    method      : method.toUpperCase(),
    url         : url,
    headers     : [],
    time        : null,
    bodySize    : null,
    isTusRequest: false,
  }
  xhrOpen.apply(this, [method, url, ...args])
}

XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
  if (name.toLowerCase() === 'tus-resumable') {
    this._requestDetails.isTusRequest = true
  }

  this._requestDetails.headers.push(`${name}: ${value}`)
  xhrSetRequestHeader.call(this, name, value)
}

XMLHttpRequest.prototype.send = function (data) {
  if (!this._requestDetails.isTusRequest) {
    xhrSend.call(this, data)
    return
  }

  if (data !== null) {
    this._requestDetails.bodySize = data.size
  }
  this._requestDetails.time = new Date()

  this.addEventListener('load', () => {
    this._responseDetails = {
      status : this.status + ' ' + this.statusText,
      headers: [],
      time   : new Date(),
    }

    RESPONSE_HEADERS.forEach((name) => {
      const value = this.getResponseHeader(name)
      if (value !== null) {
        this._responseDetails.headers.push(`${name}: ${value}`)
      }
    })

    onResponseIncoming(this)
  })

  xhrSend.call(this, data)
  onRequestOutgoing(this)
}

function onRequestOutgoing (xhr) {
  const req = xhr._requestDetails

  $('.http-traffic-list').append(`
  <div class="http-element" data-request-id="${req.id}">
    <div class="http-method-url"><span class="http-method">${req.method}</span> ${req.url}</div>
    <div class="http-block">
      <div class="http-desc"><b>Request</b> (sent at ${req.time.toLocaleTimeString()})</div>
      <div class="http-paragraph">
        ${req.headers.join('<br />')}
        <br />
        ${req.bodySize ? `[Binary body with ${req.bodySize} bytes]` : '[No body sent]'}
      </div>
    </div>
    <div class="http-block http-response">
      <div class="http-desc"><b>Response</b> (not yet received)</div>
    </div>
  </div>
  `)
}

function onResponseIncoming (xhr) {
  const req = xhr._requestDetails
  const res = xhr._responseDetails

  $(`.http-element[data-request-id=${req.id}] .http-response`).html(`
  <div class="http-desc"><b>Response</b> (received at ${res.time.toLocaleTimeString()})</div>
  <div class="http-paragraph">
    ${res.status}<br />
    ${res.headers.join('<br />')}
  </div>
  `)
}

$(() => {

})
