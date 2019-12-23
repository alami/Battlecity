class Intro extends GameEngine.Scene {
    constructor (args = {}) {
        super ({
            name: 'introScene',
            ...args
        })
    }
    loading(loader) {
        loader.addImage('intro','static/Intro.png')
        loader.addSound('intro', 'static/sound/stage_start.ogg')
    }
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
            duration: 500,
            processer (target, percent, context) {
                if (percent === 0) {
                    context.y = target.y
                    loader.getSound('intro').play()
                }
                //console.log(percent)
                target.y = target.y*(1-percent)
            }
        })

        this.parent.startScene('party')
        this.parent.finishScene(this)
    }
    update (timestamp) {
        const { keyboard } = this.parent

        if (keyboard.space && Util.delay('introSpace', 150)) {
            if (this.imageTweenStopper && this.image.y !== 0) {
                this.imageTweenStopper()
                delete this.imageTweenStopper
                this.image.y = 0
            }

            else if (keyboard.space) {
                this.parent.startScene('party')
                this.parent.finishScene(this)
            }
        }
    }
}