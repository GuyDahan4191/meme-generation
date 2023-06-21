'use strict'

let gElCanvas = {}
let gCtx

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

////////////////////////////////  ev-colors  ////////////////////////////////

// function onPickFillColor(color) {
//     gCurrColors.fill = color
// }

// function onPickStrokeColor(color) {
//     gCurrColors.stroke = color
// }

// function getColor() {
//     return gCurrColors
// }

////////////////////////////////  canvas  ////////////////////////////////

function setCanvas() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}