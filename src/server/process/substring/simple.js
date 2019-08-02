/**
 * simple js file created by Tamara G. Mack on 01-Aug-19 for
 * tamaramack.github.io
 */

const cluster = require('cluster');// const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');
const count = require('os').cpus().length;

const substringJson = '3000.1';
const substringPath = `../../../js/data/substr/${substringJson}`;
const strDb = require(substringPath);

const { s, queries } = strDb.input;
let time = Date.now();

// Run Process
if (cluster.isMaster) {
  console.log(`${dt(Date.now() - time)} \tMaster ${process.pid} is running`);
  let complete = 0;

  let exit = setTimeout(() => {
    console.log(`${dt(Date.now() - time)} \tMaster ${process.pid} now exiting\n`);
    process.exit();
  }, 25000);

  // countSubstring Worker
  const worker1 = cluster.fork();
  worker1.on('message', (data) => {
    console.log(`${dt(Date.now() - time)} \tMessage from worker 1 [Tree]\n`, data.results.join(', '));
    complete++;
    if (complete === 2) {
      clearTimeout(exit);
      process.exit();
    }
  });

  // countSubstring Worker
  const worker2 = cluster.fork();
  worker2.on('message', (data) => {
    console.log(`${dt(Date.now() - time)} \tMessage from worker 2 [Loop]\n`, data.results.join(', '));
    complete++;
    if (complete === 2) {
      clearTimeout(exit);
      process.exit();
    }
  });

  worker1.send({ worker: 'tree' });
  worker2.send({ worker: 'loop' });
} else {
  process.on('message', (data) => {
    console.log(`${dt(Date.now() - time)} \tWorker ${process.pid} receives start cmd`);
    if (data.worker === 'tree') {
      tree(queries).then(() => {
        process.disconnect();
      });
    } else {
      loop(queries).then(() => {
        process.disconnect();
      });
    }
  });
}

async function loop(queries) {
  const results = queries.map(v => s.slice(v[0], v[1] + 1));
  let store = [];
  console.log(`${dt(Date.now() - time)} \t[Loop] Start Loop`);

  for (let i = 0; i < s.length; i += 1) {
    let n = '';
    for (let j = i; j < s.length; j += 1) {
      n += s[j];
      store[store.length] = n;
    }
  }
  console.log(`${dt(Date.now() - time)} \t[Loop] End Loop`, store.length);

  store = removeDuplicates(store).sort((a, b) => a.length - b.length);
  console.log(`${dt(Date.now() - time)} \t[Loop] Distinct & Sorted`, store.length);
  await addToResults(store, results, 'Loop');
}

async function tree() {
  const results = queries.map(v => s.slice(v[0], v[1] + 1));

  let store = new Set();
  console.log(`${dt(Date.now() - time)} \t[Tree] Start Recursive Call`);
  await firstBranch(s, store);
  console.log(`${dt(Date.now() - time)} \t[Tree] End Recursive`, store.size);

  store = ([...store]).sort((a, b) => a.length - b.length);
  console.log(`${dt(Date.now() - time)} \t[Tree] Distinct & Sorted`, store.length);

  await addToResults(store, results, 'Tree');
}

async function firstBranch(sub, store) {
  if (!sub || store.has(sub)) return;
  store.add(sub);
  await Promise.all([firstBranch(sub.slice(0, -1), store), secondBranch(sub.slice(1), store)]);
}

async function secondBranch(sub, store) {
  if (!sub || store.has(sub)) return;
  store.add(sub);
  await secondBranch(sub.slice(1), store);
}

async function addToResults(store, results, name) {
  for (let i = 0; i < results.length; i += 1) {
    const qs = results[i];
    let c = 0;
    for (let j = 0; j < store.length; j += 1) {
      const ss = store[j];
      if (qs.length < ss.length) break;
      if (qs.indexOf(ss) > -1) c += 1;
    }
    results[i] = c;
  }
  console.log(`${dt(Date.now() - time)} \t[${name}] End map results`);

  process.send({ results });
}


function dt(now) {
  now = new Date(now);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function sortingByLength(arr) {
  const getDigit = (d, n) => {
    let r = 0;
    while (n--) {
      r = d % 10;
      d = Math.floor((d - r) / 10);
    }
  };
  const max = Math.floor(Math.log10(Math.max(...arr)));
  let buckets = [],
    index = 0;

  for (let i = 0; i <= max; i += 1) {
    buckets = [];
    for (let j = 0; j < arr.length; j += 1) {
      const digit = getDigit(arr[j].length, i + 1);
      buckets[digit] = buckets[digit] || [];
      buckets[digit].push(arr[j]);
    }

    index = 0;
    for (let j = 0; j < buckets.length; j += 1) {
      if (!(buckets[j] && buckets[j].length)) continue;
      for (let k = 0; k < buckets[j].length; k += 1) {
        arr[index++] = buckets[j][k];
      }
    }
  }

  return arr;
}
