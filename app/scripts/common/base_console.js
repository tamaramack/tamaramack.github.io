/**
 * base file for tamaramack.github.io on 07-Feb-17.
 */


(function (storage, _console, methods, callback) {
    /*
     * Create test UI console method validation
     * THIS IS NOT NDP PLAYER RELATED TEST
     * FOR CATCHING THIRD PARTY CONSOLES DURING TESTING
     */

    if ('undefined' === typeof _console) window.console = {};
    window.$NOOP_METHODS = [];
    var _name;
    let len = methods.length;
    while (len--) {
        _name = methods[len];

        if ((typeof _console[methods[len]]) === 'undefined') {
            let msg = '';
            msg += '*VIDEO DEVELOPMENT UI ENVIRONMENT*\n';
            msg += '**For Testing Dev Purposes Only**\n';
            msg += '***console message alert created when console method does not exist in current browser***\n';
            msg += 'Affected console method :: ' + _name;
            if (arguments.length) msg += '\n\n';
            for (let i = 0; i < arguments.length; i++) {
                msg += arguments[i] + '\t::\t';
            }
            storage.push('alert', msg);
            window.$NOOP_METHODS.push(_name);
        }

        function wrap(name, method, fn) {
            return function () {
                fn.call(this, name, Array.prototype.slice.call(arguments), method);
                return method.apply(_console, arguments);
            }
        }

        var orig = window.console[methods[len]];
        _console[methods[len]] = wrap(methods[len], orig, callback);

    }
}(window.$base.store,
    window.console,
    ['error', 'debug', 'info', 'assert', 'dir', 'log', 'trace', 'warn'],
    function (name, args, method) {
        (window.$base.store.console).push({
            now: Date.now(),
            perf: performance.now(),
            type: name,
            e: args
        });
    }
));

