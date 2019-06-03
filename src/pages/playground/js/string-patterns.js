/**
 * string-patterns js file created by Tamara G. Mack on 26-May-19 for
 * tamaramack.github.io
 */
import {
  isDistinct,
  isNumber,
  distinctString,
  getSetOf,
  removeDuplicates,
  clone,
  compare,
  sum,
  substringCount
} from '@/js/utilities/utilities';
import {
  SubstringObject,
  StringObject
} from '@/js/models/objects/string-object';
import {
  MapCollection,
  SetCollection
} from '@/js/models/collections';
import Tree from './string-tree';

export default class StringPatterns extends MapCollection {
  constructor(s, charCount, getSubs = false) {
    super();
    defineProperties.call(this, s, charCount);

    this.distinct();
    this.loop();
    if (getSubs) this.getSubstrings();
  }

  getSubstrings() {
    const set = [];
    for (let value of this.values) {
      if (value.maxLength) break;
      this.mapPatterns(value, set);
      set[set.length] = value.subs.toArray();
    }
    this.set = new SetCollection(set.flat());
  }

  distinct() {
    const s = this.s,
      charCount = this.charCount;

    const set = s.getSubs(charCount);
    if (charCount === 1) return this.patterns.addMany(set.toArray('entries'));

    for (let value of set.values) this.sortedDistinct(value);

    if (charCount > 1) this.removeRejectedDistinct();
  }

  loop() {
    const values = [];
    for (let [key, variations] of this.patterns.entries) {
      const obj = this.map(key, variations);

      if (!obj) continue;

      this.mainIncludes(obj);
      values[values.length] = [key, obj];
    }

    this.addMany(values);
  }

  mapPatterns(obj) {
    obj.values = obj.values.sort((a, b) => a.s.length - b.s.length);

    let arr = obj.values;
    obj.maxLength = (arr[arr.length - 1]).s.length;

    const setEntries = (new Array(obj.maxLength)).fill(null);
    let sets = new MapCollection(setEntries.map((v, i) => [i + 1, []]));
    let substrings = obj.subs;
    let lastC = obj.maxLength > 3000 ? 20 : 200;

    // verify initial run
    if (!obj.subs.size && obj.distinct.length > 1) {
      lastC = loopSubstring(0, (arr[arr.length - 1]).s, lastC, sets);
    } else {
      let lens = [];
      for (let sub of substrings.keys) {
        const arr = sets.get(sub.length);
        arr[arr.length] = sub;
        lens[lens.length] = sub.length;
      }
      lastC = lens.sort((a, b) => a - b).pop();
    }

    for (let i = 0; i < arr.length; i++) {
      const cluster = arr[i],
        str = cluster.s,
        sLen = str.length;
      let lenArr = sets.get(sLen);

      if (sLen <= lastC || lenArr.includes(str.toString())) continue;

      if (obj.distinct.length === 1) {
        lastC = loopSingleChar(lastC, str, sets);
        continue;
      }

      if (sLen > 3000) {
        lastC = giganticSubstring(lastC, str, sets);
      } else {
        lastC = loopSubstring(lastC, str, 200, sets);
        if (sLen > lastC) clusterIteration(lastC, str, sets);
      }
    }

    substrings = substrings.merge(new SetCollection(sets.toArray('values').flat()));

    for (let value of sets.values) value = [...(new Set(value))];

    obj.sets = sets;
    obj.subs = substrings.clone();
    this.s.addSubs(substrings);
    console.debug('distinct map', obj);
  }

  map(distinct, variations) {
    const s = this.s,
      obj = {
        distinct,
        maxLength: 0,
        subs: new SetCollection(),
        values: [],
        variations
      };
    let start = 0;

    while ((start + distinct.length) < s.length) {
      if (distinct === variations) {
        start = s.indexOf(distinct, start);
      } else {
        start = firstIndex(variations, s, start);
      }

      if (start < 0) break;
      const cluster = this.clusters(distinct, start);

      if (!cluster) {
        start += 1;
        continue;
      }

      obj.values.push(cluster);
      start = cluster.i;
    }

    if (obj.values.length) return obj;
  }

  sortedDistinct(value) {
    const sortDistinct = this.patterns;
    if (isDistinct(value)) {
      const sorted = ([...value].sort()).join('');
      if (sortDistinct.has(sorted)) {
        const arr = sortDistinct.get(sorted);
        arr[arr.length] = value;
        sortDistinct.add(sorted, arr);
      } else {
        sortDistinct.add(sorted, [value]);
      }
    }
  }


  removeRejectedDistinct() {
    const sortDistinct = this.patterns;
    const arr = sortDistinct.toArray();
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i][0],
        values = arr[i][1];
      if (values.length < key.length) {
        sortDistinct.remove(key);
      }
    }
  }

  clusters(pat, start) {
    const s = this.s;
    const condition = index => (!s[index] || !pat.includes(s[index]));
    let i = start + pat.length,
      cluster = s.slice(start, i);

    while (i < s.length) {
      let iteration = Number(i);
      i += 1;
      if (condition(iteration)) break;
      cluster += s[iteration];
    }

    if (cluster.length > pat.length * 2) {
      cluster = new StringObject(cluster);
      return {
        s: cluster,
        l: cluster.length,
        i
      };
    }

    return false;
  }

  mainIncludes(obj) {
    const value = obj.values[obj.values.length - 1];
    let subs = obj.subs;

    const mainSubs = this.s.subs.toArray();
    for (let i = 0; i < mainSubs.length; i += 1) {
      const curr = mainSubs[i];
      if (value.s.includes(curr)) subs.add(curr);
    }
  }
}

function giganticSubstring(lastC, sub, sets) {
  const halfway = Math.floor(sub.length / 2);
  let subs = getSetOf(sub, halfway, true);
  sets.add(halfway, [...subs]);

  const o = {
    halfway,
    lastC,
    start: subs.size - 1,
    end: sub.length - subs.size + 1
  };
  // sets.add(o.start, getSetOf(sub, o.start));
  // sets.add(o.end, getSetOf(sub, o.end));
  console.debug('giganticSubstring', sub.length, subs.size, o);
  return lastC;
}

function loopSubstring(lastC, sub, num, sets) {
  num += lastC;
  const ternary = sub.length < 100 ? sub.length : num;
  let len = (num > sub.length ? sub.length : ternary);

  for (let i = lastC; i < len; i += 1) {
    const key = i + 1;
    let arr = [];
    if (sets.has(key)) {
      arr = sets.get(key);
    }

    let subs = sub.getSubs(key);
    arr = [...arr, ...subs.toArray()];
    sets.add(key, arr);
    lastC = key;
  }

  return lastC;
}

function loopSingleChar(lastC, sub, sets) {
  let i = lastC,
    p = sub.slice(0, i);
  while (sub.length > i) {
    p += sub[i];
    sets.add(p.length, [p]);
    i += 1;
    lastC = i;
  }

  return lastC;
}

function clusterIteration(count = 200, str, sets) {
  for (let i = 0; i < str.length - count; i += 1) {
    let sub = str.slice(i, i + count);
    for (let j = i + count; j < str.length; j += 1) {
      sub += str[j];
      const arr = sets.get(sub.length);
      arr[arr.length] = sub;
    }
  }
}

function defineProperties(s, charCount) {
  Object.defineProperties(this, {
    charCount: {
      value: charCount,
      enumerable: true
    },
    s: {
      get() {
        return s;
      },
      enumerable: true
    },
    patterns: {
      value: new MapCollection(),
      enumerable: true
    }
  });
}

function firstIndex(values, s, start) {
  let arr = [];
  let i = values.length;
  while (i--) {
    const n = s.indexOf(values[i], start);
    if (n !== -1) arr[arr.length] = n;
  }
  return arr.length ? (arr.sort())[0] : -1;
}
