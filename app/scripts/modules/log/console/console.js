/**
 * console file for tamaramack.github.io on 07-Feb-17.
 */

define(function(){
    window['console'] = window['console'] || undefined;
    if ('undefined' === typeof window['console'])window.console = {};

    var gv = window.$GLOBAL_PARAMETERS;

    var level1 = ['warn', 'error'];
    var level2 = (['debug', 'info']).concat(level1);
    var level3 = (['assert', 'dir', 'log', 'trace']).concat(level2);
    var consoleMethods = ['error', 'debug', 'info', 'assert', 'dir', 'log', 'trace', 'warn'];
    var supportedConsoleMethods = {};

    var consoleMethodCount = consoleMethods.length;
    var storage = gv.$LOG_STORAGE.console = [];
    while (consoleMethodCount--) {
        var _method = consoleMethods[consoleMethodCount];
        if (Function.prototype.bind
            && typeof console[_method] === "object") {
            console[_method] = Function.prototype.call.bind(console[_method], console);
        }
        supportedConsoleMethods[_method] = (console[_method]) instanceof Function ? _method : false;
    }

    function _Console(scopeName, _mode, parent) {
        if (window.console.constructor && (window.console.constructor instanceof Function))
            window.console.constructor.call(this);

        var _scopeName = scopeName || this.timestamp;

        Object.defineProperties(this, {
            parent: {
                get: function () {
                    return parent || null;
                }
            }
            , name: {
                get: function () {
                    return _scopeName;
                }
            }
            , mode: {
                value: _mode || gv.$DEBUG_MODE,
                enumerable: true,
                writable: true
            }
        });

        this.wipe();
        this.process();
    }

    _Console.prototype = Object.create(window.console, {
        timestamp: {value: (new Date()).getTime()}
        , id: {
            get: function () {
                var name = this.scopeName.replace(/[(\s|\W)*]+/gm, '_');
                return (name).toLowerCase() + '_' + this.timestamp;
            },
            enumerable: true
        }
        , scopeName: {
            get: function () {
                var name = this.name;
                if (this.parent && this.parent.scopeName) {
                    name = this.parent.scopeName + '[' + name + ']';
                }
                return name;
            },
            enumerable: true
        }
        , level: {
            get: function () {
                return _getLevel(this.mode)
            },
            enumerable: true
        }
        , reload: {
            value: reload,
            enumerable: true
        }
        , process: {value: process}
        , wipe: {value: wipe}
        , _extend: {get: get_extend}
        , _noop: {
            value: noop,
            writable: true
        }
        , _default: {value: _default}
        , _store: {value: _store}
        , _debug: {
            get: function () {
                return gv.$DEBUG
            },
            configurable: true
        }
    });

    return _Console;

    function _default(method) {
        var _method = console[method];
        if ((window.$page && window.$page.utils)) {
            var utils = window.$page.utils;
            if (utils.has(method, ['dir', 'assert'])) return _method;
        }
        if (!(console[method]['bind'])) {
            return Function.prototype.bind.call(_method, console, '%s', this._extend, '\t');
        }
        return _method.bind(console, '%s', this._extend, '\t');
    }

    function noop() {
    }

    function _store(method) {
        var _this = this;
        var _method = console[method];
        if (!(console[method]['bind'])) {
            _method = Function.prototype.bind.call(console[method], console);
        }

        window.console[method] = function () {
            var utils = window.$page.utils;
            var _timeStamp = _getTimestamp(),
                arg = [];
            if (!utils.has(method, ['dir', 'assert'])) {
                var msgLog = _this.scopeName + ' ' + _timeStamp.time + ' (' + _timeStamp.count + ')';
                arg.push(msgLog, '\t');
            }

            arg = arg.concat(Array.prototype.slice.call(arguments));
            (storage[method]).push(arg);
            _method.apply(this, arg);
        };

        return window.console[method];

    }

    function get_extend() {
        var _this = this;
        var timestamp = function () {
        };
        timestamp.toString = function () {
            var tc = _getTimestamp();
            return _this.scopeName + ' ' + tc.time + ' (' + tc.count + ')';
        };
        return timestamp;
    }

    function wipe(_methods) {
        var i = consoleMethods.length;
        _methods = _methods || this;
        while (i--) {
            _methods[consoleMethods[i]] = this._noop;
        }
        return _methods;
    }

    function reload(mode) {
        if (typeof mode === 'undefined')
            mode = gv.$DEBUG_MODE;

        this.mode = mode;
        this.process();
    }

    function process() {
        var utils = window.$page.utils;
        for (var supportedMethod in supportedConsoleMethods) {
            var method = supportedConsoleMethods[supportedMethod];
            method = supportedMethod || supportedConsoleMethods['log'];
            this[method] = this._noop;

            if (!(method && utils.has(method, this.level)))continue;
            this[method] = this._default(method);
        }

    }

    function _getTimestamp() {
        if (!(window.$page && window.$page.utils))
            return {
                time: (new Date()).toLocaleTimeString(),
                count: (new Date()).toLocaleTimeString()
            };

        var utils = window.$page.utils;
        var datetime = utils.getTime(),
            timestamp = datetime.timestamp,
            count = timestamp - gv.$PAGE_TIMESTAMP;
        return {
            time: datetime.string,
            count: utils.getTimeString(count, true)
        };
    }

    function _getLevel(mode) {
        if (!gv.$DEBUG)return [];
        if (mode instanceof Array) return mode;
        switch (mode) {
            case 1:
                return level1;
            case 2:
                return level2;
            case 3:
                return level3;
            default:
                return [];
        }
    }
});