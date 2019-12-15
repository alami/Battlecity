const { Game, Scene, Body, Container, Util } = GameEngine

let n = 1

const mainScene = new Scene ({
    name: 'mainScene',
    autoStart: true,
    loading (loader) {
        loader.addImage('man', 'static/man.png')
        loader.addJson('manAtlas', 'static/manAtlas.json')
    },
    init () {
        const manTexture = this.parent.loader.getImage('man')
        const manAtlas = this.parent.loader.getJson('manAtlas')
        console.log(manAtlas)

        this.man = new Body(manTexture, {
            scale: 1,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height /2,
            //debug: true,
            body: {
                x:0,y:0.5,width:1, height:0.5
            }
        })

        this.setFramesCollection (manAtlas.frames)
        this.setAnimationsCollection (manAtlas.actions)


            this.man.setFrameByKeys('man', 'down','frame1')
        this.man.width = this.man.frame.width
        this.man.height = this.man.frame.height

        this.add( this.man )
    },

    beforeDestroy () {
        delete this.sprite
    },

    update (timestamp) {
        const { keyboard } = this.parent

        if (Util.delay('manFrameUpdate', 150)) {
            n = n % 4 + 1
            this.man.setFrameByKeys('man', 'down','frame'+n)
        }

        this.man.velocity.x = 0
        this.man.velocity.y = 0
        if (keyboard.arrowUp) {
            this.man.velocity.y = -5
        }
        if (keyboard.arrowDown) {
            this.man.velocity.y = 5
        }

    }
})

const game = new Game ({
    el: document.body,
    width: 500,
    height: 500,
    background: 'white',
    scenes: [mainScene]
})