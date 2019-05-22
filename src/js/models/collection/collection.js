/**
 * collection js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */

export default class Collection {
  constructor() {
    this.collection = new Set();
  }

  get size() {
    return this.collection.size;
  }

  get keys() {
    return this.collection.keys();
  }

  get values() {
    return this.collection.values();
  }

  get entries() {
    return this.collection.entries();
  }

  toArray() {
    return [...this.entries];
  }

  has(value) {
    return this.collection.has(value);
  }

  hasAll(...values) {
    for (let i = 0; i < values.length; i++) {
      if (!this.has(values[i])) return false;
    }
    return true;
  }

  hasAny(...values) {
    for (let i = 0; i < values.length; i++) {
      if (this.has(values[i])) return true;
    }
    return false;
  }

  add(type, ...entry) {
    this.collection[type](...entry);
  }

  addMany(type, ...entries) {
    for (let i = 0; i < entries.length; i++) {
      this.add(type, ...entries[i]);
    }
  }

  remove(keys) {
    this.collection.delete(keys);
  }

  removeMany(...keys) {
    for (let i = 0; i < keys.length; i++) {
      this.remove(...keys[i]);
    }
  }

  removeAll() {
    this.collection.clear();
  }

  forEach(cb, owner) {
    this.collection.forEach(cb, owner);
  }

  isSuper(sub) {
    for (let [key, value] of sub) {
      if (!this.has(key)) return false;
    }
    return true;
  }

  merge(SubCollection, other) {
    return new SubCollection([...this.collection, ...other]);
  }

  difference(SubCollection, other, exclusive) {
    if (other instanceof Collection) {
      other = other.collection;
    }
    const set = new SubCollection(this.collection);
    for (let [key, value] of other) {
      if (!exclusive) {
        set.remove(key);
      } else if (set.has(key)) {
        set.remove(key);
      } else {
        set.add(key, value);
      }
    }
    return set;
  }

  match(SubCollection, otherCol) {
    let set,
      other;
    if (this.size < otherCol.size) {
      set = new SubCollection(this.collection);
      other = otherCol;
    } else {
      set = new SubCollection(otherCol);
      other = this;
    }
    for (let [key, value] of set) {
      if (!other.has(key)) set.remove(key);
    }
    return set;
  }
}


function valueFromDataType(obj) {
  const _typeof = typeof obj;
  if (_typeof === 'string') return '';
  if (_typeof === 'number') return 0;
  if (_typeof === 'boolean') return false;
  if (Array.isArray(obj)) return [];
  if (Object.prototype.toString.call(obj) === '[object Object]') return {};

  return undefined;
}
