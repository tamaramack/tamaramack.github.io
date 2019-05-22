/**
 * set-collection js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
import Collection from './collection';

export default class SetCollection extends Collection {
  constructor(values) {
    if (values instanceof Collection) {
      values = values.collection;
    }
    super();
    Object.defineProperties(this, {
      collection: {
        value: new Set(values)
      }
    });
  }

  get keys() {
    return this.collection.values();
  }

  toArray(type) {
    switch (type) {
      case 'entries':
        return [...this.entries];
      case 'keys':
      case 'values':
      default:
        return [...this.values];
    }
  }

  add(value) {
    super.add('add', value);
  }

  addMany(...values) {
    super.addMany('add', ...values);
  }

  merge(otherSet) {
    return super.merge(SetCollection, otherSet);
  }

  difference(otherSet, exclusive) {
    return super.difference(SetCollection, otherSet, exclusive);
  }

  match(otherSet) {
    return super.match(SetCollection, otherSet);
  }
}
