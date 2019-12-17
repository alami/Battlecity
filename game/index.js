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
        //console.log(manAtlas)

        this.man = new Body(manTexture, {
            scale: 1,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height /2,
            debug: true,
            body: {
                x:0,y:0.5,width:1, height:0.5
            }
        })
        this.man.on('frameChange', man => {
            console.log('frameChange')
        })

        this.man.setFramesCollection (manAtlas.frames)
        this.man.setAnimationsCollection (manAtlas.actions)
        this.man.startAnimation('stayDown') // moveLeft moveRight moveUp

        this.add( this.man )
    },

    update (timestamp) {
        const { keyboard } = this.parent

        this.man.velocity.x = 0
        this.man.velocity.y = 0

        if (keyboard.arrowUp) {
            this.man.velocity.y = -2
            if (this.man.animation !== 'moveUp') {
                this.man.startAnimation('moveUp')
            }
        }
        else if (keyboard.arrowDown) {
            this.man.velocity.y = 2
            if (this.man.animation !== 'moveDown') {
                this.man.startAnimation('moveDown')
            }
        }
        else if (keyboard.arrowLeft) {
            this.man.velocity.x = -2
            if (this.man.animation !== 'moveLeft') {
                this.man.startAnimation('moveLeft')
            }
        }
        else if (keyboard.arrowRight) {
            this.man.velocity.x = 2
            if (this.man.animation !== 'moveRight') {
                this.man.startAnimation('moveRight')
            }
        }
        else if (this.man.animation === 'moveDown') {
            this.man.startAnimation('stayDown')
        }
    },
    beforeDestroy () {
        delete this.sprite
    },
})

const game = new Game ({
    el: document.body,
    width: 500,
    height: 500,
    background: 'white',
    scenes: [mainScene]
})