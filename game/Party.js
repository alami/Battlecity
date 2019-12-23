class Party extends GameEngine.Scene {
    constructor (args = {}) {
        super ({
            name: 'party',
            ...args
        })
    }
    loading() {
        console.log('party fired')
    }
    init() {

    }
    update () {

    }
}