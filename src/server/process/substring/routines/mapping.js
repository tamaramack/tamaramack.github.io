/**
 * mapping js file created by Tamara G. Mack on 03-Aug-19 for
 * tamaramack.github.io
 */

module.exports = {};

async function mapQueryModel(s, q) {
  return false;
}

async function mapQuerySubstrings(s, q) {
  return false;
}

async function mapQuerySubLength(s, q) {
  return false;
}

function QueryModel(s, value, index) {
  this.pos = index;
  this.s = s.slice(value[0], value[1] - 1);
  this.arr = Array(this.s.length).fill(0);
}
