/**
 * dom-element file for tamaramack.github.io on 21-Mar-17.
 */

(function (base) {
  function DOMElementModel(element, showAllProperties) {
    if (!element) return {};
    Object.defineProperty(this, '$MAPPED_ELEMENT', {
      value: Date.now()
    });

    for (var prop in element) {
      if (prop.substring(0, 2) === 'on') continue;
      var item = element[prop],
        _typeof = (Object.prototype.toString.call(item)),
        regex = /(undefined|null|string|number|boolean|array)/;

      if (regex.test(_typeof.toLowerCase())) this[prop] = item;
      else if (showAllProperties) this[prop] = _typeof;
    }
  }

  Object.defineProperty(base.models, 'DOMElementModel', {
    value: DOMElementModel,
    enumerable: true
  });
}(window.$base));
