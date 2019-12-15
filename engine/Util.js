;(function () {
    'use strict'

    const delayCollection = {}

    const Util = {}

    Util.delay = function delay(name, timeoff = 0) {
        if (!delayCollection[name]) {
            delayCollection[name] = Date.now()
            return true
        }
        if (delayCollection[name] + timeoff > Date.now()) {
            return false
        }
        delayCollection[name] = Date.now()
        return true
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Util = Util
})();