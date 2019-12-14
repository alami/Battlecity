const { Game, Scene, Sprite, Point, Line, Container } = GameEngine

const mainScene = new Scene ({
    name: 'mainScene',
    //autoStart: true,
    loading (loader) {
        loader.addImage('bunny', 'static/bunny.jpg')
        loader.addJson('persons', 'static/persons.json')
    },
    init () {
        const bunnyTexture = this.parent.loader.getImage('bunny')
        const graphicContainer = new Container()
        this.sprite = new Sprite(bunnyTexture, {
            scale: 0.25,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height /2,
        })
        const point = new Point({
            x: this.sprite.x,
            y: this.sprite.y,
        })
        const line = new Line({
            x1:0,
            y1:0,
            x2: this.parent.renderer.canvas.width,
            y2: this.parent.renderer.canvas.height,
            color: "yellow",
            width: 2
        })
        graphicContainer.add(point, line)
        this.add( this.sprite )
        this.add( graphicContainer )
    },

    beforeDestroy () {
        delete this.sprite
    },

    update (timestamp) {
        const { keyboard } = this.parent
            //this.sprite.rotation = timestamp / 1000
        let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200
        if (keyboard.arrowUp) {
            //this.sprite.y -= 1
            this.sprite.rotation += speedRotation // Math.PI / 100  //1
        }
        if (keyboard.arrowDown) {
            this.sprite.rotation -= speedRotation // Math.PI / 100
        }
        if (timestamp > 5000) {
            this.parent.finishScene(this)
        }
    }
})

const game = new Game ({
    el: document.body,
    width: 500,
    height: 500,
    background: 'green',
    scenes: [mainScene]
})