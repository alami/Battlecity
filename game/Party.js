class Party extends GameEngine.Scene {
    constructor (args = {}) {
        super ({
            name: 'party',
            ...args
        })

    }
    loading(loader) {
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addJson('atlas', 'static/atlas.json')
        loader.addJson('map', 'static/map1.json')

        console.log('party fired')
    }
    init() {
        const {loader, renderer: {canvas: {width, height} } } = this.parent

        Bullet.texture = Topology.texture = Tank.texture = loader.getImage('spriteSheet')
        Bullet.atlas   = Topology.atlas   = Tank.atlas   = loader.getJson('atlas')

        this.arcadePhysics = new GameEngine.ArcadePhysics

        /*this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: width + 20,
            height: 10
        }))
        this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: 10,
            height: height + 20,
        }))*/

        this.topology = new Topology(loader.getJson('map'))
        this.add(this.topology)
        this.arcadePhysics.add(...this.topology.displayObjects)

        this.mainTank = new Tank()
        this.add(this.mainTank)
        this.arcadePhysics.add( this.mainTank )

    }
    update () {
        const {keyboard} = this.parent
        this.mainTank.movementUpdate(keyboard)

        this.arcadePhysics.processing()

        for (const object of this.arcadePhysics.objects) {
            if (object instanceof Bullet && object.toDestroy) {
                object.destroy()
            }
        }
    }
}