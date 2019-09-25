/**
 * unique js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
import {
  getSetOf,
  clone
} from '@/js/utilities/utilities';
import StringObject from '@/js/models/objects/string-object';

import Tree from './string-tree';

export default function uni(s) {
  console.info('uni', s);
  if (!s.length) return 0;

  const set = {};
  const count = [];
  const main = new StringObject(s, 0);
  console.debug(main.length, main);
  let i = 100;
  while (i--) {
    count[i] = main.getSubs(i + 1, true).toArray();
  }
  // const maps = count.flat().map((arr) => [arr[0], new StringObject(arr[0], 0, arr[1])]);
  console.debug('Count Map', new Map(count.flat()));

  if (s.length > 100) {
    let matrix = createMatrix(s, 100, set);
    console.debug('matrix', matrix);

    // combine matrix
  } else {
    findSub(s, set);
    // Tree(s, set);
  }

  const arraySet = Object.entries(set);
  console.debug('set', arraySet);
  const mapArr = [];
  for (let k = 0; k < arraySet.length; k += 1) {
    const ent = getUnique(arraySet[k][1]);
    if (ent) mapArr[mapArr.length] = ent;
  }
  console.debug('mapArr', mapArr);

  // handle sum
  return sum(...mapArr);
}

function createMatrix(s, max, set) {
  const matrix = [];
  let breakdown = Math.floor(s.length / max);
  let start = 0;

  while (breakdown--) {
    const end = breakdown ? start + max : s.length;
    matrix.push(s.substring(start, end));
    start += max;
  }

  for (let j = 0; j < matrix.length; j += 1) {
    const innerSet = {};
    Tree(matrix[j], innerSet, set);
    matrix[j] = [matrix[j], innerSet];
  }
  return matrix;
}

function combineMatrix(matrix, joinN = 2, set = {}) {
  const cMatrix = [];
  while (matrix.length) {
    let join = (matrix.length < joinN) ? matrix : matrix.splice(0, joinN);
    const arr = ['', {}];

    while (join.length) {
      const part = join.shift();
      arr[0] += part[0];
      if (set[arr[0]]) {
        arr[1] = set[arr[0]];
      } else {
        arr[1] = extend({}, arr[1], part[1]);
        Tree(arr[0], arr[1], set);
      }
    }
    cMatrix.push(arr);
  }
  console.debug('combineMatrix', cMatrix.length, cMatrix, Object.entries(set));
  return cMatrix;
}

function extend(parent, child) {
  const keys = Object.keys(child);
  for (let j = 0; j < keys.length; j += 1) {
    const prop = keys[j];
    parent[prop] = child[prop];
  }

  return parent;
}


function findSub(s, set = {}, majorSet = {}) {
  for (let i = 0; i < s.length; i += 1) {
    let prev = {};
    let ss = '';
    for (let j = i; j < s.length; j += 1) {
      ss += s[j];
      // console.log('pre', ss, prev, set[ss], majorSet[ss]);
      if (majorSet[ss]) {
        set[ss] = majorSet[ss];
      } else {
        if (!set[ss]) {
          set[ss] = addChar(s[j], prev);
        }
        majorSet[ss] = set[ss];
      }
      prev = clone(set[ss]);
      // console.log('post', ss, prev, set[ss], majorSet[ss]);
    }
    prev = {};
    // console.log('end', ss, prev, set[ss], majorSet[ss]);
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

function rmvDups(s) {
  const obj = {};
  for (let i = 0; i < s.length; i++) obj[s[i]] = 1;

  return Object.keys(obj).join('');
}

function repChar(s) {
  const regex = /^([A-Za-z])\1*$/;
  const result = s.match(regex);
  return result;
}

function sum(...n) {
  let s = 0;
  let i = n.length;
  while (i--) s += (+n[i]);
  return s;
}
