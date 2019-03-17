import {QuerySet} from './models/query-model';

import SubstringTree from './models/substring-tree';

/** Consider a string of n characters, s, of where each character is indexed from 0 to n-1.

 You are given q queries in the form of two integer indices: left and right. For each query, count
 and print the number of different substrings of s in the inclusive range between left and right.
 */

export default countSubstrings;

function countSubstrings(s, queries) {
  const strLen = s.length;
  const date = Date.now();
  console.debug('Start distinct', getTime(date));

  const nodes = new Map();
  const topTree = new SubstringTree(s, nodes);
  console.debug('End Parent Tree', getEndTime(date), nodes, topTree);

  const pattern = patterns(s, topTree);
  console.debug('End Patterns', getEndTime(date), pattern);

  const queryCollection = new QuerySet(queries, topTree, SubstringTree);
  queryCollection.mapQueries(pattern);
  // queryCollection.mapChildren();
  console.info('End Query Map', getEndTime(date), queryCollection);

  queryCollection.mapPatterns(pattern);
  console.info('End Pattern Map', getEndTime(date), queryCollection);
  return queryCollection.results;

  let bit = strLen >> 3;
  if (strLen > 100) {
    bit = strLen >> 6;
  } else if (strLen > 3000) bit = strLen >> 10;


  let i = bit;
  while (i <= strLen) {
    queryCollection.mapBySize(i);
    i += bit;
  }

  console.log('End Substring Tree Results', getEndTime(date), queryCollection);
  return queryCollection.results;
}

function patterns(s, tree) {
  const {length} = s;
  const all = [];
  const prI = i => i - 1;

  let cluster = '';
  let pattern = '';
  for (let i = 0; i < length; i++) {
    let current = s[i];

    // sanity check
    if (!current) break;

    // the beginning
    if (!pattern || !cluster) pattern = current;

    if (!search(current, cluster)) cluster += current;


    // get one letter pattern
    if (cluster.length === 1) {
      let nextIndex = i + 1;
      while (current === s[nextIndex] && nextIndex < length) {
        pattern += s[nextIndex];
        nextIndex++;
      }

      if (pattern.length > 5) {
        tree.add(pattern);
        const clusterValue = {
          i,
          cluster,
          length: pattern.length
        };
        all.push(clusterValue);
      }
      i = nextIndex - 1;

      if (pattern.length > 3) {
        cluster = '';
        pattern = '';
        continue;
      }

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
        if (pattern.length > 3000) {
          let patBit = 6;
          while (patBit--) {
            const end = pattern >> patBit;
            let subPattern = pattern.slice(0, end);
            tree.add(subPattern);
          }
        } else {
          tree.add(pattern);
        }
        const clusterValue = {
          i,
          cluster,
          length: pattern.length
        };
        all.push(clusterValue);
      }
      const sub = s.substring(i, i + pattern.length);
      i = nextIndex - 1;

      if (pattern.length > cluster.length * 2) {
        cluster = '';
        pattern = '';
        continue;
      }

      pattern += sub;
      current = s[i];
    }

    if (!search(current, cluster)) {
      pattern = '';
      cluster = '';
    }
  }

  return all;
}

function search(inner, main) {
  let i = main.length - inner.length;
  if (i <= 0) return false;
  const regex = new RegExp(inner, 'g');
  return regex.test(main);
}

function getTime(date) {
  date = new Date(date);
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
}

function getEndTime(date) {
  date = new Date(date).getTime();
  const now = new Date(Date.now() - date);
  return `${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
}

function z_naive(s) {
  const arr = [s.length];

  for (let i = 1; i < s.length; i++) {
    let n = 0;
    while (n + i < s.length && s[n] === s[n + i]) n++;

    arr.push(n);
  }
  return arr;
}

function z_adv(s) {
  const arr = new Array(s.length).fill(0);
  arr[0] = s.length;

  let left = 0;
  let right = 0;
  let shift = 0;

  for (let i = 1; i < s.length; i++) {
    if (i > right) {
      let n = 0;
      while ((n + i) < s.length && s[n] === s[n + i]) n++;

      arr[i] = n;
      if (n > 0) {
        left = i;
        right = i + n - 1;
      }
    } else {
      shift = i - left;
      const right_len = right - i + 1;

      if (arr[shift] < right_len) {
        arr[i] = arr[shift];
      } else {
        let j = right + 1;
        while (j < s.length && s[j] === s[j - i]) j++;

        arr[i] = j - i;
        left = i;
        right = j - 1;
      }
    }
  }


  return arr;
}

function powerSet(set, subsets = new Set(), current = '', startAt = 0) {
  for (let position = startAt; position < set.length; position++) {
    const next = current + set[position];
    if (!!next && set.includes(next)) {
      subsets.add(next);
      powerSet(set, subsets, next, position + 1);
    }
  }
  return subsets;
}

function bitwisePowerSet(sub) {
  const subsets = new Set();
  const comboCount = 2 ** sub.length;
  if (comboCount === Infinity) return subsets;

  for (let i = 0; i < comboCount; i++) {
    let subset = '';
    for (let j = 0; j < sub.length; j++) if (i & (1 << j)) subset += sub[j];


    if (!!subset && sub.includes(subset)) subsets.add(subset);
  }

  return subsets;
}
