/**
 * utilities js file created on 02-Apr-19 for
 * interview-190319-tm
 */
export {
  isNumber,
  debounce,
  throttle,
  isIterable,
  forEach
};

function isNumber(num) {
  // return !Number.isNaN(parseFloat(num));
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
