/**
 * injection file for tamaramack.github.io on 26-Mar-17.
 */

(function (base) {

    function InjectLog(logFn, withObj, excluded) {
        excluded = (this.isArray(excluded)) ? excluded : [];
        var name, fn;
        for (name in withObj) {
            fn = withObj[name];
            if (typeof fn === 'function'
                && !(base.utils.has(name, excluded))) {
                withObj[name] = (function (name, fn) {
                    let args = arguments;
                    return function () {
                        logFn.apply(this, args);
                        return fn.apply(this, arguments);

                    }
                })(name, fn);
            }
        }
    }


    Object.defineProperty(base, 'inject', {
        value: InjectLog,
        enumerable: true
    });

})(window.$base);