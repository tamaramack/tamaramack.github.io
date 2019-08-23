/**
 * mapping js file created by Tamara G. Mack on 03-Aug-19 for
 * tamaramack.github.io
 */
const { dt } = require('./utilities');

module.exports = {};

async function mapQueryModels(s, q) {
  return q.map((v, i) => new QueryModel(s, v, i));
}

async function mapQueryTree(s, q) {
  return false;
}

async function mapQueryLengths(s, q) {
  let lens = Array(s.length).map((v, i) => [i + 1, []]);

  for (let sub of q.values()) lens[sub.s.length - 1][1].push(sub.i);
  lens = lens.filter(v => v[1].length);
  return lens;
}

function QueryModel(s, value, index) {
  this.c = 0;
  this.i = index;
  this.s = s.slice(value[0], value[1] + 1);
  this.q = Array.from(value);
}
