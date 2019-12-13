;(function () {
    'use strict'

    class Keyboard {
        constructor() {
            const keyboard = this
            this.arrowUp = false
            this.arrowDown = false
            this.arrowLeft = false
            this.arrowRight = false
            document.body.addEventListener('keydown', function (event) {
                // console.log(event)
                switch (event.code) {
                    case "ArrowUp":
                        keyboard.arrowUp = true
                        break
                    case "ArrowDown":
                        keyboard.arrowDown = true
                        break
                    case "ArrowLeft":
                        keyboard.arrowLeft = true
                        break
                    case "ArrowRight":
                        keyboard.arrowRight = true
                        break
                    case "Space":
                        keyboard.space = true
                        break
                }
            })
            document.body.addEventListener('keyup', function (event) {
                // console.log(event)
                switch (event.code) {
                    case "ArrowUp":
                        keyboard.arrowUp = false
                        break
                    case "ArrowDown":
                        keyboard.arrowDown = false
                        break
                    case "ArrowLeft":
                        keyboard.arrowLeft = false
                        break
                    case "ArrowRight":
                        keyboard.arrowRight = false
                        break
                    case "Space":
                        keyboard.space = false
                        break
                }
            })
        }

    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Keyboard = Keyboard
})();