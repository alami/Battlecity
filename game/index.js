const { Game, Scene, Sprite } = GameEngine

const mainScene = new Scene ({
    autoStart: true,
    loading (loader) {
        loader.addImage('bunny', 'static/bunny.jpg')
        loader.addJson('persons', 'static/persons.json')
    },
    init () {
        const bunnyTexture = this.parent.loader.getImage('bunny')
        this.sprite = new Sprite(bunnyTexture, {
            scale: 0.25,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height /2,
        })
        this.add(this.sprite)
    },
    update (timestamp) {
        this.sprite.rotation = timestamp / 1000
    }
})
const mainScene2 = new Scene ({
    autoStart: true,
    loading (loader) {
        loader.addImage('bunny', 'static/bunny.jpg')
        loader.addJson('persons', 'static/persons.json')
    },
    init () {
        const bunnyTexture = this.parent.loader.getImage('bunny')
        this.sprite = new Sprite(bunnyTexture, {
            scale: 0.25,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height /2,
        })
        this.add(this.sprite)
    },
    update (timestamp) {
        this.sprite.rotation = -timestamp / 1000
    }
})

const game = new Game ({
    el: document.body,
    width: 500,
    height: 500,
    background: 'green',
    scenes: [mainScene, mainScene2]
})