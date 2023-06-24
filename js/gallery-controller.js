'use strict'

////////////////////////////////////  init  //////////////////////////////////

function onInit() {
    renderGallery()
    onDisplayCurrPage('.main-gallery')
}

//////////////////////////////////  render  ////////////////////////////////

function renderGallery() {
    const imgs = getGalleryImages()
    const strHTMLs = imgs.map((img, i) =>
        `<article class="img" onclick="onImgSelect(${i + 1})">
            <img class="img${i + 1}" src="${img.url}">
        </article>`
    )
    const elImg = document.querySelector('.gallery-imgs')
    console.log('elImg:', elImg)
    elImg.innerHTML = strHTMLs.join('')
}

function renderSavedMemes() {
    const memes = getMyMemes()
    const strHTMLs = memes.map((meme, i) =>
        `<article class="img" onclick="onEditMeme(${i})">
            <img class="img${i}" src="${meme.data}">
        </article>`
    )
    console.log('2:')
    const elImg = document.querySelector('.gallery-my-memes')
    console.log('elImg:', elImg)
    elImg.innerHTML = strHTMLs.join('')
}

//////////////////////////////////  on function  ////////////////////////////////

function onImgSelect(imgIdx) {
    setImg(imgIdx)
    onInitMeme()
    onDisplayCurrPage('.main-meme-editor')
}

function onDisplayCurrPage(currSectionClass) {
    document.querySelectorAll('.main-section').forEach(elMainSection => {
        elMainSection.classList.add('none')
    })
    document.querySelector(`${currSectionClass}`).classList.remove('none')
}

function onMemeSelect() {
    onInitMeme()
    onDisplayCurrPage('.main-meme-editor')
}

function onFlexible() {

}
////////////////////////////////  on edit  ////////////////////////////////

// function onEditMeme(memeIdx) {
//     editMeme()
//     setMeme(memeIdx)

//     renderMeme()
//     onDisplayCurrPage('.main-meme-editor')
// }



