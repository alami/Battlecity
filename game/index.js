const DEBUG_MODE = true

const { Game, Scene, Sprite, Body, Util, ArcadePhysics } = GameEngine

let n = 1

const mainScene = new Scene ({
    name: 'mainScene',
    // autoStart: true,
    loading (loader) {
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addJson('atlas', 'static/atlas.json')
        loader.addSound('start', 'static/sound/stage_start.ogg')
    },
    init () {
        const startSound =  this.parent.loader.getSound('start')
        //console.log(startSound === game.loader.resources.sounds.start)
        //startSound.play()//.then().catch(error => {})

        Tank.texture = this.parent.loader.getImage('spriteSheet')
        Tank.atlas = this.parent.loader.getJson('atlas')

        Bullet.texture = this.parent.loader.getImage('spriteSheet')
        Bullet.atlas = this.parent.loader.getJson('atlas')

        this.arcadePhysics = new ArcadePhysics

        this.tank1 =  new Tank({
            debug: DEBUG_MODE,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2 + 100,
        })
        this.tank2 =  new Tank({
            debug: DEBUG_MODE,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
        })

        this.add( this.tank1, this.tank2)
        this.arcadePhysics.add( this.tank1,this.tank2 )

        this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: this.parent.renderer.canvas.width +20,
            height: 10
        }))
        this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: 10,
            height: this.parent.renderer.canvas.height +20,

        }))
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
            this.arcadePhysics.add(bullet)
        }

        this.arcadePhysics.processing()
        for (const tank of [this.tank1, this.tank2]) {
            for (const bullet of tank.bullets) {
                if (bullet.toDestroy) {
                    bullet.destroy()
                }
            }

        }
    }

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

const intro = new Intro ({
    autoStart: true,
    name: 'introScene',
    loading(loader) {
        loader.addImage('intro','static/Intro.png')
    },
    init() {
        const {loader} = this.parent
        this.image = new Sprite (loader.getImage('intro'), {
            x: 0,
            y: this.parent.renderer.canvas.height,
            width: this.parent.renderer.canvas.width,
            height: this.parent.renderer.canvas.height,
        })
        this.add(this.image)

        this.imageTweenStopper = Util.tween({
            target: this.image,
            duration: 1000,
            processer (target, percent, context) {
                if (percent === 0) {
                  context.y = target.y
                  }
                //console.log(percent)
                target.y = target.y*(1-percent)
                }
            })
        },
    update (timestamp) {

    }
})

const game = new Game ({
    el: document.body,
    width: 500,
    height: 500,
    background: 'grey',
    scenes: [intro, mainScene]
})