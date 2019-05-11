/**
 * injection file for tamaramack.github.io on 26-Mar-17.
 */

((base) => {
  function InjectLog(logFn, withObj, excluded) {
    excluded = (this.isArray(excluded)) ? excluded : [];
    var name,
      fn;
    for (name in withObj) {
      if (!(withObj[name])) continue;
      fn = withObj[name];
      if (typeof fn === 'function'
          && !(base.utils.has(name, excluded))) withObj[name] = ((...args) => {
        const _fn = args[1];
        return function log(...logArgs) {
          logFn.apply(this, args);
          return _fn.apply(this, logArgs);
        };
      })(name, fn);
    }
  }

  Object.defineProperty(base, 'inject', {
    value: InjectLog,
    enumerable: true
  });
})(window.$base);
