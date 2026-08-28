/**
 * enums js file created by Tamara G. Mack on 09-Oct-19 for tamaramack.github.io
 */

const obj = {};
define('view', ['home', 'projects', 'about']);
define('theme', ['light', 'dark']);

export default obj;

function define(name, descriptors) {
  Object.defineProperty(obj, name, {
    value: create(descriptors),
    enumerable: true
  });
}

function create(descriptors) {
  const o = {};
  for (let value of descriptors) {
    o[value] = {
      value,
      enumerable: true
    };
  }
  return Object.create({}, o);
}
