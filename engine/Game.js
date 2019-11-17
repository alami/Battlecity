;(function () {
    'use strict'
    class Game {
        constructor (args = {}) {
            this.renderer = new GameEngine.Renderer(args)
            this.loader = new GameEngine.Loader()
            this.scenesCollection = new GameEngine.Container()

            if (args.scenes) {
                this.addScene(...args.scenes)
            }
            if (args.el && args.el.appendChild) {
                args.el.appendChild(this.renderer.canvas)
            }
            const autoStartedScenes = this.scenes.filter(x => x.autoStart)
            for (const scene of autoStartedScenes) {
                    scene.loading(this.loader)
            }
            this.loader.load(() => {
                for (const scene of autoStartedScenes) {
                    scene.init()
                }
            })
            requestAnimationFrame(timestamp => this.tick(timestamp))

        }
        addScene (...scenes) {
            this.scenesCollection.add(...scenes)
            for (const scene of scenes) {
                scene.parent = this // (эта игра)
            }
        }
        get scenes () {
            return  this.scenesCollection.displayObjects
        }
        tick (timestamp) {
            //this.update(timestamp)
            this.renderer.clear()
            //this.renderer.render()

            requestAnimationFrame(timestamp => this.tick(timestamp))
        }
    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Game = Game
})();
