/**
 * models file for tamaramack.github.io on 07-Feb-17.
 */
define('configuration-object-mapper-model',function () {
    Date = window.Date;
    var wait = window.$PAGE_WAIT;

    var page = window.$page, _console = window['console'];
    wait.on(wait.CONSOLE, function () {
        page = window.$page;
        _console = page.console.getInstance('Data Models');
        _console.log('Wait Condition Initialized :: window.$page.console', Date.now());
    });

    return Object.create({}, {
        timestamp: _define(Date.now())

        , nativeObj: _define(NativeObjectModel)

        , domModel: _define(DOMElementModel)

        , videoModel: _define(VideoElementModel)
    });

    function _define(value) {
        return {
            value: value,
            enumerable: true
        }
    }

    function VideoElementModel(element) {
        if (!element) return {};

        for (var prop in element) {
            if (prop.substring(0, 2) === 'on') continue;
            var item = element[prop],
                _typeof = (Object.prototype.toString.call(item)),
                regex = /(undefined|null|string|number|boolean|array)/;

            if (regex.test(_typeof.toLowerCase())) {
                this[prop] = item;
            } else {
                switch (prop) {
                    case 'seekable':
                        var _seek = element.seekable || [];
                        this.seekable = __map(_seek, true);
                        break;

                    case 'buffered':
                        var _buffer = element.buffered || [];
                        this.buffered = __map(_buffer, true);
                        break;

                    case 'played':
                        var _play = element.played || [];
                        this.played = __map(_play, true);
                        break;

                    case 'textTracks':
                        var _tracks = element.textTracks || [];
                        this.textTracks = __map(_tracks);
                        break;

                    case 'videoTracks':
                        var _videos = element.videoTracks || [];
                        this.videoTracks = __map(_videos);
                        break;
                }
            }
        }

        //unique to this MODEL
        this.fullscreen = page.detect.detectFullscreenSupport(element);
    }

    function DOMElementModel(element, showAllProperties) {
        if (!element) return {};
        Object.defineProperty(this,'$PAGE_MAPPED_ELEMENT',{
            value: Date.now()
        });

        for (var prop in element) {
            if (prop.substring(0, 2) === 'on') continue;
            var item = element[prop],
                _typeof = (Object.prototype.toString.call(item)),
                regex = /(undefined|null|string|number|boolean|array)/;

            if (regex.test(_typeof.toLowerCase())) {
                this[prop] = item;
            } else if (showAllProperties) {
                this[prop] = _typeof;
            }
        }
    }

    function NativeObjectModel(_object, depthNumber) {
        var utils = page.utils,
            isDomElement = utils.isDomElement || function(){return false;};
        if (!_object || (utils.isArray(_object))) {
            return _object;
        }

        depthNumber = isNaN(parseInt(depthNumber)) ? 2 : depthNumber;
        Object.defineProperty(this,'$PAGE_MAPPED_NATIVE',{
            value: Date.now()
        });

        for (var prop in _object) {
            var M, item = _object[prop],
                _typeof = (Object.prototype.toString.call(item)),
                regex = /(undefined|null|string|number|boolean|array)/;
            if (regex.test(_typeof.toLowerCase())) {
                this[prop] = item;
            } else if (isDomElement(item)) {
                M = page.utils.models.domModel;
                this[prop] = new M(item);
            } else if (item instanceof Function) {
                if (!_object.hasOwnProperty(prop))continue;
                var _toArray = ((item.toString()).replace(/(\r*)(\s+)/gm, ' ')).split(' '),
                    _newStringArray = [];
                if (_toArray.length > 7) {
                    _newStringArray.push(_typeof);
                } else {
                    _newStringArray = _toArray;
                }
                this[prop] = (_newStringArray).join(' ');
            } else if (_typeof === '[object Object]') {
                if (depthNumber && _object.hasOwnProperty(prop)) {
                    M = page.utils.models.nativeObj;
                    var _depthNumber = depthNumber - 1;
                    this[prop] = new M(item, _depthNumber);
                }
            }

        }
    }

    function __map(arr, isMediaParam) {
        var utils = page.utils;
        var newARR = [];
        for (var i = 0; i < arr.length; i++) {
            var _obj = utils.cloneObjToJson(arr[i]) || {};
            if (isMediaParam) {
                _obj.start = (arr['start'] instanceof Function) ? arr.start(i) : null;
                _obj.end = (arr['end'] instanceof Function) ? arr.end(i) : null;
            }
            newARR.push(_obj);
        }
        return newARR;
    }
});