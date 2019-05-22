/**
 * utilities js file created on 02-Apr-19 for
 * interview-190319-tm
 */
export {
  isNumber,
  debounce,
  throttle,
  isIterable,
  forEach,
  substringCount,
  isDistinct,
  distinctString,
  setOf,
  removeDuplicates,
  clone,
  compare
};

function isNumber(num) {
  // return !Number.isNaN(Number(num));
  return /^-?\d+$/.test(num) || /^-?\d+\.\d+$/.test(num);
}

function isIterable(obj) {
  return (obj !== undefined
    && obj !== null
    && typeof obj[Symbol.iterator] === 'function');
}

function forEach(objectArray, cb, owner) {
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

function substringCount(sub, str) {
  const regex = new RegExp(`${sub}`, 'gi');
  return str.match(regex).length;
}

function isDistinct(str) {
  const regex = /^(?:([A-Za-z])(?!.*\1))*$/;
  return regex.test(str);
}

function distinctString(str) {
  return ([...new Set(str)]).join('');
}

function setOf(str, count) {
  const regex = new RegExp(`[A-Za-z]{${count}}`, 'gi');
  return new Set(str.match(regex));
}

function removeDuplicates(strArr) {
  const isString = typeof strArr === 'string';
  const dist = [...new Set(strArr)];
  return isString ? dist.join('') : dist;
}

function clone(obj) {
  if (obj instanceof Map) return new Map(obj);
  if (obj instanceof Set) return new Set(obj);
  /* if (obj instanceof WeakMap) return new WeakMap(obj);
   if (obj instanceof WeakSet) return new WeakSet(obj);
   if (obj instanceof Date) return new Date(obj.getTime()); */
  return JSON.parse(JSON.stringify(obj));
}

function compare(obj, compare) {
  return JSON.stringify(obj) === JSON.stringify(compare);
}

function debounce(cb, delay) {
  let inDebounce;
  return function (...params) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => cb.apply(this, params), delay);
  };
}

function throttle(cb, limit) {
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
