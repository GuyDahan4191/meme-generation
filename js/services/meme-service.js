'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 40,
        color: 'red',
        pos: { x: 200, y: 20 },
        font: 'Impact'
    }]
}
let gLineGap = (gMeme.lines.length) * 50
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

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
    return gMeme.lines[gMeme.selectedLineIdx]
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

function drawImg(idx,) {
    const img = new Image()
    img.src = `img/${idx}.jpg`
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(line, direction = 'center') {
    console.log('line.txt:', line.txt)
    console.log('line.size:', line.size)
    console.log('line.color:', line.color)
    console.log('gCtx:', gCtx)
    const y = 20
    const x = (gElCanvas.width / 2)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    if (getColor() !== '#ffffff') line.color = getColor()
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = direction
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

////////////////////////////  line tollbar  /////////////////////////

function changeSize(diff) {
    if ((gMeme.lines[0].size < 5) && (diff < 0)) return
    gMeme.lines[0].size += diff
}

function changeTextAlign(direction, canvas) {
    const currLine = getCurrLine()
    console.log('currLine:', currLine)
    currLine.align = direction
    if (direction === 'RTL') currLine.pos.x = canvas.width - 20
    if (direction === 'CENTER') currLine.pos.x = canvas.width / 2
    if (direction === 'LTR') currLine.pos.x = 20
    console.log('canvas.width:', canvas.width)
}

function fontChange(newFont) {
    gMeme.lines[0].font = newFont
}

function addLine() {
    gMeme.lines.push({
        txt: 'Enter text',
        size: 40,
        color: 'red',
        pos: { x: 200, y: 20 + gLineGap },
        font: 'Impact'
    })
    console.log('gLineGap:', gLineGap)
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