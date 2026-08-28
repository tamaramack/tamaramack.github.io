/**
 * table js file created by Tamara G. Mack on 28-May-19 for tamaramack.github.io
 */
import Collection from './collection-base';
import MapCollection from './map';

export class ObjectCollection extends Collection(Object) {
  constructor(keyMap, entries) {
    super();
    Object.defineProperties(this, {
      collection: {
        value: new Map(Object.fromEntries(entries))
      },
      columnKeys: {
        value: keyMap
      },
      fk: {
        value: new Set()
      }
    });
  }

  get size() {
    return this.keys.size;
  }

  get keys() {
    return this.keys.values();
  }

  get values() {
    return Object.values(this.collection);
  }

  get entries() {
    return Object.entries(this.collection);
  }

  toArray(type) {
    switch (type) {
      case 'values':
        return this.values;
      case 'keys':
        return this.keys;
      case 'entries':
      default:
        return this.entries;
    }
  }

  has(value) {
    return this.keys.has(value);
  }

  get(key) {
    return this.collection[key];
  }

  add(key, value) {
    this.collection[key] = value;
    this.keys.add(key);
  }

  addMany(...entries) {
    if (entries.length === 1 && Array.isArray(entries[0])) {
      entries = entries[0];
    }
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      this.add(...entry);
    }
  }

  update(key, value) {
    if (this.keys.has(value)) {
      this.collection[key] = value;
    }
  }

  remove(key) {
    delete this.collection[key];
    this.keys.delete(key);
  }

  removeAll() {
    for (let value of this.keys.values()) {
      delete this.collection[value];
    }
    this.keys.clear();
  }

  forEach(cb, owner) {
    this.keys.forEach(key => (cb.call(owner, key, this.collection[key])), owner);
  }

  merge(otherMap) {
    return super.merge(ObjectCollection, otherMap);
  }

  difference(otherMap, exclusive) {
    return super.difference(ObjectCollection, otherMap, exclusive);
  }

  match(otherMap) {
    return super.match(ObjectCollection, otherMap);
  }
}
