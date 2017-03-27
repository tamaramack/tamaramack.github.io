/**
 * detect file for tamaramack.github.io on 21-Mar-17.
 */

(function (base, $) {
    Date = window.Date;

    var _console = window.console;

    var DONE_AUTOPLAY,
        DONE_FLASH,
        DONE_HTML5,
        DONE_FULLSCREEN;

    var temp = {};
    var callbackArray = [];

    var MIMETYPES = {
        'mp4': ([
            'avc1.42E01E'
            , 'avc1.58A01E'
            , 'avc1.4D401E'
            , 'avc1.64001E'
            , 'mp4v.20.8'
            , 'mp4v.20.240'
            , 'mp4a.40.2'
        ]).map(function (codec) { return 'video/mp4; codecs="' + codec + ', mp4a.40.2"' }),
        'ogg': [
            'video/ogg; codecs="theora, vorbis"'
            , 'video/ogg; codecs="dirac"'
            , 'video/ogg; codecs="theora, speex"'
        ],
        '3gpp': ['video/3gpp; codecs="mp4v.20.8, samr"'],
        'webm': ['video/webm; codecs="vp8, vorbis"'],
        'vp9': ['video/webm; codecs="vp9"'],
        'mkv': ['video/x-matroska; codecs="theora, vorbis"'],
        'm3u8': ['application/x-mpegurl'],
        'hls': ['application/x-mpegurl; codecs="avc1.42E01E"']
    };
    //MIMETYPES['ogv'] = MIMETYPES['ogg'];
    //MIMETYPES['3gp'] = MIMETYPES['3gpp'];

    var AUDIO_MIMETYPES = {
        'wav': ['audio/wav'],
        'mp3': ['audio/mp3', "audio/mpeg;codecs='mp3'"],
        'aac': ["audio/mp4;codecs='mp4a.40.5'"],
        'oga': ['audio/ogg']
    };


    function Detection() {
        temp.video = document.createElement('video');
        temp.track = document.createElement('track');

        this.done = {};
        Object.defineProperties(this.done, {
            autoplay: {
                get: function () {
                    return DONE_AUTOPLAY
                },
                enumerable: true
            },
            flash: {
                get: function () {
                    return DONE_FLASH
                },
                enumerable: true
            },
            html5: {
                get: function () {
                    return DONE_HTML5
                },
                enumerable: true
            },
            fullscreen: {
                get: function () {
                    return DONE_FULLSCREEN
                },
                enumerable: true
            }
        });

        Object.defineProperties(this, {
            timestamp: {value: Date.now()}
            , detectionCompleted: {
                get: function () {
                    return (this.done.autoplay
                    && this.done.flash
                    && this.done.html5
                    && this.done.fullscreen);
                },
                enumerable: true
            }
        });

        this.AUTOPLAY = false;
        this.FLASH = false;

        this.HTML5 = this.isHTML5();
        this.HTML5VIDEO = this.canPlayHTML5Video();
        DONE_HTML5 = true;

        this.FULLSCREEN = this.detectFullscreenSupport();
        DONE_FULLSCREEN = true;

        this.testHTML5Autoplay();
        this.hasFlash();

        //delete video;
        this.__runInterval(Date.now());
    }

    Detection.prototype = Object.create({constructor: Detection}, {
        addCallbackDetection: {value: addCallbackDetection}
        , detectFullscreenSupport: {value: detectFullscreenSupport}
        , isHTML5: {value: isHTML5}
        , canPlayHTML5Video: {value: canPlayHTML5Video}
        , testHTML5Autoplay: {value: testHTML5Autoplay}
        , hasFlash: {value: hasFlash}

        , __getBody: {value: __getBody}
        , __runInterval: {value: __runInterval}
        , __runCallback: {value: __runCallback}
    });

    Object.defineProperty(base, 'detect', {
        value: new Detection(),
        enumerable: true
    });

    function __getBody() {
        var body = document.body;
        if (!body) {
            // Can't use the real body create a fake one.
            body = document.createElement('body');
            body.fake = true;
        }
        return body;
    }

    function __runInterval(startTime) {
        var detectionInterval, scope = this;
        detectionInterval = setInterval(function () {
            var lapse = Date.now() - startTime;
            //_console.log('Check Completion detectionInterval: ' + detectionInterval, lapse, $.extend({}, scope.done));
            if (scope.detectionCompleted) {
                clearInterval(detectionInterval);
                if (temp.video) delete temp.video;
                scope.__runCallback();
            } else if (lapse > 10000) {
                _console.error('Check Completion Interval TIMED OUT ERROR: ' + detectionInterval, lapse);
                clearInterval(detectionInterval);
                if (temp.video) delete temp.video;
            }
        }, 20);
    }

    function __runCallback() {
        if (callbackArray.length) {
            var callback = (callbackArray).shift();
            if (callback.fn instanceof Function)
                (callback.fn).call(callback.scope);
            this.__runCallback();
        }
    }

    function addCallbackDetection(callback, owner) {
        if (this.detectionCompleted) {
            //_console.debug('Detection.prototype.addCallbackDetection: ' + this.detectionCompleted, arguments);
            if (callback instanceof Function) callback.call(owner);
        } else {
            callbackArray.push({fn: callback, scope: owner});
            //_console.debug('Detection.prototype.addCallbackDetection: ' + this.detectionCompleted, callbackArray);
        }
    }

    function detectFullscreenSupport() {
        // [requestFullscreen,msRequestFullscreen,mozRequestFullScreen,webkitRequestFullscreen]
        var video = temp.video;
        var obj = {
            isFullscreen: (!document.fullscreenElement && !document.mozFullScreenElement
            && !document.webkitFullscreenElement && !document.msFullscreenElement),
            mode: null
        };
        if (!video) return obj;
        if (video.requestFullscreen) {
            obj.mode = {Request: 'requestFullscreen', Exit: 'exitFullscreen'};
        } else if (video.webkitRequestFullscreen) {
            obj.mode = {Request: 'webkitRequestFullscreen', Exit: 'webkitExitFullscreen'};
        } else if (video.mozRequestFullScreen) {
            obj.mode = {Request: 'mozRequestFullScreen', Exit: 'mozCancelFullScreen'};
        } else if (video.msRequestFullscreen) {
            obj.mode = {Request: 'msRequestFullscreen', Exit: 'msExitFullscreen'};
        }
        return obj;
    }

    function isHTML5() {
        var isElement = !(temp.track instanceof HTMLUnknownElement) && ("kind" in temp.track);
        delete temp.track;
        return isElement;
    }

    function canPlayHTML5Video() {
        var v = temp.video;
        var canPlay = !!(v.canPlayType);
        try {
            if (canPlay) {
                canPlay = new Boolean(canPlay);
                //_console.info('Video canPlayType', canPlay);
                for (var mimeType in MIMETYPES) {
                    var arr = MIMETYPES[mimeType];
                    var _bool = (arr.some(function (val) {
                        return !!(v.canPlayType(val).replace(/^no$/, ''));
                    }));
                    var canPlayArr = arr.map(function (val) {
                        return {
                            canPlay: v.canPlayType(val).replace(/^no$/, ''),
                            type: val
                        };
                    });
                    canPlay[mimeType] = {
                        canplay: _bool,
                        codecs: canPlayArr
                    };
                }
            }
            return canPlay;
        } catch (e) {
            _console.error('Video canPlayType', e)
        }
        return false;
    }

    function testHTML5Autoplay() {
        var video = temp.video;
        var context = this;
        var failedResponse = function () {
            DONE_AUTOPLAY = true;
            //_console.error('Test HTML5 Video Autoplay failed.', context.HTML5);
            return;
        };

        if (!('autoplay' in video)) {
            return failedResponse();
        }

        var canPlayTimeout;
        var vStyle = video.style;
        var docElement = document.documentElement;
        var canAutoplayTest = function (e) {
            clearTimeout(canPlayTimeout);
            video.removeEventListener('playing', canAutoplayTest);
            //_console.warn('Video canAutoplay :: ' + _getLocalTime(), [$(video), e]);

            context.AUTOPLAY = (e && e.type === 'playing' || video.currentTime !== 0);

            DONE_AUTOPLAY = true;

            video.parentNode.removeChild(video);
        };

        vStyle.position = 'absolute';
        vStyle.height = 0;
        vStyle.width = 0;

        try {
            if (context.HTML5VIDEO['mp4']) {
                video.src = 'data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAz5tb292AAAAbG12aGQAAAAAzaNa'
                    + 'cc2jWnEAAV+QAAFfkAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAA'
                    + 'AAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////3//AAACQ3RyYWsAAABcdGtoZAAAAAHNo1pxzaNac'
                    + 'QAAAAEAAAAAAAFfkAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAEAAAABAAA'
                    + 'AAAAd9tZGlhAAAAIG1kaGQAAAAAzaNacc2jWnEAAV+QAAFfkFXEAAAAAAAhaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAA'
                    + 'AAAAAGWbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABVnN0Y'
                    + 'mwAAACpc3RzZAAAAAAAAAABAAAAmWF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAEAAQAEgAAABIAAAAAAAAAAEOSlZUL'
                    + '0FWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwH0AAr/4QAZZ/QACq609NQYBBkAAAMAAQAAAwAKjxImo'
                    + 'AEABWjOAa8gAAAAEmNvbHJuY2xjAAYAAQAGAAAAGHN0dHMAAAAAAAAAAQAAAAUAAEZQAAAAKHN0c3oAAAAAAAAAAAAAAAUAA'
                    + 'AIqAAAACAAAAAgAAAAIAAAACAAAAChzdHNjAAAAAAAAAAIAAAABAAAABAAAAAEAAAACAAAAAQAAAAEAAAAYc3RjbwAAAAAAA'
                    + 'AACAAADYgAABaQAAAAUc3RzcwAAAAAAAAABAAAAAQAAABFzZHRwAAAAAAREREREAAAAb3VkdGEAAABnbWV0YQAAAAAAAAAha'
                    + 'GRscgAAAAAAAAAAbWRpcgAAAAAAAAAAAAAAAAAAAAA6aWxzdAAAADKpdG9vAAAAKmRhdGEAAAABAAAAAEhhbmRCcmFrZSAwL'
                    + 'jkuOCAyMDEyMDcxODAwAAACUm1kYXQAAAHkBgX/4NxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxMjAgLSBILjI2NC9NU'
                    + 'EVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDExIC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sI'
                    + 'C0gb3B0aW9uczogY2FiYWM9MCByZWY9MSBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgxOjAgbWU9ZXNhIHN1Ym1lPTkgN0PTA'
                    + 'cHN5PTAgbWl4ZWRfcmVmPTAgbWVfcmFuZ2U9NCBjaHJvbWFfbWU9MSB0cmVsbGlzPTAgOHg4ZGgY3FtPTAgZGVhZHpvbmU9M'
                    + 'jEsMTEgZmFzdF9wc2tpcD0wIGNocm9tYV9xcF9vZmZzZXQ9MCB0aHJlYWRzPTYgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY'
                    + '2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlna'
                    + 'HRwPTAga2V5aW50PTUwIGtleWludF9taW49NSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmM9Y3FwIG1idHJlZT0wI'
                    + 'HFwPTAAgAAAAD5liISscR8A+E4ACAACFoAAITAAAgsAAPgYCoKgoC+L4vi+KAvi+L4YfAEAACMzgABF9AAEUGUgABDJiXnf4'
                    + 'AAAAARBmiKUAAAABEGaQpQAAAAEQZpilAAAAARBmoKU';
            } else {
                return failedResponse();
            }
        } catch (e) {
            return failedResponse();
        }

        video.setAttribute('autoplay', '');
        video.style = 'display:none';
        docElement.appendChild(video);

        setTimeout(function () {
            video.addEventListener('playing', canAutoplayTest);
            //_console.warn('video.addEventListener("playing") :: ' + _getLocalTime(), video);
            canPlayTimeout = setTimeout(canAutoplayTest, 300);
        }, 0);
    }

    function hasFlash() {
        var context = this;
        context.FLASH = false;
        var docElement = document.documentElement;
        var hasFlashTest = function (result, obj) {
            var _bool = !!result;
            if (_bool) {
                _bool = new Boolean(_bool);
                _bool.blocked = (result === 'blocked');
                getSWF_scripts(_bool);
                getFlashDetect_Scripts(_bool);
            }
            //_console.warn('Has FLASH', _bool);
            context.FLASH = _bool;
            DONE_FLASH = true;
            if (obj) _body.removeChild(obj);
        };

        var _detected, _activex;
        try {
            _activex = 'ActiveXObject' in window
                && 'Pan' in new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        } catch (e) {
            _console.error('Error reading ActiveXObject', e);
        }

        _detected = !(('plugins' in navigator && 'Shockwave Flash' in navigator.plugins) || _activex);

        if (_detected) {
            hasFlashTest(false);
        } else {
            // flash seems to be installed, but it might be blocked. We have to
            // actually create an element to see what happens to it.
            var embed = document.createElement('embed');
            var _body = context.__getBody();
            var inline_style;

            embed.type = 'application/x-shockwave-flash';

            // Need to do this in the body (fake or otherwise) otherwise IE8 complains
            _body.appendChild(embed);

            // Pan doesn't exist in the embed if its IE (its on the ActiveXObjeect)
            // so this check is for all other browsers.
            if (!('Pan' in embed) && !_activex) {
                hasFlashTest('blocked', embed);
                return;
            }

            // If we have got this far, there is still a chance a userland plugin
            // is blocking us (either changing the styles, or automatically removing
            // the element). Both of these require us to take a step back for a moment
            // to allow for them to get time of the thread, hence a setTimeout.
            setTimeout(function () {
                if (!docElement.contains(embed)) {
                    hasFlashTest('blocked');
                }
                else {
                    inline_style = embed.style.cssText;
                    hasFlashTest((inline_style !== '') ? 'blocked' : true, embed);
                }

                if (_body.fake && _body.parentNode) {
                    _body.parentNode.removeChild(_body);
                }
            }, 10);
        }

    }

    function getSWF_scripts(parentObj) {
        $.getScript('http://ajax.googleapis.com/ajax/libs/swfobject/2/swfobject_src.js',
            function (data, textStatus, jqxhr) {
                getFlashPlayerVersion(parentObj);
            });
    }

    var _flashCounter = 999;

    function getFlashPlayerVersion(parentObj) {
        parentObj.version = null;

        if (window.swfobject) {
            //console.info('GOT IT', swfobject);
            var os = "";
            if (swfobject.ua.mac == true) os = "Mac";
            if (swfobject.ua.win == true) os = "Windows";
            parentObj.version = updateFlashPlayerDisplay(getFlashPlayerVersionDotNotation(), os);
        } else {
            if (!_flashCounter > 0) return;
            //console.warn('waiting for Flash SWF Scripts');
            setTimeout(function () {
                _flashCounter--;
                getFlashPlayerVersion(parentObj);
            }, 10);
        }
    }

    function getFlashPlayerVersionDotNotation() {
        var playerVersion = swfobject.getFlashPlayerVersion();
        return playerVersion.major + "." + playerVersion.minor + "." + playerVersion.release
    }


    function updateFlashPlayerDisplay(fpVersionString, operatingSystem) {
        var resultString;
        resultString = fpVersionString;
        if (operatingSystem != "") resultString += " on " + operatingSystem;
        if (window['PluginDetect']) {
            //resultString += " | Silverlight: " + PluginDetect.getVersion('Silverlight');
            //resultString += " | Java: " + PluginDetect.getVersion('Java');
            //resultString += " | QuickTime: " + PluginDetect.getVersion('QuickTime');
        }
        return resultString;
    }

    function getFlashDetect_Scripts(parentObj) {
        $.getScript('http://www.featureblend.com/flash_detect_1-0-4/flash_detect_min.js',
            function (data, textStatus, jqxhr) {
                getFlashDetectLegacy(parentObj);
            });
    }

    var _flashCounter_2 = 999;

    function getFlashDetectLegacy(parentObj) {
        parentObj.legacy = null;
        var utils = base.utils;
        if (window['FlashDetect']) {
            //console.info('GOT IT', FlashDetect);
            parentObj.legacy = utils.cloneObjToJson(FlashDetect);
        } else {
            if (!_flashCounter_2 > 0) return;
            //console.warn('waiting for Flash Detect Scripts');
            setTimeout(function () {
                _flashCounter_2--;
                getFlashDetectLegacy(parentObj);
            }, 10);
        }
    }
})(window.$base, jQuery);