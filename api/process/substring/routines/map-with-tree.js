/**
 * map-with-tree js file created by Tamara G. Mack on 05-Aug-19 for
 * tamaramack.github.io
 */
const fs = require('fs');
const util = require('util');
const {dt} = require('./utilities');
const writeStreamFile = require('./write-stream');

const open = util.promisify(fs.open);

let time = Date.now();

async function mapWithTree(s, stop, useStream) {
  tree(s, stop).then((set) => {
    if (useStream) {
      writeStreamFile(set.values(), useStream, {stop, useStream});
    } else {
      process.send({stop, set});
    }
    console.log(`${ dt(Date.now() - time) } \t[Tree] Write Stream Complete`);
  });
}

async function tree(s, end) {
  let set = new Set();
  console.log(`${ dt(Date.now() - time) } \t[Tree] Start Recursive Call`);
  await firstBranch(s, set, end);
  console.log(`${ dt(Date.now() - time) } \t[Tree] End Recursive`, set.size);
  return set;
}

async function firstBranch(sub, store, end) {
  if (!sub || store.has(sub) || sub.length === end) return;
  store.add(sub);
  await Promise.all([
    firstBranch(sub.slice(0, -1), store, end),
    secondBranch(sub.slice(1), store, end),
  ]);
}

async function secondBranch(sub, store, end) {
  if (!sub || store.has(sub) || sub.length === end) return;
  store.add(sub);
  await secondBranch(sub.slice(1), store);
}
