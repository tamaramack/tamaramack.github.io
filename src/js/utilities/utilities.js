/**
 * utilities js file created on 02-Apr-19 for
 * interview-190319-tm
 */
export { debounce, throttle };

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
