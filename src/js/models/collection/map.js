/**
 * map-collection js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
import Collection from './collection';

export default class MapCollection extends Collection {
  constructor(entries) {
    if (entries instanceof Collection) {
      entries = entries.collection;
    }
    super();
    Object.defineProperties(this, {
      collection: {
        value: new Map(entries)
      }
    });
  }

  toArray(type) {
    switch (type) {
      case 'values':
        return [...this.values];
      case 'keys':
        return [...this.keys];
      case 'entries':
      default:
        return [...this.entries];
    }
  }

  add(key, value) {
    super.add('set', key, value);
  }

  addMany(...entries) {
    super.addMany('set', ...entries);
  }

  update(key, value) {
    this.add(key, value);
  }

  merge(otherMap) {
    return super.merge(MapCollection, otherMap);
  }

  difference(otherMap, exclusive) {
    return super.difference(MapCollection, otherMap, exclusive);
  }

  match(otherMap) {
    return super.match(MapCollection, otherMap);
  }
}
