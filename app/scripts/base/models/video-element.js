/**
 * video-element file for tamaramack.github.io on 21-Mar-17.
 */

(function(base){

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
        this.fullscreen = base.utils.detect.detectFullscreenSupport(element);
    }


    Object.defineProperty(base.models, 'VideoElementModel', {
        value: VideoElementModel,
        enumerable: true
    });

    function __map(arr, isMediaParam) {
        var utils = base.utils;
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

})(window.$base);
