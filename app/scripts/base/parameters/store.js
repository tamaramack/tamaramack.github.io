/**
 * store file for tamaramack.github.io on 22-Mar-17.
 */

(function (base) {

    const $STORAGE = {};

    function StoreModel() {

        Object.defineProperties(this, {
            timestamp: {value: Date.now()}
            , modules: {value: []}
        });
    }

    StoreModel.prototype = Object.create({
        constructor: StoreModel
    }, {
        push: {
            value: push,
            enumerable: true
        }
        , splice: {value: null}
        , length: {
            get: _length,
            enumerable: true
        }
    });

    Object.defineProperty(base.parameters, 'store', {
        value: StoreModel,
        enumerable: true
    });

    function push() {
        var item, moduleName;
        const items = Array.prototype.slice.call(arguments);
        let i = items.length;
        while (i--) {
            item = items[i];
            if (!!item.module) {
                moduleName = item.module;
                moduleChk.call(this, moduleName);
                ($STORAGE[moduleName]).push(item);
            }
        }
    }

    function _length() {
        let count = 0,
            i = (this.modules).length;
        while (i--) {
            var module = this.modules[i];
            count += ($STORAGE[module]).length;
        }
        return count;
    }

    function moduleChk(module) {
        if (!!$STORAGE[module]) return;
        this.modules.push(module);
        Object.defineProperty($STORAGE, module, {
            value: [],
            configurable: true
        });
    }

})(window.$base);