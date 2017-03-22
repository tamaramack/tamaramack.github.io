/**
 * File name: event-model, created on 15-Jun-16 in project, ndp-video-spa.
 */

(function (base) {

    function StorageEventModel() {
        Object.defineProperties(this, {
            e: _define(false)
            , type: _define(false)
            , instance: _define('default')
            , index: _define(-1)
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


    function SeqEventObj() {
        this.evt = {};
        this.type = '';
        this.instance = '';
        this.index = 0;
        this.log = new MessageModel();
        this.timestamp = Date.now();
    }

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