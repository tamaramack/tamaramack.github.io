/**
 * string-tree js file created by Tamara G. Mack on 21-May-19 for
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
  StringObject
} from '@/js/models/objects/string-object';

export default function Tree(s, set = {}, majorSet = {}) {
  if (!(s instanceof StringObject)) {
    s = new StringObject(s);
  }
  if (set.hasOwnProperty(s)) return;

  set[s] = createSet(s, {});
  firstBranch(s, set, majorSet);

  setSubTree(set, majorSet);
}

function setSubTree(set, majorSet = {}) {
  const keys = Object.keys(set);
  for (let i = 0; i < keys.length; i += 1) {
    const sub = keys[i];
    if (!majorSet[sub]) {
      majorSet[sub] = set[sub];
    }
  }
}

function firstBranch(sub, set, majorSet) {
  const first = sub.slice(0, -1);
  const second = sub.slice(1);

  if (first && !set.hasOwnProperty(first)) {
    set[first] = (majorSet[first]) ? majorSet[first] : removeChar(sub[sub.length - 1], clone(set[sub]));
    firstBranch(first, set, majorSet);
  }

  if (second && !set.hasOwnProperty(second)) {
    set[second] = (majorSet[second]) ? majorSet[second] : removeChar(sub[0], clone(set[sub]));
    secondBranch(second, set, majorSet);
  }
}

function secondBranch(sub, set, majorSet) {
  const second = sub.slice(1);
  if (second && !set.hasOwnProperty(second)) {
    set[second] = (majorSet[second]) ? majorSet[second] : removeChar(sub[0], clone(set[sub]));
    secondBranch(second, set, majorSet);
  }
}

function removeChar(char, obj) {
  if (obj[char] && obj[char] > 1) {
    obj[char] -= 1;
  } else {
    delete obj[char];
  }
  return obj;
}

function addChar(char, obj) {
  if (obj[char]) {
    obj[char] += 1;
  } else {
    obj[char] = 1;
  }
  return obj;
}

function createSet(s, obj) {
  for (let i = 0; i < s.length; i += 1) {
    const char = s[i];
    if (obj[char]) {
      obj[char] += 1;
    } else {
      obj[char] = 1;
    }
  }
  return obj;
}

function getUnique(s) {
  const obj = typeof s === 'string' ? createSet(s, {}) : s;

  const arr = [],
    entries = Object.entries(obj);

  let i = entries.length;
  while (i--) {
    const num = entries[i];
    if (num[1] === 1) arr[arr.length] = num[0];
  }

  return arr.length;
}
