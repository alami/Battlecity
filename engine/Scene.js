;(function () {
    'use strict'
    class Scene extends GameEngine.Container{
        constructor (args = {}) {
            super();
            this.autoStart = args.autoStart | false
            this.stage = this.displayObjects
            if (args.loading) {
                this.loading = args.loading.bind(this)
            }
            if (args.init) {
                this.init = args.init.bind(this)
            }
            if (args.update) {
                this.update = args.update.bind(this)
            }
        }
        loading () {}
        init () {}
        update () {}
    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Scene = Scene
})();
