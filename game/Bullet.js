class Bullet extends GameEngine.Body{
    constructor(originalArgs = {}) {
        const args = Object.assign({
            anchorX: 0.5,
            anchorY: 0.5,
        }, originalArgs)

        super(Bullet.texture, args);

        this.tank = null

        this.setFramesCollection (Bullet.atlas.frames)
        this.setAnimationsCollection (Bullet.atlas.actions)
        this.startAnimation('moveUp')

        this.on('collision', (a, b) => {
            if (b === this.tank) {
                return
            }
            a.velocity.x = 0
            a.velocity.y = 0
        })
    }
    destroy () {
        Util.removeElements(this.tank.bullets, this)

        delete this.tank

        const  scene = Util.getScene(this)
        scene.remove(bullet)
        scene.arcadePhysics.remove(bullet)
    }

}
Bullet.texture = null
Bullet.atlas = null

Bullet.NORMAL_SPEED = 5