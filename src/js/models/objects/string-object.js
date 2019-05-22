/**
 * string-object js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
import {
  isNumber,
  substringCount,
  distinctString,
  setOf
} from '@/js/utilities/utilities';

import { SetCollection, MapCollection } from '@/js/models/collection';

export default class StringObject extends String {
  constructor(obj, index, count) {
    super(...[obj]);
    this.s = obj;
    this.indices = isNumber(index) ? [index] : [];
    this.distinct = distinctString(obj);
    this.unique = [];
    this.chars = new MapCollection();
    this.subs = new SetCollection(obj);
    this.count = count || 1;

    for (let key of this.subs.keys) {
      this.chars.add(key, substringCount(key, obj));
    }
  }

  getSubs(count, withCount) {
    let i = (this.length - count) < count ? this.length - count + 1 : +count;
    const sets = [];
    while (i--) {
      sets[sets.length] = [...setOf(this.slice(i), count)];
    }
    const set = new Set([].concat(...sets));
    if (withCount) {
      const map = new MapCollection();
      for (let value of set.values()) {
        map.add(value, substringCount(value, this));
      }
      return map;
    }
    return new SetCollection(set);
  }
}
