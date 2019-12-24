class Topology extends GameEngine.Container {
    constructor(args={}) {
        super({args});

        this.map = args.map || [[]]
        this.size = args.fieldSize || 20

        for (let y=0; y < this.map.length; y++) {
            for (let x=0; x < this.map[y].length; x++) {
                const field = this.map[y][x]
                if (!field) {
                    continue
                }
                if (field === 'brick') {
                    for (let dx=0; dx<=1; dx++) {
                        for (let dy=0; dy<=1; dy++) {
                            const body = new GameEngine.Body(Topology.texture, {
                                debug: DEBUG_MODE,
                                static: true,
                                anchorX: dx,
                                anchorY: dy,
                            })

                            body.setFramesCollection(Topology.atlas.frames)
                            body.setFrameByKeys("brick", "wall")

                            body.width = this.size / 2
                            body.height = this.size / 2

                            body.x = x * this.size + this.size / 2
                            body.y = y * this.size + this.size / 2

                            this.add(body)
                        }
                    }
                }
            }
        }
    }
}

Topology.texture = null
Topology.atlas = null