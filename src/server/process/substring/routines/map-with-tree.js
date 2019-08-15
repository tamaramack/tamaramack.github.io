/**
 * map-with-tree js file created by Tamara G. Mack on 05-Aug-19 for
 * tamaramack.github.io
 */
const fs = require('fs');
const util = require('util');

const open = util.promisify(fs.open);

let time = Date.now();

async function tree(s, end, mappedFile) {
  let set = new Set();
  console.log(`${dt(Date.now() - time)} \t[Tree] Start Recursive Call`);
  await firstBranch(s, set, end);
  console.log(`${dt(Date.now() - time)} \t[Tree] End Recursive`, set.size);

  await open(mappedFile, 'w');
  const file = fs.createWriteStream(mappedFile);
  console.log(`${dt(Date.now() - time)} \t[Tree] Write Stream`);

  for (let sub of set.values()) file.write(`${sub}\n`);
  set.clear();
  file.end('\n');
  process.send({ end, mappedFile });
}

async function firstBranch(sub, store, end) {
  if (!sub || store.has(sub) || sub.length === end) return;
  store.add(sub);
  await Promise.all([
    firstBranch(sub.slice(0, -1), store, end),
    secondBranch(sub.slice(1), store, end)
  ]);
}

async function secondBranch(sub, store, end) {
  if (!sub || store.has(sub) || sub.length === end) return;
  store.add(sub);
  await secondBranch(sub.slice(1), store);
}
