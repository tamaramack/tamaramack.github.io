import { SetModel } from './models';

/** Consider a string of n characters, s, of where each character is indexed from 0 to n-1.

 You are given q queries in the form of two integer indices: left and right. For each query, count and print the number of different substrings of s in the inclusive range between left and right.
 */

export default countSubstrings;

const store = new SetModel();
const storeMap = new Map();
const limit = 30;

const startObj = {};

function countSubstrings(s, queries) {
  const queriesTotal = queries.length;
  const resultArray = new Array(queriesTotal);
  const uniques = removeDuplicates(s);
  console.debug('uniques', uniques);

  let pos = queriesTotal;
  while (pos--) {
    const query = queries[pos];
    const start = query[0];
    const end = query[1];
    const item = pos;

    if (startObj.hasOwnProperty(start)) if ((startObj[start]).hasOwnProperty(end)) {
      startObj[start][end].push(item);
    } else {
      startObj[start][end] = [item];
    }
    else startObj[start] = {
      [end]: [item]
    };


    const sub = s.substring(start, end + 1);
    const uni = removeDuplicates(sub);
    storeMap.set(sub, [start, uni, startObj[start]]);
    // resultArray[pos] = store.get(sub).count;
  }
  store.queries = startObj;

  for (let [sub, arr] of storeMap) {
    const start = arr[0];
    const endArr = arr[2];
    const endKeys = Object.keys(endArr);
    const len = getCount(sub);

    let i = endKeys.length;
    while (i--) resultArray[endArr[endKeys[i]]] = len;
  }

  console.log('store', storeMap, startObj);

  console.log(resultArray);
  return resultArray;
}

function getCount(sub, arr) {
  // const uni = removeDuplicates(sub);
  let { length } = sub;

  return length;
}

function removeDuplicates(s) {
  return alphaSort([...new Set(s)]);
}

function alphaSort(str) {
  return ([...str].sort((a, b) => a.charCodeAt() - b.charCodeAt())).join('');
}


function sliceString(s, obj, parent = false) {
  if (s.length <= 10) return stepString1(s, obj, s.length, parent);
  const sub = s.slice(1);
  if (sub.length > 1) {
    if (!obj[sub]) obj[sub] = [];

    if (parent) obj[parent].push(sub);
    sliceString(sub, obj, s);
  }

  const sub1 = s.slice(0, -1);
  if (sub1.length > 1) {
    if (!obj[sub1]) obj[sub1] = [];

    if (parent) obj[parent].push(sub1);
    sliceString(sub1, obj, s);
  }

  if (s.length > 2) {
    const sub2 = s.slice(1, -1);
    if (sub2.length > 1) {
      if (!obj[sub2]) obj[sub2] = [];

      if (parent) obj[parent].push(sub2);
      sliceString(sub2, obj, s);
    }
  }
}

function countstrings(s, queries) {
  const stringTotal = s.length;
  const queriesTotal = queries.length;

  mapSubstring(s, stringTotal);

  const matrix = [];

  // if > 3000, > 100 or else
  // Map array or string
  // Queries break
  if (queriesTotal > 3000) splitArray(queries, 200, matrix);
  else if (queriesTotal > 100) splitArray(queries, 10, matrix);
  else matrix.push(queries);


  const results = [];
  let i = matrix.length;
  while (i--) {
    const row = matrix[i];
    findSubstring(s, row);
  }

  return results;
}

function findSubstring(s, queries, i = 0) {
  if (queries.length <= i) return 0;
  const start = queries[i][0];
  const end = queries[i][1];
  const sub = s.substring(start, end);
}

function splitArray(arr, rowCount, matrix) {
  let splitpoint = Math.ceil(arr.length / rowCount);
  let startIndex = 0;

  while (startIndex < arr.length) {
    let end = startIndex + splitpoint;
    if (end > arr.length) end = arr.length;
    const row = arr.slice(startIndex, end);
    matrix.push(row);
    startIndex = end;
  }
}

function mapSubstring(s, stringTotal) {
  // TODO: Map s string with linear and bubble
  store._addAll(...store.removeDups(s));
  setSubstring(s);

  console.log('STORE', store.count, store.keys);
  const stringArr = [];
  if (stringTotal > 3000) splitArray(s, 200, stringArr);
  else if (stringTotal > 100) splitArray(s, 10, stringArr);
  else stepString(s, true);


  console.debug('string ARRAY', stringArr.length);

  let j = stringArr.length;
  while (j--) setSubstring(stringArr[j], s);
  console.log('STORE', store.count, store.keys);
  return stringArr;
}

function setSubstring(sub, ...family) {
  if (!(sub && sub.length)) return;
  addSubstring(sub, ...family);
  halfString(sub);
  threeString(sub);
  fiveString(sub);
}

function addSubstring(sub, parent = '', child = '') {
  store._add(sub);
  if (store.has(sub)) {
    const subSet = store.get(sub);
    subSet.getFirstChildren();
    if (parent.length) subSet.addParent(parent);
    if (child.length) subSet.addChild(child);
  }
}

function stepString(s, i, skipConditional) {
  if ((s.length > limit || s.length <= 1) && !skipConditional) return;
  let prev = s;
  for (let l = 0; l < s.length - i; l++) {
    const sub = s.substring(l, l + i);
    if (!sub) continue;
    addSubstring(sub, prev);
  }
  i--;
  if (i) stepString(s, i, skipConditional);
}

function getSubstrings(s, start, end) {
  const sub = s.substring(start, end);
  addSubstring(sub, s);
  if (start - 1 >= 0) {
    const sibling1 = s.substring(start - 1, end);
    if (sibling1.length > limit) addSubstring(sibling1, s);
  }
  if (start + 1 <= s.length) {
    const sibling2 = s.substring(start + 1, end);
    if (sibling2.length > limit) addSubstring(sibling2, s);
  }
  if (end && end + 1 <= s.length) {
    const sibling3 = s.substring(start, end + 1);
    if (sibling3.length > limit) addSubstring(sibling3, s);
  }
  if (!end || end === s.length) {
    const sibling4 = s.substring(start, s.length - 1);
    if (sibling4.length > limit) addSubstring(sibling4, s);
  }
  return sub;
}

function halfString(s) {
  const total = s.length;
  if (total <= limit) return stepString(s, s.length);


  const half = Math.ceil(total / 2);
  const first = getSubstrings(s, 0, half);
  if (first.length > 1) halfString(first);

  const second = getSubstrings(s, half);
  if (second.length > 1) halfString(second);
}

function threeString(s) {
  const total = s.length;
  if (s.length <= limit) return stepString(s, s.length);

  const thrice = str => Math.ceil(str.length / 3);

  const calcThrice = thrice(s);
  const first = getSubstrings(s, 0, calcThrice);
  if (first.length > 1) threeString(first);

  const second = getSubstrings(s, calcThrice, calcThrice * 2);
  if (second.length > 1) threeString(second);

  const secondtwothirds = getSubstrings(s, calcThrice);
  if (secondtwothirds.length > 1) thirdString(secondtwothirds);

  const third = getSubstrings(s, calcThrice * 2);
  if (third.length > 1) threeString(third);

  const firsttwothirds = getSubstrings(s, 0, total - calcThrice);
  if (firsttwothirds.length > 1) thirdString(firsttwothirds);
}

function fourString(s) {
  if (s.length <= limit) return stepString(s, s.length);

  const fours = str => Math.floor(str.length / 4);

  const calcFourth = fours(s);
  const first = getSubstrings(s, 0, s.length - calcFourth);
  if (first.length > 1) fourString(first);

  const fourth = getSubstrings(s, calcFourth);
  if (fourth.length > 1) fourString(fourth);
}

function fiveString(s) {
  if (s.length < limit) return stepString(s, s.length);

  const fives = str => Math.floor(str.length / 5);

  const calcFives = fives(s);
  const first = getSubstrings(s, 0, calcFives);
  if (first.length > 1) fiveString(first);

  const second = getSubstrings(s, calcFives, calcFives * 2);
  if (second.length > 1) fiveString(second);

  const third = getSubstrings(s, calcFives * 2, calcFives * 3);
  if (third.length > 1) fiveString(third);

  const fourth = getSubstrings(s, calcFives * 3, calcFives * 4);
  if (fourth.length > 1) fiveString(fourth);

  const fifth = getSubstrings(s, calcFives * 4);
  if (fifth.length > 1) fiveString(fifth);
}