/**
 * File name: event-model, created on 15-Jun-16 in project, ndp-video-spa.
 */

(function (base) {

    function StorageEventModel(obj) {
        obj = obj || {};
        Object.defineProperties(this, {
            e: _define(obj.e || false)
            , module: _define(obj.module || 'default')
            , type: _define(obj.type || false)
            , instance: _define(obj.instance || 'default')
            , index: _define((base.store && base.store.length) || -1)
            , timestamp: {value: Date.now()}
            , performance: {value: performance.now()}
        });
    }

    StorageEventModel.prototype = Object.create({
        constructor: StorageEventModel
    }, {
        log: {
            value: new MessageModel(),
            enumerable: true
        }
        , handler: {
            value: false,
            writable: true
        }
    });


    Object.defineProperty(base.models, 'StorageEventModel', {
        value: StorageEventModel,
        enumerable: true
    });

    function MessageModel() {
        this.type = '';
        this.css = '';
        this.message = [];
    }


    function _define(obj) {
        return {
            value: obj,
            writable: true,
            enumerable: true
        }
    }
})(window.$base);