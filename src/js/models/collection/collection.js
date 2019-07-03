/**
 * collection js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */

export class Collection {
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

  get(key) {
    return this.collection.get(key);
  }

  add(type, ...entry) {
    this.collection[type](...entry);
  }

  addMany(type, ...entries) {
    if (entries.length === 1 && Array.isArray(entries[0])) {
      entries = entries[0];
    }
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (Array.isArray(entry)) {
        this.collection[type](...entry);
      } else {
        this.collection[type](entry);
      }
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
    for (let [key, value] of sub.entries) {
      if (!this.has(key)) return false;
    }
    return true;
  }

  clone(SubCollection) {
    return new SubCollection(this.collection);
  }

  compare(sub) {
    if (!(sub instanceof Collection)) return false;
    const _this = JSON.stringify(this.toArray('entries'));
    sub = JSON.stringify(sub.toArray('entries'));
    return _this === sub;
  }

  merge(SubCollection, other) {
    if (other instanceof Collection) {
      other = other.collection;
    }
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
