/**
 * base file for tamaramack.github.io on 07-Feb-17.
 */

if (window.$GLOBAL_PARAMETERS.$DEBUG) {
    (function (storage, _console, methods, callback) {
        /*
         * Create test UI console method validation
         * THIS IS NOT NDP PLAYER RELATED TEST
         * FOR CATCHING THIRD PARTY CONSOLES DURING TESTING
         */
        var len = methods.length,
            _store = storage.console = [];
        storage.alert = [];

        if ('undefined' === typeof _console)window.console = {};
        window.$NOOP_METHODS = [];
        while (len--) {
            var _name = methods[len];
            _store[_name] = [];

            if ((typeof _console[methods[len]]) === 'undefined') {
                var msg = '';
                msg += '*VIDEO DEVELOPMENT UI ENVIRONMENT*\n';
                msg += '**For Testing Dev Purposes Only**\n';
                msg += '***console message alert created when console method does not exist in current browser***\n';
                msg += 'Affected console method :: ' + _name;
                if (arguments.length) msg += '\n\n';
                for (var i = 0; i < arguments.length; i++) {
                    msg += arguments[i] + '\t::\t';
                }
                storage.alert.push(msg);
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
}
