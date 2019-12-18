class Man extends GameEngine.Body{
    constructor(originalArgs = {}) {
        const args = Object.assign({
            scale: 1,
            anchorX: 0.5,
            anchorY: 0.5,
            debug: true,
            body: {
                x:0,y:0.5,width:1, height:0.5
            }
        }, originalArgs)
        super(Man.texture, args);

        this.setFramesCollection (Man.atlas.frames)
        this.setAnimationsCollection (Man.atlas.actions)
        this.startAnimation('stayDown') // moveLeft moveRight moveUp
    }
}
Man.tecture = null
Man.atlas = null