class Tank extends GameEngine.Body {
    constructor(originalArgs = {}) {
        const args = Object.assign({
            scale: 3.5,
            keysDeault: ['gray', 'type1'],
            debug: DEBUG_MODE,
        }, originalArgs)

        super(Tank.texture, args);

        this.bullets = []

        this.setFramesCollection(Tank.atlas.frames)
        this.setAnimationsCollection(Tank.atlas.actions)
        this.startAnimation('moveUp') // moveLeft moveRight moveUp

        this.on('collision', a => {
            if (a instanceof Bullet) {
                if (this.bullets.includes(a)) {
                    return
                }
                else {
                    this.scene.arcadePhysics.remove(this)
                    this.scene.remove(this)
                }
            }
            this.velocity.x = 0
            this.velocity.y = 0
        })
    }
    movementUpdate(keyboard) {
        const sd = x => this.setDirect(x, keyboard.space)
        if (keyboard.arrowUp) {
            sd('up') //this.setDirect('up', keyboard.space)
        }
        else if (keyboard.arrowLeft) {
            sd('left') //this.setDirect('left', keyboard.space)
        }
        else if (keyboard.arrowRight) {
            sd('right') //this.setDirect('right', keyboard.space)
        }
        else if (keyboard.arrowDown) {
            sd('down') //this.setDirect('down', keyboard.space)
        }
        else {
            this.setDirect(null, keyboard.space)
        }
    }

    setDirect (direct, fireCommand) {
        this.velocity.x = 0
        this.velocity.y = 0

        if (this.animationPaused) {
            this.resumeAnimation ()
        }

        if (direct === 'left') {
            this.velocity.x = -Tank.NORMAL_SPEED
            if (this.animation !== 'moveLeft') {
                this.startAnimation('moveLeft')
            }
        }
        else if (direct === 'right') {
            this.velocity.x = Tank.NORMAL_SPEED
            if (this.animation !== 'moveRight') {
                this.startAnimation('moveRight')
            }
        }
        else if (direct === 'down') {
            this.velocity.y = Tank.NORMAL_SPEED
            if (this.animation !== 'moveDown') {
                this.startAnimation('moveDown')
            }
        }
        else if (direct === 'up') {
            this.velocity.y = -Tank.NORMAL_SPEED
            if (this.animation !== 'moveUp') {
                this.startAnimation('moveUp')
            }
        }
        else  {
            this.pauseAnimation ()
        }
        if (fireCommand && Util.delay('tank'+this.uid, Tank.BULLET_TIMEOUT)) {
            const bullet = new Bullet({ //выстрел
                debug: DEBUG_MODE,
                x: this.centerX,
                y: this.centerY
            })
            this.bullets.push(bullet)
            bullet.tank = this

            if (this.animation === "moveUp") {
                bullet.velocity.y = -Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'up')
            }
            else if (this.animation === "moveLeft") {
                bullet.velocity.x = -Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'left')
            }
            else if (this.animation === "moveRight") {
                bullet.velocity.x = Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'right')
            }
            else if (this.animation === "moveDown") {
                bullet.velocity.y = Bullet.NORMAL_SPEED
                bullet.setFrameByKeys('bullet', 'down')
            }
            const scene = Util.getScene(this)
            scene.add(bullet)
            scene.arcadePhysics.add(bullet)
        }
    }
}

Tank.texture = null
Tank.atlas = null

Tank.NORMAL_SPEED = 2
Tank.BULLET_TIMEOUT =250