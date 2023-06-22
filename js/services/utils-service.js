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