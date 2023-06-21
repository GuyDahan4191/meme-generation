'use strict'

const IMGS_KEY = 'imgsDB'
var gFilterTxt = ''
var gImgs = [
    { id: 1, url: `img/1.jpg`, keyWords: ['politician', 'expression', 'funny'] },
    { id: 2, url: `img/2.jpg`, keyWords: ['cute', 'animals', 'dog'] },
    { id: 3, url: `img/3.jpg`, keyWords: ['cute', 'baby', 'animals', 'dog'] },
    { id: 4, url: `img/4.jpg`, keyWords: ['animals', 'cat', 'cute'] },
    { id: 5, url: `img/5.jpg`, keyWords: ['baby', 'expression', 'funny'] },
    { id: 6, url: `img/6.jpg`, keyWords: ['expression', 'funny'] },
    { id: 7, url: `img/7.jpg`, keyWords: ['baby', 'expression', 'funny'] },
    { id: 8, url: `img/8.jpg`, keyWords: ['movie', 'funny'] },
    { id: 9, url: `img/9.jpg`, keyWords: ['baby', 'funny', 'laughter'] },
    { id: 10, url: `img/10.jpg`, keyWords: ['politician', 'funny', 'laughter'] },
    { id: 11, url: `img/11.jpg`, keyWords: ['funny', 'serious'] },
    { id: 12, url: `img/12.jpg`, keyWords: ['serious', 'nerd'] },
    { id: 13, url: `img/13.jpg`, keyWords: ['movie', 'laughter'] },
    { id: 14, url: `img/14.jpg`, keyWords: ['movie', 'serious'] },
    { id: 15, url: `img/15.jpg`, keyWords: ['movie', 'serious'] },
    { id: 16, url: `img/16.jpg`, keyWords: ['movie', 'laughter'] },
    { id: 17, url: `img/17.jpg`, keyWords: ['politician', 'serious'] },
    { id: 18, url: `img/18.jpg`, keyWords: ['movie', 'serious'] },
]

/////////////////////////// get functions  ///////////////////////////

function getGalleryImages() {
    return gImgs
}