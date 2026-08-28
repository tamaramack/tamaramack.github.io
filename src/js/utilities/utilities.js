/**
 * utilities js file created on 02-Apr-19 for
 * interview-190319-tm
 */

export function isIterable(obj) {
  return (obj !== undefined
    && obj !== null
    && typeof obj[Symbol.iterator] === 'function');
}

export function forEach(objectArray, cb, owner) {
  if (isIterable(objectArray)) {
    if (Array.isArray(objectArray) || objectArray instanceof Map) {
      objectArray.forEach(cb, owner);
      return;
    }

    for (let value of objectArray) cb.call(owner || this, value, value, objectArray);
    return;
  }

  for (let prop in objectArray) {
    if (objectArray.hasOwnProperty(prop)) {
      cb.call(owner || this, objectArray[prop], prop, objectArray);
    }
  }
}

export function setOf(str, num, unique) {
  const finds = [],
    count = num;
  let len = str.length,
    i = 0;
  while ((i + count) <= len) {
    finds[finds.length] = str.slice(i, i + count);
    i += 1;
  }
  if (unique) return new Set(finds);
  return finds;
}

export function isNumber(num) {
  return !Number.isNaN(Number(num));
}

export function fillArray(num, cb) {
  return new Array(num).fill(null).map(cb);
}

export function substringCount(sub, str, retFinds) {
  const finds = [];
  let i = 0;
  while (i < str.length) {
    let index = str.indexOf(sub, i);
    if (index === -1) break;
    finds[finds.length] = index;
    i = index + sub.length;
  }

  if (retFinds) return finds;
  return finds.length;
}

export function substringCountRegex(sub, str) {
  const regex = new RegExp(sub, 'gi');
  const match = str.match(regex);
  return match ? match.length : 0;
}

export function hasUnique(str, hasDistinct) {
  if (isDistinct(str)) return str.split('');

  const set = hasDistinct || distinctString(str);
  if (set.length === 1) return [];

  const arr = [...str].sort();
  let i = set.length;
  while (i--) {
    const count = substringCount(set[i], str);
    if (count === 1) arr[arr.length] = str[i];
  }

  return arr;
}

export function isDistinct(str) {
  const regex = /^(?:([A-Za-z])(?!.*\1))*$/;
  return regex.test(str);
}

export function distinctString(str, sorted) {
  if (sorted) return ([...new Set(str)].sort()).join('');
  return ([...new Set(str)]).join('');
}

export function getSetOf(str, num, unique) {
  const finds = [],
    count = num;
  let len = str.length,
    i = 0;
  while ((i + count) <= len) {
    finds[finds.length] = str.slice(i, i + count);
    i += 1;
  }
  if (unique) return new Set(finds);
  return finds;
}

export function getSetOfRegex(str, count, unique) {
  const regex = new RegExp(`[A-Za-z]{${count}}`, 'gi');
  if (unique) return new Set(str.match(regex));
  return str.match(regex) || [];
}

export function getUniqueCharacters(str, hasDistinct) {
  if (isDistinct(str)) return str.split('');
  const arr = [],
    dist = hasDistinct || distinctString(str);
  for (let i = 0; i < dist.length; i += 1) {
    if (substringCount(dist[i], str) === 1) arr[arr.length] = dist[i];
  }
  return arr;
}

export function removeDuplicates(strArr) {
  const o = {};
  let i = strArr.length;
  while (i--) o[strArr[i]] = 1;
  return Object.keys(o);
}

export function reverseString(str) {
  return [...str].reverse().join('');
}

export function clone(obj) {
  if (obj instanceof Map) return new Map(obj);
  if (obj instanceof Set) return new Set(obj);
  /* if (obj instanceof WeakMap) return new WeakMap(obj);
   if (obj instanceof WeakSet) return new WeakSet(obj);
   if (obj instanceof Date) return new Date(obj.getTime()); */
  return JSON.parse(JSON.stringify(obj));
}

export function compare(obj, compare) {
  return JSON.stringify(obj) === JSON.stringify(compare);
}

export function debounce(cb, delay) {
  let inDebounce;
  return function (...params) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => cb.apply(this, params), delay);
  };
}

export function throttle(cb, limit) {
  let inThrottle;
  return function (...params) {
    if (!inThrottle) {
      cb.apply(this, params);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
