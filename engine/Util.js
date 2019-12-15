;(function () {
    'use strict'

    const delayCollection = {}

    const Util = {}

    Util.delay = function delay (name, timeoff = 0) {
        if (!delayCollection[name]) {
            delayCollection[name] = {
                lastMoment: Date.now()
                timeoff
            }
            return true
        }
        if (delayCollection[name].lastMoment + timeoff < Date.now()) {
            return false
        }
        delayCollection[name].lastMoment = Date.now())
        delayCollection.timeoff = timeoff
        return true
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Util  = Util
})();