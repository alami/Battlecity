const { Game, Scene, Sprite, Point, Line } = GameEngine

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
        this.point = new Point({
            x: this.sprite.x,
            y: this.sprite.y,
        })
        this.line = new Line({
            x1:0,
            y1:0,
            x2: this.parent.renderer.canvas.width,
            y2: this.parent.renderer.canvas.height,
            color: "yellow",
            width: 2
        })
        this.add(this.sprite, this.point, this.line)
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
    }
})

const game = new Game ({
    el: document.body,
    width: 500,
    height: 500,
    background: 'green',
    scenes: [mainScene]
})