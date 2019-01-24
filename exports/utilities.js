/**
 * utilities file for tamaramack.github.io on 13-Apr-17.
 */

module.exports = {
  isTrue,
  verifyString,
  isOne,
  normalizePort,
  static_path
};

/**
 *
 * @param obj
 * @returns {boolean}
 */
function isTrue(obj) {
  if (typeof obj === 'undefined') return false;
  if (typeof obj === 'boolean') return obj;
  const _obj = parseInt(obj);
  if (isNaN(_obj)) return obj === 'true';
  return _obj !== 0;
}

/**
 *
 * @param obj
 * @param defValue
 * @returns {*}
 */
function isOne(obj, defValue) {
  if (typeof obj === 'undefined') return defValue || 0;
  var _obj = parseInt(obj);
  if (isNaN(_obj)) {
    _obj = 0;
    if (obj === true || obj === 'true') _obj = 1;
  }
  return _obj;
}

/**
 *
 * @param obj
 * @returns {*}
 */
function verifyString(obj) {
  if (obj) return obj.toString();
  return false;
}

/**
 * Normalize a port into a number, string, or false.
 * @param val
 * @returns {*}
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

/**
 *
 * @param path
 * @param express
 * @param dir
 * @returns {_path}
 */
function static_path(path, express, dir) {
  return function _path(_url) {
    const url = path.join(dir || '', _url);
    return express.static(url);
  };
}
