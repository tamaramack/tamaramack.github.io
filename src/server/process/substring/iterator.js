/**
 * iterator js file created by Tamara G. Mack on 01-Aug-19 for
 * tamaramack.github.io
 */
const cluster = require('cluster');// const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');
const cpus = require('os').cpus().length;

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
    cluster.disconnect(() => {
      process.exit();
    });
  }, 25000);
} else {
  process.on('message', (data) => {
    console.log(`${dt(Date.now() - time)} \tWorker ${process.pid} receives start cmd`);
  });
}

/**
 * Private Process Functions
 */

function parentMainProcess() {
  const workers = mainCreateWorkers();
  console.info(`${dt(Date.now() - time)} \tWorkers created\n`, workers);

  const results = queries.map((v, i) => [i, s.slice(v[0], v[1] + 1)]);
  for (let arr of results.values()) arr.push(Array(arr[arr.length - 1].length).fill(0));

  return { workers, results };
}

function mainWorkerEvents(workers) {
  cluster.on('exit', (worker, code, signal) => {
    const pid = worker.process.pid;
    const msgStr = `${dt(Date.now() - time)}\t worker ${pid}`;
    if (signal) {
      console.log(`${msgStr} was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`${msgStr} exited with error code: ${code}`);
    } else {
      console.log(`${msgStr} died`);
    }
  });

  cluster.on('message', (worker, message, handle) => {
    const pid = worker.process.pid;
    const msgStr = `${dt(Date.now() - time)}\t worker ${pid}`;
    if (workers.i.includes(worker.id)) {
      // TODO: pipeline
    } else if (workers.sub.primary.includes(worker.id)) {
      // TODO: mapping
    } else {
      // TODO: whatever left
    }
  });
}

function mainCreateWorkers() {
  let count = cpus - 1;
  const workers = {};
  workers.parent = cluster.worker.id;

  for (let i = 0; i < count; i++) cluster.fork();
  const ids = Object.keys(cluster.workers).values();

  // have 4 pcs for iteration
  workers.i = Array(4).fill(null).map(() => ids.next().value);
  count -= workers.i.length;

  // make subprocess workers
  workers.sub = {};
  if (count > 1) {
    workers.sub.primary = Array(count >> 1).fill(null).map(() => ids.next().value);
    count -= workers.sub.primary.length;
    workers.sub.secondary = Array(count).fill(null).map(() => ids.next().value);
  } else {
    workers.sub.primary = Array(count).fill(null).map(() => ids.next().value);
    workers.sub.secondary = null;
  }

  return workers;
}

function childMainProcess() {

}

function childIterativeProcess() {

}


/**
 * Private Counting Functions
 */

/**
 *
 * @param sub
 * @returns {Promise<*|[]>}
 */
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

  store = distinct(store).sort((a, b) => a.length - b.length);
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


function distinct(arr) {
  let set = new Set();
  for (let value of arr.values()) set.add(value);
  return [...set];
}

function dt(now) {
  now = new Date(now);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
}
