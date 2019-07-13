import { QuerySet } from './models/query-model';
import { Substring, NodeStore } from './models/substring-nodes';
import Patterns from './patterns';
import Time from '@/js/utilities/time-object';

/** Consider a string of n characters, s, of where each character is indexed from 0 to n-1.

 You are given q queries in the form of two integer indices: left and right. For each query, count
 and print the number of different substrings of s in the inclusive range between left and right.
 */

export default countSubstrings;

function countSubstrings(s, queries) {
  const strLen = s.length;
  const date = new Time('countSubstrings', Date.now());
  console.debug('Start distinct', date.time);

  const nodes = new NodeStore(s);
  const mapped = new Array(queries.length).fill(null);
  let subByLength = new Array(queries.length).fill(null).map(() => []);
  let sbd = {};

  let counter = 0;

  const patterns = Patterns(s, nodes);
  const queryCollection = new QuerySet(queries, s);
  queryCollection.mapQueries();
  queryCollection.mapChildren();
  console.info('End Query Map', date.endTime, queryCollection);

  // queryCollection.mapPatterns(pattern);
  console.info('End Pattern Map', date.endTime, queryCollection);
  // return queryCollection.results;

  let bit = strLen >> 3;
  if (strLen > 100) bit = strLen >> 6;
  else if (strLen > 3000) bit = strLen >> 10;

  let i = bit;
  while (i <= strLen) {
    // queryCollection.mapBySize(i);
    i += bit;
  }

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    const sub = s.slice(query[0], query[1] + 1);
    let count = 0;

    let id = nodes.node(sub);
    const node = nodes[id];
    let dst = node.distinct;

    subByLength[sub.length - 1].push(id);
    if (!sbd[dst.length]) sbd[dst.length] = {};
    if (!sbd[dst.length][dst]) sbd[dst.length][dst] = {};
    if (!sbd[dst.length][dst][sub.length]) sbd[dst.length][dst][sub.length] = new Set();
    sbd[dst.length][dst][sub.length].add(id);

    // writeline(`${query.join()} :: ${i}`, id, sub.length, distinct);

    if (sub.length === 1 || dst.length === 1) {
      nodes.treeBranch(sub);
      count = sub.length;
      counter++;
    } else if (dst.length === sub.length) {
      nodes.treeBranch(sub);
      count = plusFactor(sub.length);
      counter++;
    } else if (dst.length === 2) {
      counter++;
    } else if (sub.length <= 50) {
      nodes.treeBranch(sub);
      count = node.kids.length + 1;
    }

    mapped[i] = count;
  }

  console.log('End Substring Tree Results', date.endTime, queryCollection);
  const { results, nodeSubs } = queryCollection;
  return { results, nodeSubs };
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

function findSubstrings(s, count) {
  if (count <= 1) return [];
  const halfway = Math.floor(s.length / 2);
  if (count > halfway) count = s.length - count;
  console.log('findSubstrings halfway', halfway, count);

  let store = {};
  let i = count;
  while (i--) getSubstrings(s.slice(i), count, store);

  return Object.keys(store);
}

function getSubstrings(s, count, store) {
  if (s.length < count) return;
  const len = s.length - count;
  for (let i = 0; i < len; i += count) {
    store[s.slice(i, i + count)] = 1;
  }
}

function distinctString(s) {
  const o = {};
  let i = s.length;
  while (i--) o[s[i]] = 1;
  return Object.keys(o);
}

function plusFactor(count) {
  let n = count;
  let sum = count;
  while (n--) {
    sum += n;
  }
  return sum;
}
