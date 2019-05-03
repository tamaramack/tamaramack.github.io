export class SubSets {
  constructor(s) {
    Object.defineProperties(this, {
      id: {
        get() {
          return s;
        },
        enumerable: true
      },
      set: {
        value: new Set([...s])
      },
      positions: {
        value: new Map()
      }
    });
  }

  has(sub) {

  }
}

export class Collection {
  constructor(...items) {
    const array = [...items];
    Object.defineProperties(this, {
      array: {
        get() {
          return array;
        }
      },
      set: {
        value: new Set(array)
      }
    });
  }

  get length() {
    return this.array.length;
  }

  has(value) {
    return this.set.has(value);
  }

  add(functional, ...values) {
    for (let i = 0; i < values.length; i++)
      addValue.call(this, functional, values[i]);
  }

  forEach(cb) {
    const { array, length } = this;
    for (let i = 0; i < length; i++) cb(array[i], i, array);
  }

  reduce(cb, accummulator) {
    const { array, length } = this;
    if (accummulator === undefined)
      accummulator = accummulator || retDataType(array[0]) || [];
    for (let i = 0; i < length; i++)
      accummulator = cb(accummulator, array[i], i, array);
    return accummulator;
  }
}

function retDataType(obj) {
  const _typeof = typeof obj;
  if (_typeof === 'string') return '';
  if (_typeof === 'number') return 0;
  if (_typeof === 'boolean') return false;
  if (Array.isArray(obj)) return [];
  if (Object.prototype.toString.call(obj) === '[object Object]') return {};

  return undefined;
}

function addValue(functional, value) {
  if (typeof functional === 'function') functional(value);
  if (this.has(value)) return;
  this.set.add(value);
  this.array[this.length] = value;
}
