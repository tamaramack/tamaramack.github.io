/**
 * array js file created by Tamara G. Mack on 21-May-19 for tamaramack.github.io
 */
import Collection from './collection';

export default class ArrayCollection extends Collection {
  constructor(entries) {
    if (entries instanceof Collection) {
      entries = entries.collection;
    }
    super();
    Object.defineProperties(this, {
      collection: {
        value: Array.of(...entries)
      },
      distinct: {
        value: new Set(entries)
      }
    });
  }

  get size() {
    return this.collection.length;
  }

  has(value) {
    return this.collection.includes(value);
  }

  getValue(key) {
    return this.collection[key];
  }

  getKey(value) {
    return this.collection.indexOf(value);
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
    this.collection[this.collection.length] = value;
    this.distinct.add(value);
  }

  addMany(...entries) {
    for (let i = 0; i < entries.length; i++) {
      this.add(...entries[i]);
    }
  }

  update(key, value) {
    this.distinct.remove(this.collection[key]);
    this.collection[key] = value;
    this.distinct.add(value);
  }

  remove(key) {
    this.collection.splice(key, 1);
    this.distinct.delete(key);
  }

  removeMany(...keys) {
    for (let i = 0; i < keys.length; i++) {
      this.remove(keys[i]);
    }
  }

  removeAll() {
    this.collection.splice(0, this.collection.length);
    this.distinct.clear();
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
