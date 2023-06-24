'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Enter text',
        size: 40,
        color: 'white',
        pos: { x: 200, y: 40 },
        font: 'Impact',
        isChoosen: false,
        alignDirection: 'center',
        isDrag: false
    }]
}

let gCurrImg
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

function editMeme() {
    gMeme = gMyMemes
}

function setMeme(imgIdx) {
    console.log('gMeme[imgIdx]:', gMeme[imgIdx])
    gMeme.selectedLineIdx = imgIdx
    return [gMeme[imgIdx]]
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

/////////////////////////// get functions  ///////////////////////////

function getMeme() {
    return gMeme
}

function getCurrLine() {
    gCurrLine = gMeme.lines[gMeme.selectedLineIdx]
    return gCurrLine
}

/////////////////////////////  draw  ////////////////////////////////////

function drawImg(idx) {
    const img = new Image()
    img.src = `img/${idx}.jpg`
    img.onload = () => {
        getgElCanvas().height = (img.naturalHeight / img.naturalWidth) * getgElCanvas().width
        gCtx.drawImage(img, 0, 0, getgElCanvas().width, getgElCanvas().height)
    }
}

function drawText(line, direction = 'center') {
    const x = line.pos.x
    console.log('x:', x)
    const y = line.pos.y
    // const x = (getgElCanvas().width / 2)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = direction
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(line.txt, x, y) // Draws (strokes) a given text at the given (x, y) position.
    if (gMeme.lines[gMeme.selectedLineIdx] === line)
        addRectOnLine(line.txt)
}

function addRectOnLine(text) {
    let textWidth = gCtx.measureText(text).width
    console.log('textWidth:', textWidth)
    let textHeight = gMeme.lines[gMeme.selectedLineIdx].size + 10
    let rectPadding = 5
    let rect = {
        x: (gMeme.lines[gMeme.selectedLineIdx].pos.x - textWidth / 2 - (rectPadding)),
        y: (gMeme.lines[gMeme.selectedLineIdx].pos.y - (gMeme.lines[gMeme.selectedLineIdx].size / 2) - (rectPadding * 2)),
        width: textWidth + rectPadding * 2,
        height: textHeight + rectPadding * 2
    }
    if (isDownLoad()) {
        rect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    }
    gMeme.lines[gMeme.selectedLineIdx].rect = rect
    // console.log('gMeme.lines[gMeme.selectedLineIdx]:', gMeme.lines[gMeme.selectedLineIdx])
    gCtx.strokeRect(rect.x, rect.y, rect.width, rect.height)
}

function canvasClicked(ev) {
    const { offsetX, offsetY, clientX, clientY } = ev
    let currLine = isLineClicked(offsetX, offsetY)

    gMeme.selectedLineIdx = gMeme.lines.findIndex(line => line === currLine)
    if (currLine) {
        drawText(currLine)
        document.querySelector('.line-input').focus()
        document.querySelector('.line-input').value = getMeme().lines[getMeme().selectedLineIdx].txt
        renderMeme()
    } else {
        console.log('notInLine:')
    }
}

function isLineClicked(offsetX, offsetY) {
    const clickedLine = gMeme.lines.find(line => {
        return offsetX >= line.rect.x && offsetX <= line.rect.x + line.rect.width
            && offsetY >= line.rect.y && offsetY <= line.rect.y + line.rect.height
    })
    // console.log('clickedLine:', clickedLine)
    return clickedLine
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
    // console.log('gMeme.lines[gMeme.selectedLineIdx]:', gMeme.lines[gMeme.selectedLineIdx])
}

////////////////////////////  line tollbar  /////////////////////////

function changeSize(diff) {
    if ((gMeme.lines[gMeme.selectedLineIdx].size < 5) && (diff < 0)) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
}

function changeTextAlign(direction, canvas) {
    let textWidth = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx].txt).width
    let canvasWidth = getgElCanvas().width
    console.log('canvasWidth:', canvasWidth)
    let x
    switch (direction) {
        case ('LTR'):
            x = (textWidth / 2) + 15
            break
        case ('CENTER'):
            x = (canvasWidth / 2)
            break
        case ('RTL'):
            x = canvasWidth - (textWidth / 2) - 15
            break
    }
    moveLineAline(x, 0)
}

function fontChange(newFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = newFont
}

function colorChange(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function addLine() {
    gMeme.lines.push({
        txt: 'Enter text',
        size: 40,
        color: 'white',
        pos: { x: 200, y: 40 + (gMeme.lines.length) * 50 },
        font: 'Impact'
    })
    console.log('gLineGap:', gLineGap)
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function moveLine(dx = 0, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function moveLineAline(x, dy = 0) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = x
}

function switchLine(diff) {
    gMeme.selectedLineIdx += diff
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = gMeme.lines.length - 1
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
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

////////////////////////////  save  /////////////////////////

function saveMeme() {
    gMeme.data = getgElCanvas().toDataURL()
    // console.log('gMeme.data:', gMeme.data)
    gMyMemes.push(gMeme)
    saveToStorage(STORAGE_KEY_MY_MEMES, gMyMemes)
    console.log('gMyMemes:', gMyMemes)
}

function loadMemes() {
    let memes = loadFromStorage(STORAGE_KEY_MY_MEMES)
    if (!memes) {
        memes = []
    }
    console.log('memes:', memes)
    return memes
}

function getMyMemes() {
    return gMyMemes
}

////////////////////////////  random meme  /////////////////////////

// function createRandMeme() {

//     const imgs = getImages()
//     setCurrImage(getRandomIntInclusive(0, imgs.length - 1))

//     const line = gMeme.lines[0]
//     line.txt = getMemeSentence()
//     line.size = getRandomIntInclusive(20, 60)
//     line.color = getRandomColor()

// }
