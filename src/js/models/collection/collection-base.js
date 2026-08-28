/**
 * collection js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
/** *
 *
 * @param BaseType
 * @constructor
 */
export default (BaseType = Object) => class extends BaseType {
  get size() {
    return super.size || super.length;
  }

  get keys() {
    if (super.keys) return [...super.keys(this)];
    return Object.keys(this);
  }

  get values() {
    if (super.values) return [...super.values(this)];
    return Object.values(this);
  }

  get entries() {
    if (super.entries) return [...super.entries(this)];
    return Object.entries(this);
  }

  toArray() {
    return [...this.entries];
  }

  has(value) {
    if (super.has) return super.has(value);
    if (!Array.isArray(this)) return this.keys.indexOf(value) > -1;
    return super.indexOf(value) > -1;
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
    if (super.get) return super.get(key);
    return this.get(key);
  }

  add(type, ...entry) {
    this[type](...entry);
  }

  addMany(type, ...entries) {
    if (entries.length === 1 && Array.isArray(entries[0])) {
      entries = entries[0];
    }
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (Array.isArray(entry)) {
        this[type](...entry);
      } else {
        this[type](entry);
      }
    }
  }

  remove(keys) {
    this.delete(keys);
  }

  removeMany(...keys) {
    for (let i = 0; i < keys.length; i++) {
      this.remove(...keys[i]);
    }
  }

  removeAll() {
    this.clear();
  }

  forEach(cb, owner) {
    this.forEach(cb, owner);
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
    const _this = JSON.stringify(this.toArray('entries'));
    sub = JSON.stringify(sub.toArray('entries'));
    return _this === sub;
  }

  merge(SubCollection, other) {
    return new SubCollection([...this.collection, ...other]);
  }

  difference(SubCollection, other, exclusive) {
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
};


function valueFromDataType(obj) {
  const _typeof = typeof obj;
  if (_typeof === 'string') return '';
  if (_typeof === 'number') return 0;
  if (_typeof === 'boolean') return false;
  if (Array.isArray(obj)) return [];
  if (Object.prototype.toString.call(obj) === '[object Object]') return {};

  return undefined;
}
