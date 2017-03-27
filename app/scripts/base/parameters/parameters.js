/**
 * parameters file for tamaramack.github.io on 22-Mar-17.
 */

(function (base) {
    var _console = window['console'];

    var jsonString = _decode(window.$DATASTRING);
    jsonString = jsonString.length ? JSON.parse(jsonString) : {};
    delete window.$DATASTRING;
    _console.debug('JSON STRING QUERY', jsonString);

    const ADBLOCK = window.hasOwnProperty('_ADBLOCK') ? window._ADBLOCK : false;

    var page = {};
    page.$DEBUG = jsonString.debug || 0;
    page.$DEBUG_MODE = testDebugMode(jsonString.mode) || 0;
    page.$VERSION = jsonString.version || false;

    page.$SYSTEM_ENVIRONMENT = jsonString._environment;
    page.$SOURCEPATH = jsonString._page.sourcePath;
    page.$PACKAGE_JSON = jsonString._package;
    page.isHTTPS = (window.location.protocol === 'https:');
    page.$URL_LOCATION = window.location.href;

    page.$MODULES = {};
    for (let prop in jsonString.modules) {
        page.$MODULES[prop] = jsonString.modules[prop];
    }

    Object.defineProperties(base.parameters, {
        debug: _define('$DEBUG', Boolean)
        , mode: _define('$DEBUG_MODE', Number)
        //, version: _define('$VERSION', String)
        , adblock: {
            get:function(){
                return window.hasOwnProperty('_ADBLOCK') ? window._ADBLOCK : false;
            },
            enumerable:true
        }
        , modules: {
            get: function () {
                const arr = [];
                for (let name in page.$MODULES) {
                    if (page.$MODULES[name]) arr.push(name);
                }
                return arr;
            },
            enumerable: true
        }
        , href: {
            get: function () {
                return base.utils.decode(page.$URL_LOCATION);
            }
        }
    });

    function _define(returnObject, dataType) {
        function to(value) {
            let utils = base.utils;
            if (dataType === Boolean) return utils.toBoolean(value);
            else if (dataType === Number) return utils.toNumber(value);
            else return value;
        }

        return {
            get: () => {
                return to(page[returnObject]);
            },
            set: base.wait.debounce((newValue) => {
                if (dataType === Boolean || dataType === Number)
                    newValue = base.utils.toNumber(newValue);
                page[returnObject] = newValue;
            }, 50, 'setBase_' + returnObject),
            enumerable: true
        };
    }

    function _decode(str) {
        var txt = document.createElement("textarea");
        txt.innerHTML = decodeURIComponent(str);
        if (!(typeof txt.value === 'string')) {
            txt.value = '';
            _console.warn('object IS NOT a string in _decode.');
        }
        str = (txt.value).toString();
        return str;
    }

    function retDefault(_object, defValue) {
        if (!!_object) return _object;
        return defValue || false;
    }

    function isUndef(_object) {
        return typeof _object === 'undefined';
    }

    function testDebugMode(_object) {
        if (typeof _object !== 'string') return _object;
        return _object.split(',');
    }

})(window.$base);