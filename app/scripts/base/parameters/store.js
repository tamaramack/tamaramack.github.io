/**
 * store file for tamaramack.github.io on 22-Mar-17.
 */

(function (base) {
  const $STORAGE = {};

  function StoreModel() {
    Object.defineProperties(this, {
      timestamp: { value: Date.now() }
      , modules: { value: [] }
    });
  }

  StoreModel.prototype = Object.create({
    constructor: StoreModel
  }, {
    push: _define(push)
    , unshift: _define(unshift)
    , splice: _define(splice)
    , getIndex: _define(getIndex)
    , getItem: _define(getItem)
    , getModuleIndex: _define(getModuleIndex)
    , getModule: _define(getModule)
    , length: {
      get: _length,
      enumerable: true
    }
  });

  Object.defineProperty(base.parameters, 'store', {
    value: new StoreModel(),
    enumerable: true
  });

  function push() {
    var item,
      moduleName;
    const items = arguments.slice();

    for (let i = 0; i < items.length; i++) {
      if (!(items[i]).module) continue;

      item = items[i];
      moduleName = item.module;
      moduleChk.call(this, moduleName);
      ($STORAGE[moduleName]).push(item);
    }
  }

  function unshift() {
    var item,
      moduleName;
    const items = arguments.slice();
    let i = items.length;

    while (i--) {
      if (!(items[i]).module) continue;

      item = items[i];
      moduleName = item.module;
      moduleChk.call(this, moduleName);
      ($STORAGE[moduleName]).unshift(item);
    }
  }

  function splice(module, start, deleteCount) {
    if (!isNaN(+module)) module = this.modules[module];
    if (!$STORAGE[module]) return false;
    return ($STORAGE[module]).splice.apply($STORAGE[module], arguments.slice(1));
  }

  function getIndex(item) {
    if (!item.module) return [-1, -1];

    const indexArr = [];
    const arr = $STORAGE[item.module] || [];
    let i = arr.length;
    while (i--) {
      if (arr[i] !== item) continue;
      indexArr.push(i);
    }

    if (!indexArr.length) indexArr.push(-1);
    indexArr.push(this.getModuleIndex(item.module));

    return indexArr; // [itemIndex, moduleIndex]
  }

  function getItem(index, module) {
    if (base.utils.isArray(index)) {
      module = index[1];
      index = index[0];
    }
    if (!isNaN(+module)) module = this.modules[module];
    if (!module) return false;

    return $STORAGE[module][index];
  }

  function getModuleIndex(module) {
    let i = this.modules.length;
    while (i--) if (this.modules[i] === module) return i;

    return -1;
  }

  function getModule(module) {
    if (!isNaN(+module)) module = this.modules[module];
    return $STORAGE[module];
  }

  function _length() {
    let count = 0,
      i = (this.modules).length;
    var module;
    while (i--) {
      module = this.modules[i];
      count += ($STORAGE[module]).length;
    }
    return count;
  }

  function moduleChk(module) {
    if (!!$STORAGE[module]) return;
    this.modules.push(module);
    Object.defineProperty($STORAGE, module, {
      value: [],
      configurable: true
    });
  }

  function _define(obj) {
    return {
      value: obj,
      enumerable: true
    };
  }
}(window.$base));
