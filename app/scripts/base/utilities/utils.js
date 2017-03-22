/**
 * utils file for ndp-video-spa on 23-Mar-16.
 */
/**
 * Created by 206445994 on 16-Feb-16.
 */

(function (base, $) {
    Date = window.Date;

    var Models = base.Models;
    var wait = base.wait;

    function Utils() {

        Object.defineProperties(this, {
            getURL: _define(getURL)
            , resizeElement: _define(resizeElement)
            , getDateTime: _define(getDateTime)
            , getTime: _define(getTime)
            , getTimeString: _define(getTimeString)
            , syntaxHighlight: _define(syntaxHighlight)
            , printHTML: _define(printHTML)
            , extend: _define(extend)
            , cloneObjToJson: _define(cloneObjToJson)
            , uniqueID: _define(uniqueID)

            // is Not an Object boolean return value
            , isNaO: _define(isNaO)

            //Determine if the passing argument is HTML Dom Element
            , isDomElement: _define(isDomElement)

            , isHtmlCollection: _define(isHtmlCollection)
            , isArray: _define(isArray)
            , isString: _define(isString)
            , getFnName: _define(getFnName)
            , has: _define(has)

            , encode: _define(encode)
            , decode: _define(decode)
            , getTraceStack: _define(getTraceStack)
            , primitiveType: _define(primitiveType)
            , identifyObject: _define(identifyObject)
            , toBoolean: _define(toBool)
            , toNumber: _define(toNum)
        });

        setTimeout(function () {
            wait.trigger(wait.UTILITIES);
        }, 5);
    }

    Utils.prototype = Object.create({
        constructor: Utils
    }, {
        timestamp: {value: Date.now()}
        , models: _define(Models)
        , requestAnimationFrame: _define((function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })())
        , cancelAnimationFrame: _define((function () {
            return window.cancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                function (requestId) {
                    window.clearTimeout(requestId);
                }
        })())
    });

    return Utils;

    function _define(value) {
        return {
            value: value,
            enumerable: true
        }
    }

    function getURL() {
        return window.parameters.$PAGE_SOURCEPATH;
    }

    function uniqueID(prefix) {
        return (prefix || '_') + (Math.ceil(Math.random() * Date.now()));
    }

    function resizeElement(jqObj, ratio, dim) {
        var revDim = dim === 'height' ? 'width' : 'height',
            ele = $(jqObj);

        wait.throttle(function () {
            var calcRatio = (ele[revDim]()) * ratio;
            //this.console().warn('_Utils.resizeElement', jqObj, ele[revDim](), ratio, calcRatio);
            //ele[revDim](calcRatio);
            ele.css('min-' + dim, calcRatio + 'px');
        }, 200, wait.UTILS + '_resizeElement_' + jqObj.toString());
    }

    function getDateTime(date) {
        date = __isValidDate(date);
        return date.toLocaleDateString()
            + ', ' + this.getTimeString(date);
    }

    function getTime() {
        var date = (new Date()).getTime();
        return {
            timestamp: date,
            string: this.getTimeString(date)
        }
    }

    function getTimeString(date, UTC) {
        date = __isValidDate(date);

        var h, m, s, _get = 'get';
        if (UTC) _get += 'UTC';
        var t = {
            hours: date[_get + 'Hours'](),
            minutes: date[_get + 'Minutes'](),
            seconds: date[_get + 'Seconds'](),
            milliseconds: date[_get + 'Milliseconds']()
        };
        h = __formattime(t.hours);
        m = __formattime(t.minutes);
        s = __formattime(t.seconds);

        return ([h, m, s]).join(':') + '.' + t.milliseconds;
    }

    function syntaxHighlight(json) {
        json = json || "";
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
        return json.replace(regex, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    function printHTML(_print) {
        _print = this.cloneObjToJson(_print);
        _print = JSON.stringify(_print, undefined, 2);
        return this.syntaxHighlight(_print);
    }

    function extend() {
        if ($.extend) {
            return $.extend.apply($, arguments);
        }

        var extended = {},
            deep = false,
            _arguments = Array.prototype.slice.call(arguments);

        //check if deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0];
            _arguments = Array.prototype.slice.call(arguments, 1);
        }

        //Merge the object into the extended object
        var merge = function (obj) {
            for (var prop in obj) {
                if (!obj[prop]) continue;
                //If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        };

        var len = _arguments.length;
        //_arguments.reverse();
        //Loop through each object and conduct a merge
        while (len--) {
            var i = (_arguments.length - 1) - len,
                obj = _arguments[i];
            merge(obj);
        }
        return extended;
    }

    function cloneObjToJson(obj, replacer) {
        if (!obj || obj === null)return obj;
        var _this = this;
        var cache = [];
        replacer = replacer || function (key, value) {
                if (value instanceof Function) {
                    return (value.toString()).replace(/(\r)(\s+)/gm, ' ');
                } else if (typeof value === 'object' && value !== null) {
                    var M = _this.models.nativeObj;
                    if (cache.indexOf(value) !== -1) return "[CIRCULAR_REFERENCE]";
                    cache.push(value);

                    if (Object.prototype.toString.call(value) === '[object HTMLVideoElement]') {
                        M = _this.models.videoModel;
                    } else if (_this.isDomElement(value)) {
                        M = _this.models.domModel;
                    }
                    return new M(value);
                }

                return value;
            };

        obj = JSON.stringify(obj, replacer);
        cache = null;
        return JSON.parse(obj);
    }

    function isNaO(obj) {
        return (typeof obj !== "object");
    }

    function isDomElement(obj) {
        if (obj === null)return false;
        if (typeof HTMLElement === "object")
            return obj instanceof HTMLElement;
        return obj && typeof obj === "object"
            && obj['nodeType'] === 1
            && typeof obj['nodeName'] === "string";
    }

    function isHtmlCollection(obj) {
        if (typeof HTMLCollection === 'object')
            return obj instanceof HTMLCollection;
        return obj && 'object' === typeof obj
            && Object.prototype.toString.call(obj) === '[object HTMLCollection]'
            && obj.hasOwnProperty('length');
    }

    function isArray(_obj) {
        if (Array.isArray) {
            return Array.isArray(_obj);
        }
        var _check = Object.prototype.toString.call([]);
        if (_check === '[object Array]') {
            return Object.prototype.toString.call(_obj) === '[object Array]';
        }
        return false;
    }

    function isString() {
        return (typeof arguments[0] === 'string');
    }

    function getFnName(fn) {
        var f = typeof fn == 'function';
        var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
        return (!f && 'false') || (s && s[1] || 'anonymous');
    }

    function has(obj, arr) {
        if (!arr) return false;
        if (this.isArray(arr)) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) return true;
            }
        } else {
            var keys = Object.keys(arr),
                i = keys.length;
            while (i--) {
                if (arr[keys[i]] === obj) return true;
            }
        }
        return false;
    }

    function encode(str) {
        var el = document.createElement("div");
        el.innerText = el.textContent = str;
        if (!this.isString(el.innerHTML)) {
            el.innerHTML = '';
            console.warn('object IS NOT a string in encode.');
        }
        str = (el.innerHTML).toString();
        delete el;
        return str;
    }

    function decode(str) {
        var txt = document.createElement("textarea");
        txt.innerHTML = decodeURIComponent(str);
        if (!this.isString(txt.value)) {
            txt.value = '';
            console.warn('object IS NOT a string in decode.');
        }
        str = (txt.value).toString();
        delete txt;
        return str;
    }

    function getTraceStack(error) {
        var err;
        if (!(error instanceof Error)) {
            err = (this instanceof Error) ? this : new Error();
        } else {
            err = error;
        }
        var stack = err.stack;
        try {
            throw err;
        } catch (e) {
            stack = e.stack;
            if (!stack) {
                if ((this)['getStackTrace'] instanceof Function) {
                    stack = this.getStackTrace();
                } else if ((this)['captureStackTrace'] instanceof Function) {
                    stack = this.captureStackTrace();
                } else {
                    stack = e.message;
                }
            }
        }
        return stack || '';
    }

    function primitiveType(_typeof) {
        if ('undefined' === _typeof) {
            return 'undefined';
        }
        if ('string' === _typeof) {
            return 'String';
        }
        if ('function' === _typeof) {
            return 'Function';
        }
        if ('number' === _typeof) {
            return 'Number';
        }
        if ('boolean' === _typeof) {
            return 'Boolean';
        }
        return undefined;
    }

    function identifyObject(obj) {
        var primitive = this.primitiveType(typeof obj);
        if (primitive) {
            return primitive;
        }
        if (this.isArray(obj)) {
            return 'Array';
        }
        if (this.isDomElement(obj)) {
            return 'HTMLElement';
        }
        if (this.isHtmlCollection(obj)) {
            return 'HTMLCollection';
        }
        var _jq = jQuery;
        if (obj instanceof _jq) {
            return 'jQuery';
        }
        return Object.prototype.toString.call(obj);
    }

    function toBool(obj) {
        if (typeof obj === 'undefined') return false;
        if (typeof obj === 'boolean') return obj;
        var _obj = parseInt(obj);
        if (isNaN(_obj))return obj === 'true';
        return _obj !== 0;
    }

    function toNum(obj) {
        if (typeof obj === 'undefined') return 0;
        var _obj = parseInt(obj);
        if (isNaN(_obj)) {
            _obj = 0;
            if (obj === true || obj === 'true') _obj = 1;
        }
        return _obj;
    }

    function __formattime(time) {
        var len = ('' + time).length;
        return len === 1 ? '0' + time : time;
    }

    function __isValidDate(date) {
        date = new Date(date);
        if (!((Object.prototype.toString.call(date) === '[object Date]')
            && isFinite(date))) date = new Date();
        return date;
    }
})(window.$base = window.$base || {}, jQuery);