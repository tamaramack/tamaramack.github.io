/**
 * global file for tamaramack.github.io on 27-Feb-17.
 */

(function(){
    var _console = window['console'];

    function _decode(str) {
        var txt = document.createElement("textarea");
        txt.innerHTML = decodeURIComponent(str);
        if (!(typeof txt.value === 'string')) {
            txt.value = '';
            _console.warn('object IS NOT a string in _decode.');
        }
        str = (txt.value).toString();
        delete txt;
        return str;
    }

    function retDefault(_object, defValue) {
        if (!!_object) return _object;
        return defValue || false;
    }

    function isUndef(_object) {
        return typeof _object === 'undefined';
    }

    var jsonString = _decode(window.$GLOBAL_PARAMETERS.$DATASTRING);
    jsonString = jsonString.length ? JSON.parse(jsonString) : {};
    delete window.$GLOBAL_PARAMETERS.$DATASTRING;

    _console.debug('JSON STRING QUERY', jsonString);

    var page = window.$GLOBAL_PARAMETERS = window.$GLOBAL_PARAMETERS || {};
    page.$DEBUG = jsonString.debug || 0;
    page.$DEBUG_MODE = testDebugMode(jsonString.debugMode) || 0;
    page.$VERSION = jsonString.version || false;
    page.$ADS = isUndef(jsonString.ads) ? 1 : jsonString.ads;
    page.$CONTROL_RACK = jsonString.controlRack || 0;

    page.$PLAYER_AUTOPLAY = jsonString.autoplay || 0;
    page.$PLAYER_TYPE = retDefault(jsonString.playerType, 'native');

    page.$PAGE_BRAND = retDefault(jsonString.brand, 'nbcnews');
    page.$PAGE_BRANCH = retDefault(jsonString.branch, 'qa');
    page.$PAGE_PRESET = retDefault(jsonString.preset);
    page.$ADBLOCK = window.hasOwnProperty('_ADBLOCK') ? window._ADBLOCK : false;

    page.$PLAYLIST_CONTINUOUS = jsonString.continuous || 1;
    page.$PLAYLIST_LIVE = jsonString.live || 0;
    page.$PLAYLIST_ASSETS = [];

    page.$LOG_STORAGE = {};
    page.$PAGE_STATIC = jsonString._page;
    page.$SYSTEM_ENVIRONMENT = jsonString._environment;
    page.$PAGE_SOURCEPATH = jsonString._page.sourcePath;


    function testDebugMode(_object) {
        if (typeof _object !== 'string') return _object;
        return _object.split(',');
    }
})();
