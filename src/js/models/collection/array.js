/**
 * array js file created by Tamara G. Mack on 21-May-19 for tamaramack.github.io
 */
import Collection from './collection-base';


export default class ArrayCollection extends Collection(Array) {
  constructor(entries) {
    super(...entries);
    Object.defineProperties(this, {
      set: {
        value: new Set(entries)
      }
    });
  }

  get size() {
    return this.length;
  }

  has(value) {
    return this.includes(value);
  }

  getValue(key) {
    return this.set.get(key);
  }

  getKey(value) {
    return this.indexOf(value);
  }

  toArray(type) {
    switch (type) {
      case 'values':
        return [...this.values];
      case 'keys':
        return [...this.keys];
      case 'entries':
        return [...this.entries];
      default:
        return [...this.collection];
    }
  }

  add(value) {
    this[this.length] = value;
    this.set.add(value);
  }

  addMany(...entries) {
    for (let i = 0; i < entries.length; i++) {
      this.add(...entries[i]);
    }
  }

  update(key, value) {
    const oldValue = this[key];
    this.splice(key, 1, value);
    this.set.delete(oldValue);
    this.set.add(value);
  }

  remove(value) {
    const key = this.indexOf(value);
    this.splice(key, 1);
    this.set.delete(value);
  }

  removeMany(...keys) {
    for (let i = 0; i < keys.length; i++) {
      this.remove(keys[i]);
    }
  }

  removeAll() {
    this.splice(0, this.length);
    this.set.clear();
  }

  merge(otherMap) {
    return super.merge(ArrayCollection, otherMap);
  }

  difference(otherMap, exclusive) {
    return super.difference(ArrayCollection, otherMap, exclusive);
  }

  match(otherMap) {
    return super.match(ArrayCollection, otherMap);
  }
}
