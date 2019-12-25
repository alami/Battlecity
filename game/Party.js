class Party extends GameEngine.Scene {
    constructor (args = {}) {
        super ({
            name: 'party',
            ...args
        })

        this.enemies = new Set

    }
    loading(loader) {
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addJson('atlas', 'static/atlas.json')
        loader.addJson('map', 'static/map1.json')
        loader.addJson('party', 'static/party.json')

        console.log('party fired')
    }
    init() {
        const {loader, renderer: {canvas: {width, height} } } = this.parent

        Bullet.texture = Topology.texture = Tank.texture = loader.getImage('spriteSheet')
        Bullet.atlas   = Topology.atlas   = Tank.atlas   = loader.getJson('atlas')

        this.partyData = loader.getJson('party')

        this.arcadePhysics = new GameEngine.ArcadePhysics

        this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: width + 20,
            height: 9
        }))
        this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: 9,
            height: height + 20,
        }))
        this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: height,
            y: -10,
            width: 9,
            height: height + 20
        }))
        this.arcadePhysics.add( new  Body(null, {
            static: true,
            x: -10,
            y: width,
            width: width + 20,
            height: 9,
        }))

        this.topology = new Topology(loader.getJson('map'))
        this.add(this.topology)
        this.arcadePhysics.add(...this.topology.displayObjects)

        const [ x, y ] = this.topology.getCoordinates('tank1',true)
        this.mainTank = new Tank({
            x: x * this.topology.size,
            y: y * this.topology.size,
        })
        this.add(this.mainTank)
        this.arcadePhysics.add( this.mainTank )

        if (this.topology.eagle) {
            this.topology.eagle.on('collision', a => {
                if (a instanceof Bullet) {
                    this.game.startScene('resultScene')
                    this.game.finishScene(this)
                }
            })
        }

    }
    update () {
        const {keyboard} = this.parent
        const enemyTankForRedirect = []

        this.mainTank.movementUpdate(keyboard)

        this.arcadePhysics.processing()

        if (this.enemies.size < this.partyData.enemy.simultaneously
            && Util.delay(this.uid + 'enemyGeneration', this.partyData.enemy.spawnDelay)
        ) {
            const [x,y] = this.topology.getCoordinates('enemy')
            const enemyTank = new Tank({
                x: x * this.topology.size,
                y: y * this.topology.size,
            })
            this.enemies.add(enemyTank)
            this.add(enemyTank)
            this.arcadePhysics.add(enemyTank)

            enemyTank.setDirect('down')

            /*enemyTank.on('collision', (a, b) => {
                if (a.isBrick) {
                    enemyTankForRedirect.add(b)
                }
            })*/
        }
        for (const enemyTank of this.enemies) {
            // enemyTank.setDirect(enemyTank.direct)
        }

        for (const object of this.arcadePhysics.objects) {
            if (object instanceof Bullet && object.toDestroy) {
                object.destroy()
            }
        }
        /*for (const enemyTank of enemyTankForRedirect) {
            enemyTank.direct = Util.getRandomFrom ('up','left','right','down')
        }*/
    }
}