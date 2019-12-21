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

    Util.removeElements = function removeElements (array, ...elements) {
        for (const element of array) {
            if (array.includes(element)) {
                const index = array.indexOf(element)
                array.splice(index, 1)
            }
        }
    }
    Util.getScene = function getScene (obj) {
        if (!obj || obj instanceof GameEngine.Scene) {
            return obj
        }
        return Util.getScene(obj.parent)
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