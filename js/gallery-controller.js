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
            <img class="image${i + 1}" src="${img.url}">
        </article>`
    )
    const elImg = document.querySelector('.gallery-imgs')
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
