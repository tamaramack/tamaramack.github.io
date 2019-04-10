import { QuerySet } from './models/query-model';
import SubstringTree from './models/substring-tree';
import Timer from '@/js/utilities/timer';

/** Consider a string of n characters, s, of where each character is indexed from 0 to n-1.

 You are given q queries in the form of two integer indices: left and right. For each query, count
 and print the number of different substrings of s in the inclusive range between left and right.
 */

export default countSubstrings;

function countSubstrings(s, queries) {
  const strLen = s.length;
  const date = new Timer('countSubstrings', Date.now());
  console.debug('Start distinct', date.time);

  const queryCollection = new QuerySet(queries, s, SubstringTree);
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
    queryCollection.mapBySize(i);
    i += bit;
  }

  console.log('End Substring Tree Results', date.endTime, queryCollection);
  const { results, nodes } = queryCollection;
  return { results, nodes };
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

  for (let i = 1; i < s.length; i++) if (i > right) {
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
