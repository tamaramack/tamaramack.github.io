/**
 * find-algos js file created by Tamara G. Mack on 09-Sep-19 for
 * tamaramack.github.io
 */
const { dt, distinct, plusFactor } = require('./utilities');

module.exports = {
  findSubstringLocations,
  findSubstringsByLength,
  treeSearch,
  vineSearch
};

/**
 *
 * @param {number} len
 * @param {string} substring
 * @param {Object} store
 * @returns {Array}
 */
function findSubstringsByLength(len, substring, store = {}) {
  let end = substring.length - len;
  for (let i = 0; i <= end; i += 1) {
    store[substring.slice(i, i + len)] = 1;
  }
  return Object.keys(store);
}

/**
 *
 * @param {string} fullString
 * @param {(string[]|Array)} substringArray
 * @returns {Array[]} Entries of [string, number[]] for substring and its indices location
 */
function findSubstringLocations(fullString, substringArray) {
  const fullLength = fullString.length,
    subLength = substringArray.length;
  for (let i = 0; i < substringArray.length; i += 1) {
    const sub = substringArray[i];
    substringArray[i] = [sub, loop(0, fullLength - sub.length, sub)];
  }

  return substringArray;
  function loop(start, stop, sub) {
    const arr = [];
    let i = +start;
    while (i < stop) {
      const idx = fullString.indexOf(sub, i);
      if (idx < 0) break;
      arr[arr.length] = idx;
      i = idx + sub.length;
    }
    return arr;
  }
}

/**
 *
 * @param {string} substring
 * @param {number} [stop=0]
 * @returns {[][]|{}[]}
 * @description String merge from full string to single characters
 */
function treeSearch(substring, stop = 0) {
  const store = Array.call(null, ...Array(substring.length)).map(_ => ({}));
  first(substring);

  for (let i = 0; i < store.length; i += 1) {
    store[i] = Object.keys(store[i]);
  }
  return store;

  function first(sub) {
    if (sub.length > stop && !store[sub.length - 1][sub]) {
      store[sub.length - 1][sub] = 1;
      first(sub.slice(0, -1));
      second(sub.slice(1));
    }
  }

  function second(sub) {
    if (sub.length > stop && !store[sub.length - 1][sub]) {
      store[sub.length - 1][sub] = 1;
      second(sub.slice(1));
    }
  }
}

/**
 *
 * @param {string} substring
 * @param {number} [stop=Infinity]
 * @returns {[][]|{}[]}
 * @description String merge from single characters to full string
 */
function vineSearch(substring, stop = Infinity) {
  const store = Array.call(null, ...Array(substring.length)).map(_ => ({}));
  let len = 0;

  for (let i = 0; i < substring.length; i++) store[len][substring[i]] = 1;

  let tmp = substring.split('');
  while (tmp.length > 1 && tmp[0].length < stop) {
    len += 1;
    const discard = lateral(0);
    store[len] = Object.keys(store[len]);
  }

  return store;

  function lateral(i) {
    if (tmp.length <= i + 1) return tmp.pop();
    const fir = tmp[i],
      sec = tmp[i + 1];
    tmp[i] = fir[0] + sec;
    store[len][tmp[i]] = 1;
    lateral(i + 1);
  }
}

function findBySort(string) {
  const chars = distinct(string).sort().join('');
  const store = chars.split('').map((v, i) => [i + 1, [v]]);
}
