'use strict'

////////////////////////////////////  init  //////////////////////////////////

function onInit() {
    renderGallery()
}

//////////////////////////////////  render  ////////////////////////////////

function renderGallery() {
    const imgs = getGalleryImages()
    const strHTMLs = imgs.map((img, i) =>
        `<article class="img" onclick="onImgSelect(${i})">
            <img class="image${i}" src="${img.url}">
        </article>`
    )
    const elImg = document.querySelector('.gallery-imgs')
    elImg.innerHTML = strHTMLs.join('')
}

//////////////////////////////////  on function  ////////////////////////////////

function onImgSelect(imgIdx) {
    setCurrImage(imgIdx)
    onInitMeme()
    resizeCanvas(imgIdx)
}

