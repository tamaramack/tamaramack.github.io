/**
 * utilities file for tamaramack.github.io on 13-Apr-17.
 */
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, __dirname, relativePath);
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;


module.exports = {
  getPublicUrl,
  resolveApp,
  resolveOwn,
  extend,
  setObjectInArray,
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

function extend(target, ...sources) {
  if (!sources.length) return target;
  let newTarget = target || {};

  if (Array.isArray(newTarget)) {
    console.log('\nTARGET IS ARRAY', ...sources);
    let i = sources.length;
    while (i--) {
      const source = sources[i];
      if (Array.isArray(source)) newTarget = newTarget.concat(source);
    }
    return newTarget;
  }

  while (sources.length) {
    // console.log(`\nCONTINUE ${sources.length}\n`);
    const source = sources.shift();

    if (!source) continue;
    const keys = Object.keys(source);

    if (!keys.length) continue;
    while (keys.length) {
      const propertyName = keys.shift();
      console.log(`\nisComplexObject(${propertyName}) 
        => ${isComplexObject(newTarget[propertyName]) && isComplexObject(source[propertyName])}`);
      // console.log(`\npropertyName: ${propertyName}\n`, newTarget[propertyName], '\n', source[propertyName], '\nEND\n');
      if (isComplexObject(newTarget[propertyName]) && isComplexObject(source[propertyName])) newTarget[propertyName] = extend(newTarget[propertyName], source[propertyName]);
      else if ((typeof source[propertyName]) !== 'undefined') newTarget[propertyName] = source[propertyName];
    }
  }

  return newTarget;
}

function isComplexObject(obj) {
  return !['string', 'boolean', 'number', 'undefined', 'null'].includes(typeof obj);
}

function setObjectInArray(targetArray, item, update) {
  let i = targetArray.length;
  let hasMatch = false;

  while (i--) {
    let target = targetArray[i];
    hasMatch = matchKeys(target, item);
    if (hasMatch) {
      target = update ? extend(target, item) : item;
      break;
    }
  }

  if (!hasMatch) targetArray.push(item);
}

function matchKeys(obj1, obj2) {
  if (!isComplexObject(obj1) || !isComplexObject(obj2)) return false;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  while (keys2.length) {
    const key = keys2.shift();
    if (!keys1.includes(key)) return false;
  }
  return true;
}
