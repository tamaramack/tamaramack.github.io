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

import { SetCollection, MapCollection, Collection } from '@/js/models/collection';

export default class StringObject extends String {
  constructor(obj, index, count) {
    super(...[obj]);
    this.s = obj;
    this.indices = isNumber(index) ? [index] : [];
    this.distinct = distinctString(obj, true);
    this.unique = [];
    this.chars = new MapCollection();
    this.subs = new SetCollection(obj);
    this.count = count || 1;
  }

  get uniCount() {
    return this.unique.length;
  }

  mapSubs(obj) {
    for (let key of this.subs.keys) {
      if (this.chars.has(key)) continue;
      const num = substringCount(key, obj || this);
      this.chars.add(key, num);
      if (num === 1) this.unique[this.uniCount] = key;
    }
  }

  addSubs(set, map) {
    if (set instanceof Collection) {
      set = set.toArray('values');
    }
    this.subs.addMany(set);
    if (map) this.mapSubs();
  }


  getSubs(num, {
    deep = true,
    count = false,
    unique = false
  } = {}) {
    const sets = [];
    getSets.call(this, num, deep, sets);

    const set = new SetCollection([].concat(...sets));
    if (count || unique) return mapCount(set, count, unique);

    return set;
  }
}

function getSets(num, deep, sets) {
  const dLen = this.distinct.length;
  if (dLen === 1) deep = false;

  if (deep && dLen !== 2) {
    let i = (this.length - num) < num ? this.length - num + 1 : +num;
    while (i--) sets[sets.length] = [...setOf(this.slice(i), num)];
  } else if (deep && dLen === 2) {
    const count = num < 15 ? num : 15;
    let i = (this.length - count) < count ? this.length - count + 1 : count;
    while (i--) sets[sets.length] = [...setOf(this.slice(i), num)];
  } else {
    sets[sets.length] = [...setOf(this, num)];
  }
}

function mapCount(set, count, unique) {
  const map = new MapCollection();
  for (let value of set.values) {
    const howmany = count ? substringCount(value, this) : 1;
    const str = new StringObject(value, 0, howmany);
    if (unique) str.mapSubs();
    map.add(value, str);
  }
  return map;
}
