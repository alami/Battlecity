;(function () {
    'use strict'

    class Line extends GameEngine.DisplayObject{
        constructor(args = {}) {
            super(args);
            this.color = args.color || 'red'
            this.width = args.width || 1
            this.x1 = args.x1 !== undefined ? args.x1 : 0 // || 0
            this.y1 = args.y1 !== undefined ? args.y1 : 0
            this.x2 = args.x2 !== undefined ? args.x2 : 0
            this.y2 = args.y2 !== undefined ? args.y2 : 0
        }
        draw (canvas, context) {
            context.strokeStyle = this.color
            context.strokeWidth = this.width
            context.beginPath()
            context.moveTo(this.x1, this.y1)
            context.lineTo(this.x2, this.y2)
            context.stroke()
        }
    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Line = Line
})();