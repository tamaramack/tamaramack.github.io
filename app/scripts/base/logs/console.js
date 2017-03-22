/**
 * console file for tamaramack.github.io on 21-Mar-17.
 */

(function (base) {

    window['console'] = window['console'] || undefined;
    if ('undefined' === typeof window['console']) window.console = {};

    var gv = base.parameters;

    var level1 = ['warn', 'error'];
    var level2 = (['debug', 'info']).concat(level1);
    var level3 = (['assert', 'dir', 'log', 'trace']).concat(level2);
    var consoleMethods = ['error', 'debug', 'info', 'assert', 'dir', 'log', 'trace', 'warn'];
    var supportedConsoleMethods = {};

    var consoleMethodCount = consoleMethods.length;
    var storage = base.store.console = [];
    while (consoleMethodCount--) {
        var _method = consoleMethods[consoleMethodCount];
        if (Function.prototype.bind
            && typeof console[_method] === "object") {
            console[_method] = Function.prototype.call.bind(console[_method], console);
        }
        supportedConsoleMethods[_method] = (console[_method]) instanceof Function ? _method : false;
    }

    function _Console(scopeName, _mode, parent) {
        if ((window.console.constructor instanceof Function)
            && (window.console.constructor.call instanceof Function)) {
            window.console.constructor.call(this);
        }

        var i = consoleMethods.length;
        while (i--) {
            var method = consoleMethods[i];
            this.__console__[method] = !(console[method]['bind'])
                ? Function.prototype.bind.call(window.console[method], console)
                : (window.console[method]).bind(console);
            this._makeStore(method, this.__console__[method]);
        }

        var _scopeName = scopeName || this.timestamp;

        Object.defineProperties(this, {
            timestamp: {value: (new Date()).getTime()}
            , parent: {
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
        id: {
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
        , _makeStore: {value: _makeStore}
        , _wrapConsole: {value: _wrapConsole}
        , _writeStore: {value: writeStorageObject}
        , __console__: {value: {}}
        , _debug: {
            get: function () {
                return gv.$DEBUG
            },
            configurable: true
        }
    });

    Object.defineProperty(base, 'console', {
        value: _Console,
        enumerable: true
    });

    function _default(method) {
        var _method = console[method];
        var utils = base.utils;
        if (utils.has(method, ['dir', 'assert'])) return _method;
        return _method.bind(console, '%s', this._extend, '\t');
    }

    function noop() {
    }

    function _store(method) {
        var consoleMethod = this.__console__[method];
        //window.console.warn('Connecting', method, 'to CONSOLE LOG & STORAGE', this.id, !!consoleMethod._wrapped);

        if (!(consoleMethod._wrapped)) {
            this._makeStore(method, consoleMethod);
        }

        return consoleMethod._wrapped;
    }

    function _makeStore(method, consoleMethod) {
        var _this = this;

        if (!(consoleMethod._wrapped)) {
            consoleMethod._wrapped = function () {
                _this._wrapConsole.call(_this, method, Array.prototype.slice.call(arguments, 0));
            };
        }
    }

    function _wrapConsole(_method, args) {
        //console.error('WRAP CONSOLE', _method, args);
        var _this = this,
            utils = base.utils;
        var consoleMethod = this.__console__[_method],
            _timeStamp = this._writeStore(_method, args);

        if (utils.has(_method, ['dir', 'assert']))
            return consoleMethod.apply(window.console, args);

        var timestamp = function () {
        };
        timestamp.toString = function () {
            return _this.scopeName + ' ' + _timeStamp.time + ' (' + _timeStamp.count + ')';
        };

        args = (['%s', timestamp, '\t']).concat(args);
        consoleMethod.apply(console, args);
    }

    function get_extend(_extTimestamp) {
        var _this = this;
        var timestamp = function () {
        };
        timestamp.toString = function () {
            var tc = _extTimestamp || _getTimestamp();
            return _this.scopeName + ' ' + tc.time + ' (' + tc.count + ')';
        };
        return timestamp;
    }

    function wipe(_methods) {
        var i = consoleMethods.length;
        var _this = this;
        _methods = _methods || this;
        while (i--) {
            if (this.mode > 3) {
                _methods[consoleMethods[i]] = function () {
                    _this._wrapConsole.call(_this, consoleMethods[i], Array.prototype.slice.call(arguments, 0));
                };
                continue;
            }
            _methods[consoleMethods[i]] = this._noop;
        }
        return _methods;
    }

    function reload(mode) {
        if (typeof mode === 'undefined')
            mode = gv.$DEBUG_MODE;

        this.mode = isNaN(mode) ? this.mode : mode;
        //console.warn('RELOAD REQUESTED.', this.mode);
        this.process();
    }

    function process() {
        var utils = base.utils;
        for (var supportedMethod in supportedConsoleMethods) {
            var method = supportedConsoleMethods[supportedMethod];
            method = supportedMethod || supportedConsoleMethods['log'];
            this[method] = this._noop;

            if (!(method && utils.has(method, this.level)))continue;
            this[method] = (this.mode > 3) ? this._store(method) : this._default(method);
        }

    }

    function writeStorageObject(method, args) {
        var storageEventModel = base.models.StorageEventModel;
        var timeStamp = _getTimestamp(),
            obj = {
                id: this.id,
                timestamp: timeStamp.timestamp,
                scope: this.scopeName,
                parent: this.parent && this.parent.name,
                name: this.name,
                type: method,
                arguments: args
            };

        (storage).push(new storageEventModel({
            e: obj,
            type: obj.type,
            instance: obj.name,
            index: storage.length
        }));
        return timeStamp;
    }

    function _getTimestamp() {
        var utils = base.utils;
        var datetime = utils.getTime(),
            timestamp = datetime.timestamp,
            count = timestamp - base.timestamp;
        return {
            time: datetime.string,
            count: utils.getTimeString(count, true)
        };
    }

    function _getLevel(mode) {
        if (!gv.$DEBUG
            || (isNaN(mode) && !(mode instanceof Array)))return [];
        if (mode instanceof Array) return mode;

        switch (mode) {
            case 0:
                return [];
            case 1:
                return level1;
            case 2:
                return level2;
            default:
                return level3;
        }

    }

})(window.$base);