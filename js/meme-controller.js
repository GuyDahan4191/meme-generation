'use strict'

let gElCanvas = {}
let gCtx
let gCurrFillColor = '#ffffff'
let gCurrImgIdx
let gIsDownLoad = false
let gStartPos
let gIsSave

////////////////////////////////////  init  //////////////////////////////////

function onInitMeme() {
    setCanvas()
    // defaultMeme()
    renderMeme()
    addListeners()
    setTimeout(() => {
        document.querySelector('.line-input').focus()
    }, 30);
}

////////////////////////////////  render  ///////////////////////////////////

function renderMeme() {
    const meme = getMeme()
    // resizeCanvas()
    renderImg(meme.selectedImgId)
    setTimeout(() => {
        renderLines(meme)
    }, 30);
}

function renderImg(idx) {
    gCurrImgIdx = idx
    drawImg(idx)
}

function renderLines(meme) {
    meme.lines.forEach(line => {
        drawText(line)
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    console.log('elContainer.offsetWidth:', elContainer.offsetWidth)
    gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
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

function getgElCanvas() {
    return gElCanvas
}

function onCanvasClicked(ev) {
    canvasClicked(ev)
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
    switchLine(1)
    document.querySelector('.line-input').value = ''
    document.querySelector('.line-input').focus()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    switchLine(1)
    document.querySelector('.line-input').focus()
    renderMeme()
    document.querySelector('.line-input').value = getMeme().lines[getMeme().selectedLineIdx].txt
}

function onMoveLine(diff) {
    moveLine(0, diff)
    renderMeme()
}

function onSwitchLine(diff) {
    switchLine(diff)
    document.querySelector('.line-input').focus()
    document.querySelector('.line-input').value = getMeme().lines[getMeme().selectedLineIdx].txt
    renderMeme()
}

////////////////////////////////  ev-colors  ////////////////////////////////

function onPickFillColor(color) {
    gCurrFillColor = color
    colorChange(color)
    renderMeme()
}

function getColor() {
    return gCurrFillColor
}

////////////////////////////////  save meme  ///////////////////////////////

function onSaveMeme() {
    gIsSave = true
    renderMeme()
    saveMeme()
}

function onloadMyMeme() {
    // let memes = loadMemes()
    renderSavedMemes()
}

//////////////////////////////  download-Img  /////////////////////////////

function onDownloadMeme(elLink) {
    gIsDownLoad = true
    renderMeme()
    setTimeout(() => {
        console.log('startDownloas:')
        const memeContent = gElCanvas.toDataURL('image/jpeg')
        elLink.href = memeContent
        gIsDownLoad = false
        renderMeme()
    }, 4000)
}

function isDownLoad() {
    return gIsDownLoad
}

////////////////////////  on-Upload-to-facebook  ////////////////////////

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
        // that will create the link to facebook using the url we gotR
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

//////////////////////  handle the listeners  ///////////////////////

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

//////////////////////  handle click & touch  ///////////////////////

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    // console.log('pos', pos)
    if (!isLineClicked(pos.x, pos.y)) return

    setLineDrag(true)
    console.log('checkkk:')
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    const currLine = getCurrLine()
    if (!currLine.isDrag || currLine.isDrag === undefined) return

    console.log('Moving the Line')

    const pos = getEvPos(ev)
    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

