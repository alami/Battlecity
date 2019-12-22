const DEBUG_MODE = true

const { Game, Scene, Util, ArcadePhysics } = GameEngine

let n = 1

const mainScene = new Scene ({
    name: 'mainScene',
    autoStart: true,
    loading (loader) {
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addJson('atlas', 'static/atlas.json')
    },
    init () {
        Tank.texture = this.parent.loader.getImage('spriteSheet')
        Tank.atlas = this.parent.loader.getJson('atlas')

        Bullet.texture = this.parent.loader.getImage('spriteSheet')
        Bullet.atlas = this.parent.loader.getJson('atlas')

        this.arcadePhysics = new ArcadePhysics

        this.tank1 =  new Tank({
            debug: DEBUG_MODE,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
        })
        this.tank2 =  new Tank({
            debug: DEBUG_MODE,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2 + 100,
        })

        this.add( this.tank1, this.tank2)
        // this.arcadePhysics.add( this.tank1,this.tank2 )
    },
    update () {
        const {keyboard} = this.parent
        this.tank1.movementUpdate(keyboard)

        if (keyboard.space && Util.delay('tank'+this.tank1.uid, Tank.BULLET_TIMEOUT)) {
            const bullet = new Bullet({ //выстрел
                debug: DEBUG_MODE,
                x: this.tank1.x,
                y: this.tank1.y
            })

            this.tank1.bullets.push(bullet)
            bullet.tank = this.tank1

            if (this.tank1.animation === "moveUp") {
                bullet.velocity.y -= Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'up')
            }
            this.add(bullet)
            //this.arcadePhysics.add(bullet)
        }

        this.arcadePhysics.processing()
    },

        /*init () {
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
        },*/
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