/**
 * dynamic-array file for ndp-video-spa on 07-Jun-16.
 */

(function (base) {
  function DynamicArrayAbstract(emptyArray) {
    emptyArray = Array.isArray(emptyArray) ? emptyArray : [];
    emptyArray = emptyArray.length ? [] : emptyArray;
    // console.warn('DynamicArrayAbstract init',emptyArray);

    Object.defineProperties(this, {
      timestamp: { value: Date.now() }
      , _pointer: {
        value: -1,
        writable: true
      }
      , array: { value: emptyArray }
    });
  }

  DynamicArrayAbstract.prototype = Object.create({
    constructor: DynamicArrayAbstract
  }, {
    add: { value: add }
    , remove: { value: remove }
    , removeAll: { value: removeAll }
    , goTo: { value: goTo }
    , raw: {
      get: function () {
        var arr = [],
          len = this.length;
        while (len--) {
          var item = (this.array[len]).data;
          arr.unshift(item);
        }
        return arr;
      },
      enumerable: true
    }
    , pointer: {
      get: function () {
        return this._pointer;
      },
      enumerable: true
    }
    , length: {
      get: function () {
        return this.array.length;
      },
      enumerable: true
    }
  });

  Object.defineProperty(base.models, 'DynamicArrayAbstract', {
    value: DynamicArrayAbstract,
    enumerable: true
  });

  function add(assetArray) {
    if (!Array.isArray(assetArray)) assetArray = [assetArray];
    var arr = [],
      i = assetArray.length;
    while (i--) if (assetArray[i]) {
      var item = new Item(assetArray[i], this);
      // console.warn('DynamicArrayAbstract',item);
      arr.unshift(item);
    }


    if (arr.length) this.array.push.apply(this.array, arr);
  }

  function remove(arr) {
    if (!Array.isArray(arr)) arr = [arr];

    var i = arr.length;
    while (i--) {
      var j = this.length;
      while (j--) {
        if ((this.array)[j] === arr[i]) {
          var removed = (this.array).splice(j, 1);
          break;
        }
        if ((this.array[j]).data === arr[i]) var removed = (this.array).splice(j, 1);
      }
    }
  }

  function removeAll() {
    var removed = (this.array).splice(0, this.length);
  }

  function goTo(index) {
    var len = this.length;
    if (isNaN(index) || index >= len || index < 0) return this.array[0];

    return this.array[index];
  }

  function Item(data, parent) {
    this.data = data;

    Object.defineProperties(this, {
      index: {
        get: function () {
          const _this = this;
          return (parent.array).findIndex(item => item.data === _this.data);
        },
        enumerable: true
      }
      , next: {
        get: function () {
          const nextIndex = (this.index) + 1;
          return parent.goTo(nextIndex);
        },
        enumerable: true
      }
      , previous: {
        get: function () {
          const previousIndex = (this.index) - 1;
          return parent.goTo(previousIndex);
        },
        enumerable: true
      }
    });
  }
}(window.$base));
