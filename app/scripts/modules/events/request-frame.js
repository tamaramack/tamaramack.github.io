/**
 * request-frame file for tamaramack.github.io on 07-Feb-17.
 */

window.$REQUEST_FRAME = (function () {

    var GlobalID, CURRENT_STATE;
    const CALLBACKS = [];

    const requestAnimationFrame = window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    const cancelAnimationFrame = window.cancelAnimationFrame
        || window.mozCancelAnimationFrame
        || function (requestId) {
            window.clearTimeout(requestId);
        };

    const STATES = {
        on: 'ON',
        off: 'OFF'
    };

    /***
     *
     * @constructor
     */
    function RequestFrame() {
        CURRENT_STATE = STATES.off;

        Object.defineProperties(this, {
            requestId: {
                get: function () {
                    return GlobalID;
                },
                enumerable: true
            }

            , callbacks: {
                get: function () {
                    return CALLBACKS;
                },
                enumerable: true
            }

            , length: {
                get: function () {
                    return CALLBACKS.length;
                },
                enumerable: true
            }
        });
    }

    /***
     *
     * @type {Object}
     */
    RequestFrame.prototype = Object.create({
        constructor: RequestFrame
    }, {
        timestamp: {value: Date.now()}

        /**
         *
         */
        , process: {value: process}

        /**
         *
         */
        , start: {value: start}

        /**
         *
         */
        , stop: {value: stop}

        /**
         *
         */
        , add: {
            value: add,
            enumerable: true
        }

        /**
         *
         */
        , remove: {
            value: remove,
            enumerable: true
        }
    });

    return new RequestFrame();

    function process() {
        var item;
        var i = CALLBACKS.length;
        while (i--) {
            item = CALLBACKS[i];
            if (item.fn instanceof Function) {
                if (item.async) {
                    setTimeout((item.fn).bind(item.scope), 1);
                } else {
                    (item.fn).call(item.scope);
                }
            }
        }
        GlobalID = requestAnimationFrame(process);
    }

    function start() {
        if (this.startTime) return false;
        Object.defineProperty(this, 'startTime', {
            value: window.performance.now(),
            configurable: true
        });
        GlobalID = requestAnimationFrame(this.process);
        CURRENT_STATE = STATES.on;
        return true;
    }

    function stop() {
        CURRENT_STATE = STATES.off;
        if (!GlobalID) return;
        cancelAnimationFrame(GlobalID);
        delete this.startTime;
        GlobalID = 0;
    }

    function add(fn, owner, async) {
        var results = __find(fn, owner);
        if (results.length || !(fn instanceof Function)) {
            console.warn('Adding new function to request frame has failed:',
                results.length, !(fn instanceof Function));
            return;
        }
        CALLBACKS.push(new CallbackModel(fn, owner, async));
    }

    function remove(fn, owner) {
        var results = __find(fn, owner);
        var i = results.length;
        if (!i) return;
        while (i--) CALLBACKS.splice(results[i], 1);
    }

    function CallbackModel(fn, owner, async) {
        this.fn = fn;
        this.scope = owner;
        this.async = async || false;
        this.id = (!!async ? 'async_' : '') + 'fn_' + (fn.name || Date.now());
    }

    function __find(fn, owner) {
        const results = [];
        var item, i = CALLBACKS.length;
        while (i--) {
            item = CALLBACKS[i];
            if (fn == item.fn && owner == item.scope)
                results.push(i);
        }
        return results;
    }

})();