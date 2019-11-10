;(function () {
    'use strict'
    class Container extends GameEngine.DisplayObject{
        constructor (args={}) {
            super(args)
            this.displayObjects = []

            delete this.width
            delete this.height
        }
        add (displayObject) {
            if (!this.displayObjects.includes(displayObject))
              this.displayObjects.push(displayObject)
        }
        remove () {}
        draw (canvas, context) {
            context.save()
            context.translate (this.x, this.y)
            context.rotate (this.rotation)
            context.scale (this.scaleX, this.scaleY )

            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas,context)
            }
            context.restore()
        }

        }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Container = Container
})();