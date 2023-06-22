'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Enter text',
        size: 40,
        color: 'red',
        pos: { x: 200, y: 40 },
        font: 'Impact',
        isChoosen: false,
        alignDirection: 'center'
    }]
}
let gCurrLine = 0
let gLineGap = (gMeme.lines.length) * 50
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

const STORAGE_KEY_MY_MEMES = 'savedMemesDB'
const gMyMemes = loadMemes()

/////////////////////////// set functions  ///////////////////////////

function setImg(imgIdx) {
    gMeme.selectedImgId = imgIdx
}

function setLineTxt(txt) {
    var currLine = getCurrLine()
    currLine.txt = txt
}

/////////////////////////// get functions  ///////////////////////////

function getMeme() {
    return gMeme
}

function getCurrLine() {
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
    return gCurrLine
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

////////////////////////////  draw  /////////////////////////

function drawImg(idx) {
    const img = new Image()
    img.src = `img/${idx}.jpg`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(line, direction = 'center') {
    const y = line.pos.y
    // const x = line.pos.x
    const x = (gElCanvas.width / 2)
    gCtx.lineWidth =
        gCtx.strokeStyle = 'black'
    if (getColor() !== '#ffffff') line.color = getColor()
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = direction
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
    if (gMeme.lines[gMeme.selectedLineIdx] === line)
        addRectOnLine(line.txt)
}

function addRectOnLine(text, download = false) {
    let textWidth = gCtx.measureText(text).width;
    let textHeight = gMeme.lines[gMeme.selectedLineIdx].size + 10
    let rectPadding = 5;
    let rect = {
        x: getgElCanvas().width / 2 - textWidth / 2 - rectPadding,
        y: (gMeme.lines[gMeme.selectedLineIdx].pos.y - (gMeme.lines[gMeme.selectedLineIdx].size / 2) - (rectPadding * 2)),
        width: textWidth + rectPadding * 2,
        height: textHeight + rectPadding * 2
    }
    gCtx.strokeRect(rect.x, rect.y, rect.width, rect.height)
}

////////////////////////////  line tollbar  /////////////////////////

function changeSize(diff) {
    if ((gMeme.lines[gMeme.selectedLineIdx].size < 5) && (diff < 0)) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function changeTextAlign(direction, canvas) {
    gMeme.lines[gMeme.selectedLineIdx]['alignDirection'] = direction
}

function fontChange(newFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = newFont
}

function addLine() {
    gMeme.lines.push({
        txt: 'Enter text',
        size: 40,
        color: 'red',
        pos: { x: 200, y: 40 + (gMeme.lines.length) * 50 },
        font: 'Impact'
    })
    console.log('gLineGap:', gLineGap)
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function moveLine(diff) {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += diff
}

function switchLine(diff) {
    gMeme.selectedLineIdx += diff
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = gMeme.lines.length - 1
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

////////////////////////////  get-pos  /////////////////////////

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function setCurrPos(pos) {
    gDrawing.currX = pos.x
    gDrawing.currY = pos.y
}

function setPrevPos(pos) {
    gDrawing.prevX = pos.x
    gDrawing.prevY = pos.y
}

////////////////////////////  save  /////////////////////////

function saveMeme() {
    gMeme.data = gElCanvas.toDataURL()
    gSavedMemes.push(gMeme)
    saveToStorage(STORAGE_KEY_MEMES, gSavedMemes)
}

function loadMemes() {
    let memes = loadFromStorage(STORAGE_KEY_MY_MEMES)
    if (!memes) memes = []
    return memes
}

function getMyMemes() {
    return gMyMemes
}
