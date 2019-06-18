/**
 * set-collection js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
import Collection from './collection';

class SetBase extends Set {
  constructor(...data) {
    super(...data);
  }
}

const collectionPrototype = Object.getOwnPropertyDescriptors(Collection.prototype);
const setPrototype = Object.getOwnPropertyDescriptors(SetBase.prototype);
for (let prop in collectionPrototype) {
  if (!setPrototype[prop]) {
    setPrototype[prop] = collectionPrototype[prop];
  }
}
SetBase.prototype = Object.create(SetBase.prototype, setPrototype);

export default class SetCollection extends SetBase {
  constructor(values) {
    super(values);
    Object.defineProperties(this, {
      list: {
        value: []
      }
    });
  }

  get keys() {
    return this.values();
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

  get(value) {
    if (this.has(value)) {
      return value;
    }
    return undefined;
  }

  add(value) {
    super.add('add', value);
  }

  addMany(...values) {
    super.addMany('add', ...values);
  }

  sort(logic) {
    return new SetCollection(this.toArray().sort(logic));
  }

  clone() {
    return super.clone(SetCollection);
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