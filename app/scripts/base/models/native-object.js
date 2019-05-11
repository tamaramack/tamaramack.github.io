/**
 * native-object file for tamaramack.github.io on 21-Mar-17.
 */

(function (base) {
  function NativeObjectModel(_object, depthNumber) {
    var { utils } = base,
      isDomElement = utils.isDomElement || function () { return false; };
    if (!_object || (utils.isArray(_object))) return _object;


    depthNumber = isNaN(+(depthNumber)) ? 2 : depthNumber;
    Object.defineProperty(this, '$MAPPED_NATIVE', {
      value: Date.now()
    });

    for (var prop in _object) {
      var M,
        item = _object[prop],
        _typeof = (Object.prototype.toString.call(item)),
        regex = /(undefined|null|string|number|boolean|array)/;
      if (regex.test(_typeof.toLowerCase())) {
        this[prop] = item;
      } else if (isDomElement(item)) {
        M = base.models.DOMElementModel;
        this[prop] = new M(item);
      } else if (item instanceof Function) {
        if (!_object.hasOwnProperty(prop)) continue;
        var _toArray = ((item.toString()).replace(/(\r*)(\s+)/gm, ' ')).split(' '),
          _newStringArray = [];
        if (_toArray.length > 7) _newStringArray.push(_typeof);
        else _newStringArray = _toArray;

        this[prop] = (_newStringArray).join(' ');
      } else if (_typeof === '[object Object]') {
        if ((depthNumber > 0) && _object.hasOwnProperty(prop)) {
          M = base.models.NativeObjectModel;
          depthNumber--;
          this[prop] = new M(item, depthNumber);
        }
      }
    }
  }

  Object.defineProperty(base.models, 'NativeObjectModel', {
    value: NativeObjectModel,
    enumerable: true
  });
}(window.$base));
