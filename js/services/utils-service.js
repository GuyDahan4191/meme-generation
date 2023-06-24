'use strict'

function typing() {
    var text = "This app was build by Guy Dahan in 2 days on 0 sleeping hours. \nViva la Sprint"
    var delay = 100 // Delay between each character in milliseconds

    var index = 0
    var typingText = document.getElementById('typing-text')

    function typeText() {
        if (index < text.length) {
            typingText.innerHTML += text.charAt(index)
            index++;
        } else {
            clearInterval(typingInterval)
        }
    }

    var typingInterval = setInterval(typeText, delay)
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}