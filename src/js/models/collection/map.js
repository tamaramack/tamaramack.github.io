/**
 * map-collection js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
import Collection from './collection-base';

export default class MapCollection extends Collection(Map) {
  constructor(entries) {
    super(entries);
    Object.defineProperties(this, {
      list: {
        value: {}
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
    if (this.has(key)
      && !(value instanceof Collection || Array.isArray(value))) {
      const mapValue = this.get(key);
      if (mapValue instanceof Collection) {
        mapValue.add(value);
      } else if (Array.isArray(mapValue)) {
        mapValue[mapValue.length] = value;
      }
    } else {
      this.add(key, value);
    }
  }

  clone() {
    return super.clone(MapCollection);
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
