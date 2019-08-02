/**
 * iterator js file created by Tamara G. Mack on 01-Aug-19 for
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
  const results = queries.map(v => [s.slice(v[0], v[1] + 1), 0]);
  let complete = 0;

  let exit = setTimeout(() => {
    console.log(`${dt(Date.now() - time)} \tMaster ${process.pid} now exiting\n`);
    process.exit();
  }, 25000);

  // countSubstring Worker
  const worker1 = cluster.fork();
  worker1.on('message', (data) => {
    console.log(`${dt(Date.now() - time)} \tMessage from worker 1\n`, data.results.join(', '));
    complete++;
    if (complete === 2) {
      clearTimeout(exit);
      process.exit();
    }
  });

  // countSubstring Worker
  const worker2 = cluster.fork();
  worker2.on('message', (data) => {
    console.log(`${dt(Date.now() - time)} \tMessage from worker 2\n`, data.results.join(', '));
    complete++;
    if (complete === 2) {
      clearTimeout(exit);
      process.exit();
    }
  });

  worker1.send({ worker: 'getSubs' });
  worker2.send({ worker: 'addToResults' });
} else {
  process.on('message', (data) => {
    console.log(`${dt(Date.now() - time)} \tWorker ${process.pid} receives start cmd`);
  });
}

async function getSubs(sub) {
  let store = [];
  console.log(`${dt(Date.now() - time)} \t[Simple] Start Loop`);

  for (let i = 0; i < sub.length; i += 1) {
    let n = '';
    for (let j = i; j < sub.length; j += 1) {
      n += sub[j];
      store[store.length] = n;
    }
  }
  console.log(`${dt(Date.now() - time)} \t[Simple] End Loop`, store.length);

  store = removeDuplicates(store).sort((a, b) => a.length - b.length);
  console.log(`${dt(Date.now() - time)} \t[Simple] Distinct & Sorted`, store.length);

  return store;
}

async function addToResults(store, results) {
  for (let i = 0; i < results.length; i += 1) {
    const qs = results[i][0];
    for (let j = 0; j < store.length; j += 1) {
      const ss = store[j];
      if (qs.length < ss.length) break;
      if (qs.indexOf(ss) > -1) results[i][1] += 1;
    }
  }
  console.log(`${dt(Date.now() - time)} \t[Simple] End map results`);

  process.send({ results });
}


function removeDuplicates(strArr) {
  let set = new Set();
  let i = strArr.length;
  while (i--) set.add(strArr[i]);
  return [...set];
}

function isNumber(num) {
  return !Number.isNaN(Number(num));
}

function plus(...n) {
  let sum = 0;
  let i = n.length;
  while (i--) sum += (+n[i]);
  return sum;
}

function dt(now) {
  now = new Date(now);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
}
