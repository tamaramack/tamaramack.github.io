/**
 * asset-model file for ndp-video-spa on 14-Jul-16.
 */

(function (base) {
  function AssetParameterModel(obj) {
    obj = obj || {};
    Object.defineProperties(this, {
      label: _define(obj.label || obj.input || `Playlist_${Date.now()}`)
      , type: _define(obj.type || 'playlistId')
      , input: _define(obj.input || '')
    });
  }

  Object.defineProperty(base.models, 'AssetParameterModel', {
    value: AssetParameterModel,
    enumerable: true
  });

  function _define(obj) {
    return {
      value: obj,
      enumerable: true,
      writable: true
    };
  }
}(window.$base));
