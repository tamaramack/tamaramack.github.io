import { QuerySet } from './query-model';

export {
  SubstringSet,
  QuerySet
};
'use strict;';

const totalCount = 300;

class SubstringSet {
  constructor(s, queries) {
    Object.defineProperties(this, {
      org: {
        get() {
          return s;
        },
        enumerable: true
      },
      sets: {
        value: new Map()
      },
      patterns: {
        value: new Map()
      },
      queriedSets: {
        value: new Map()
      }
    });

    this.findPatterns();
    this.mapQueries(queries);
    this.mapSmallSubs(totalCount /* this.queries.sortedLengths.length >> 3 */);
  }

  get results() {
    return this.queries.results;
  }

  has(s) {
    return this.sets.has(s);
  }

  filter(...data) {
    return filter.call(this, ...data);
  }

  add(query) {
    const ss = query.sub;

    let item = null;
    let count = false;
    if (!this.queriedSets.has(ss)) {
      item = new SubModel(ss, query, this);
      this.queriedSets.set(ss, item);
      count = item.count;

      if (item.pattern) {
        let value = this.patterns.get(item.pattern);
        value.sets.add(ss);
      }
    } else {
      item = this.queriedSets.get(ss);
      item.q.push(this.queries.queries[query.position]);
      count = item.count;
    }

    if (count) {
      this.queries.results[item.position] = count;
      this.queries.removeQuery(query);
      // console.info('add set, remove query', count, query);
    }
  }

  addSet(s, distinctArray) {
    if (this.sets.has(s)) {
      let value = this.sets.get(s);
      distinctArray = distinctArray.concat(value.keys());
    }
    this.sets.set(s, new Set(distinctArray));
  }

  mapQueries(queries) {
    Object.defineProperty(this, 'queries', {
      value: new QuerySet(queries, this)
    });

    for (let [key, value] of this.patterns) for (let i = 0; i < value.clusters.length; i++) {
      const cluster = value.clusters[i];
      const end = cluster.i + cluster.length;
      handlePatternsInQueries.call(this, cluster.i, end, (key.length === 1));
    }
  }

  mapSmallSubs(count) {
    const keys = this.queries.sortedLengths;
    let i = 0;
    while (count > keys[i]) {
      const positionArray = this.queries.lengths.get(keys[i]);
      for (let j = 0; j < positionArray.length; j++) {
        const position = positionArray[j];
        const query = this.queries.queries[position];
        this.add(query);
      }
      i += 1;
    }
    console.debug('mapSmallSubs', this.queriedSets.size);
  }

  distinctSubstrings(s, start = 0, subsets = new Set()) {
    const loopTermination = ContinuousLoopTermination(10, '', (init, current) => init === current);

    topLoop: for (let i = start; i < s.length; i++) {
      let ss = '';
      for (let j = i; j < s.length; j++) {
        ss += s[j];
        if (subsets.has(ss)) continue;
        subsets.add(ss);

        if (loopTermination(ss)) {
          console.warn(ss, s.length, i, j, subsets, s);
          break topLoop;
        }
      }
    }
    return subsets;
  }

  findPatterns() {
    // rules:
    // 1 letter repeat more than 5 times
    // 2 letter pattern, contains 1-3 repeats of single letter and/or second letter
    //  more than three times
    // 3 letter pattern, same as second letter pattern
    patterns.call(this);
  }
}

class SubModel {
  constructor(s, query, store) {
    const u = query.withinPattern || removeDuplicates(...s);

    let count = false;
    let sets = new Set();
    Object.defineProperties(this, {
      store: {
        get() {
          return store;
        }
      },
      s: {
        get() {
          return s;
        }
      },
      u: {
        get() {
          return u;
        }
      },
      q: {
        value: [query]
      },
      pattern: {
        value: query.withinPattern
      },
      sets: {
        get() {
          return sets;
        }
      },
      count: {
        get() {
          if (count === false) count = this.getCount();

          return count;
        }
      }
    });
  }

  get length() {
    return this.s.length;
  }

  getCount() {
    const unique = this.u;
    const substring = this.s;
    const { pattern } = this;
    if (unique.length === 1) return this.length;
    if (this.store.sets.has(substring)) {
      let set = this.store.sets.get(substring);
      for (let k = 0; k < set.length; k++) this.sets.add(set[k]);

      return set.size;
    }

    let largestChild = null;

    if (pattern) {
      let value = this.store.patterns.get(pattern);
      let gets = [];
      let pSets = value.sets.keys();
      let s = pSets.length;
      while (s--) if (!this.sets.has(pSets[s]) && search(pSets[s], substring)) {
        const inner = this.store.queriedSets.get(pSets[s]);
        gets = gets.concat(inner.sets.keys());
      }


      let k = gets.length;
      while (k--) this.sets.add(gets[k]);
    } else {
      // TODO: get Largest to child in store.sets

    }


    // TODO: modify distinct function with skipping existing childs

    if (this.length < totalCount) {
      this.store.distinctSubstrings(substring, 0, this.sets);
      this.store.addSet(substring, this.sets.keys());
      return this.sets.size;
    }

    return false;
  }
}

function removeDuplicates(...s) {
  const obj = {};
  for (let i = 0; i < s.length; i++) obj[s[i]] = 1;

  return Object.keys(obj).join('');
}

function search(inner, main) {
  let i = main.length - inner.length;
  if (i <= 0) return false;
  const regex = new RegExp(inner, 'g');
  return regex.test(main);
}

function filter(obj, condition, owner) {
  owner = owner || this;
  // indentify type
  if (Array.isArray(obj)) {
    const arr = [];
    let i = obj.length;
    while (i--) if (condition.call(owner, obj[i], i, obj)) arr[arr.length] = obj[i];

    return arr;
  }
  if (typeof obj === 'string') {
    const s = '';
    for (let i = 0; i < obj.length; i++) if (condition.call(owner, obj[i], i, obj)) s += obj[i];

    return s;
  }
  const keys = Object.keys(obj),
    filtered = {};
  let i = keys.length;
  while (i--) {
    const key = keys[i];
    if (condition.call(owner, obj[key], key, obj)) filtered[key] = obj[key];
  }
  return filtered;
}

function powerSet(set, subsets = new Set(), current = '', startAt = 0) {
  for (let position = startAt; position < set.length; position++) {
    const next = current + set[position];
    if (!!next && set.includes(next)) {
      subsets.add(next);
      powerSet(set, subsets, next, position + 1);
    }
  }
}

function ContinuousLoopTermination(max, initValue, compare) {
  let count = 0;
  return (currentValue) => {
    if (!compare(initValue, currentValue)) {
      initValue = currentValue;
      count = 0;
    } else {
      count++;
    }

    return (count === max);
  };
}

function handlePatternsInQueries(start, end, isSingle) {
  // find queries within pattern
  const endsKeys = this.filter(this.queries.sortedEnds, (key => key < end));
  const endPositions = [];
  for (let keyIndex = 0; keyIndex < endsKeys.length; keyIndex++) {
    const endIndex = endsKeys[keyIndex];
    const positions = this.queries.ends.get(endIndex);
    endPositions.push(...positions);
  }
  const queries = [];
  for (var posIndex = 0; posIndex < endPositions.length; posIndex++) {
    const query = this.queries.positions.get(endPositions[posIndex]);
    if (query.start < start) continue;
    if (isSingle) this.add(query);
    else
    // console.debug('is Not Single', query);
    // sort by start
    // identify short lengths

      queries[queries.length] = query;
  }
  console.debug('handlePatternsInQueries', start, end, queries);
  for (let qIndex = 0; qIndex < queries.length; qIndex++) {
    const query = queries[qIndex];
    if (query.length < totalCount) this.add(query);
  }
}

function patterns() {
  const s = this.org;
  const sets = this.patterns;
  const { length } = s;
  const all = [];
  const prI = i => i - 1;

  let cluster = '';
  let pattern = '';
  for (let i = 0; i < length; i++) {
    let current = s[i];
    let previous = i <= 0 ? null : s[prI(i)];

    // sanity check
    if (!current) break;

    // the beginning
    if (!pattern || !cluster) pattern = current;

    if (!search(current, cluster)) cluster += current;


    // get one letter pattern
    if (cluster.length === 1) {
      let nextIndex = i + 1;
      const patternArrayForSets = [pattern];
      while (current === s[nextIndex] && nextIndex < length) {
        pattern += s[nextIndex];
        patternArrayForSets[nextIndex] = (pattern);
        nextIndex++;
      }


      if (pattern.length > 5) {
        const clusterValue = {
          i,
          cluster,
          length: pattern.length
        };
        if (sets.has(cluster)) {
          let value = sets.get(cluster);
          value.clusters.push(clusterValue);
        } else {
          let clusterObj = {
            clusters: [clusterValue],
            sets: new Set()
          };

          sets.set(cluster, clusterObj);
        }
        all.push(clusterValue);
      }
      // console.info(i, nextIndex - 1, i + pattern.length);
      i = nextIndex - 1;

      if (pattern.length > 3) {
        cluster = '';
        pattern = '';
        continue;
      }

      previous = current;
      if (!search(s[i + 1], cluster)) cluster += s[i + 1];
    }

    // get two letter pattern
    if (cluster.length === 2 || cluster.length === 3) {
      let nextIndex = i + 1;
      while (search(s[nextIndex], cluster) && nextIndex < length) {
        pattern += s[nextIndex];
        nextIndex++;
      }

      if (pattern.length > cluster.length * 3) {
        // const smallPrintPattern = pattern.substring(0, pattern.length < totalCount ? undefined : totalCount);
        // const distinct = this.addDistinctSubstrings(smallPrintPattern, pattern);
        // this.addSet(smallPrintPattern, distinct.keys());

        const clusterValue = {
          i,
          cluster,
          // distinct,
          length: pattern.length
        };
        if (sets.has(cluster)) {
          let value = sets.get(cluster);
          value.clusters.push(clusterValue);
        } else {
          let clusterObj = {
            clusters: [clusterValue],
            sets: new Set()
          };

          sets.set(cluster, clusterObj);
        }
        all.push(clusterValue);
      }
      const sub = s.substring(i, i + pattern.length);
      // console.debug(i, nextIndex - 1, i + pattern.length, sub);
      i = nextIndex - 1;

      if (pattern.length > cluster.length * 2) {
        cluster = '';
        pattern = '';
        continue;
      }

      pattern += sub;
      previous = current;
      current = s[i];
    }

    if (!search(current, cluster)) {
      pattern = '';
      cluster = '';
    }
  }

  Object.defineProperty(this, 'patternArray', {
    value: all
  });
}

function addDistinctSubstrings(s, full) {
  const set = new Map();
  for (let i = 0; i < s.length; i++) {
    let ss = '';
    for (let j = i; j < s.length; j++) {
      ss += s[j];
      const distinct = regexDistinct(ss, full);
      set.set(ss, distinct);
    }
  }
  return set;
}

function regexDistinct(sub, full) {
  const regex = new RegExp(sub, 'g');
  const regPats = full.match(regex);
  const regLength = (regPats.length * sub.length);
  return [sub.length, regPats.length, regLength];
}
