;(function () {
    'use strict'

    class ArcadePhysics {
        constructor() {
            this.objects = new Set
        }
        add(...objects) {
            for (const object of objects) {
                this.objects.add(object)
            }
        }
        remove(...objects) {
            for (const object of objects) {
                this.objects.delete(object)
            }
        }
        processing () {
            const objects = Array.from(this.objects)
            for (let i = 0; i < objects.length-1; i++) {
                for (let j = i+1; j < objects.length; j++) {
                    const a=objects[i]
                    const b=objects[j]
                }
            }
        }
    }
    window.GameEngine = window.GameEngine || {}
    window.GameEngine.ArcadePhysics = ArcadePhysics
})();