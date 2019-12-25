const DEBUG_MODE = true

const { Game, Scene, Sprite, Body, Util, ArcadePhysics } = GameEngine

const game = new Game ({
    el: document.body,
    width: 650,
    height: 650,
    background: 'black',
    scenes: [
        new Intro ({autoStart: false,}),
        new Party ({autoStart: true,})
    ]
})