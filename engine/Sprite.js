;(function () {
    'use strict'

    class Sprite extends GameEngine.DisplayObject{
        constructor (texture, args = {}) {
            super(args)
            const frame = args.frame || {}

            this.texture = texture

            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width:  frame.width  || texture.width,
                height: frame.height || texture.height
            }

            this.width = args.width || this.frame.width //иначе не видно картинку
            this.height = args.height || this.frame.height

        }
        draw (canvas, context) {
            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y ,
                this.frame.height,
                this.frame.height,
                this.absoluteX,
                this.absoluteY ,
                this.width * this.scaleX,
                this.height * this.scaleY
              )
            }
        }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Sprite = Sprite
})();