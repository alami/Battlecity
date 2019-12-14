;(function () {
    'use strict'

    class Body extends GameEngine.Sprite{
        constructor (texture, args = {}) {
            super(texture, args)
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Body = Body
})();