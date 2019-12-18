;(function () {
    'use strict'

    const delayCollection = {}
    const uids = []

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

    Util.generateUid = function generateUid (size = 20) {
        let uid = getRandomString()
        while (uids.includes(uid)) {
            uid = getRandomString()
        }
        return uid
    }

    Util.isInside = function isInside (point, rect) {
        return rect.x < point.x && rect.x < point.x + rect.width
            && rect.y < point.y && rect.y < point.y + rect.height

    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Util = Util

    const alaphabet = 'qwerrtyuasgdfvzbxncmjiuk1239875039487'
    function getRandomLetter() {
        return alaphabet[Math.floor(Math.random()*alaphabet.length)]
    }
    function getRandomString(size=10) {
        let str = ''
        while (str.length < size) {
            str += getRandomLetter()
        }
        return str
    }
})();