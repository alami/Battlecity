const { Game, Scene, Body, ArcadePhysics } = GameEngine

let n = 1

const mainScene = new Scene ({
    name: 'mainScene',
    autoStart: true,
    loading (loader) {
        loader.addImage('man', 'static/man.png')
        loader.addJson('manAtlas', 'static/manAtlas.json')
    },
    init () {
        Man.texture = this.parent.loader.getImage('man')
        Man.atlas = this.parent.loader.getJson('manAtlas')

        this.arcadePhysics = new ArcadePhysics

        this.man1 = new Man({
            x: this.parent.renderer.canvas.width / 2 - 100,
            y: this.parent.renderer.canvas.height / 2,
        })
        this.man2 = new Man({
            x: this.parent.renderer.canvas.width / 2 + 100,
            y: this.parent.renderer.canvas.height / 2,
        })
        this.add( this.man1, this.man2)
        this.arcadePhysics.add( this.man1, this.man2 )
    },

    update (timestamp) {
        const { keyboard } = this.parent

        this.man1.velocity.x = 0
        this.man1.velocity.y = 0
        this.man2.velocity.x = 0
        this.man2.velocity.y = 0

        if (keyboard.arrowUp) {
            this.man1.velocity.y = -2
            if (this.man1.animation !== 'moveUp') {
                this.man1.startAnimation('moveUp')
            }
        }
        else if (keyboard.arrowDown) {
            this.man1.velocity.y = 2
            if (this.man1.animation !== 'moveDown') {
                this.man1.startAnimation('moveDown')
            }
        }
        else if (keyboard.arrowLeft) {
            this.man1.velocity.x = -2
            if (this.man1.animation !== 'moveLeft') {
                this.man1.startAnimation('moveLeft')
            }
        }
        else if (keyboard.arrowRight) {
            this.man1.velocity.x = 2
            if (this.man1.animation !== 'moveRight') {
                this.man1.startAnimation('moveRight')
            }
        }
        else if (this.man1.animation === 'moveDown') {
            this.man1.startAnimation('stayDown')
        }
        this.arcadePhysics.processing()
    },
    /*beforeDestroy () {
        delete this.sprite
    },*/
})

const game = new Game ({
    el: document.body,
    width: 500,
    height: 500,
    background: 'grey',
    scenes: [mainScene]
})