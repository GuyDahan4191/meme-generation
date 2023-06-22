'use strict'

let gElCanvas = {}
let gCtx
let gCurrFillColors = '#ffffff'
let gCurrIdx

////////////////////////////////////  init  //////////////////////////////////

function onInitMeme() {
    // resizeCanvas()
    setCanvas()
    renderMeme()
    // addListeners()
}

////////////////////////////////  render  ///////////////////////////////////

function renderMeme() {
    const meme = getMeme()
    renderImg(meme.selectedImgId)
    setTimeout(() => {
        renderLines(meme)
    }, 50);
}

function renderImg(idx) {
    gCurrIdx = idx
    drawImg(idx)
}

function renderLines(meme) {
    const lines = meme.lines
    lines.forEach((line) => {
        drawText(line)
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    console.log('elContainer.offsetWidth:', elContainer.offsetWidth)
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

////////////////////////////////  canvas  ////////////////////////////////

function setCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    console.log('gCtx:', gCtx)
}

function onClearCanvas() {
    renderImg(idx)
}

/////////////////////////////  line toolbar  ////////////////////////////

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onChangeSize(diff) {
    changeSize(diff)
    renderMeme()
}

function onChangeTextAlign(direction) {
    changeTextAlign(direction, gElCanvas)
    renderMeme()
}

function onFontChange(font) {
    fontChange(font)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

////////////////////////////////  ev-colors  ////////////////////////////////

function onPickFillColor(color) {
    gCurrFillColors = color
    renderMeme()
}

function getColor() {
    return gCurrFillColors
}

//////////////////////////////  download-Img  /////////////////////////

function onDownloadMeme(elLink) {
    const memeContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = memeContent
}

////////////////////////  on-Upload-to-facebook  /////////////////////

function onUploadImg() {
    // Gets the image from the canvas
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function,
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

