;(function () {
    'use strict'

    class Renderer {
        constructor (args = {}) {
            this.canvas = document.createElement('canvas')
            this.context = this.canvas.getContext('2d')

            this.canvas.width = args.width || 50
            this.canvas.height = args.height ||50
            this.update = args.update || (() => {})

            requestAnimationFrame(timestamp => this.tick())
        }
        tick (timestamp) {
            this.update(timestamp)
            requestAnimationFrame(timestamp => this.tick())
            //console.log('tick')
        }
    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Renderer = Renderer
})();