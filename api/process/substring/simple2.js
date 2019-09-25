/**
 * simple js file created by Tamara G. Mack on 01-Aug-19 for
 * tamaramack.github.io
 */

const cluster = require('cluster');// const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');
const cpus = require('os').cpus().length;

const open = util.promisify(fs.open);

const substringJson = '100000.1';
const substringPath = `../../data/${ substringJson }`;
const strDb = require(substringPath);

const {s, queries} = strDb.input;
let time = Date.now();

// Run Process
if (cluster.isMaster) {
  console.log(`${ dt(Date.now() - time) } \tMaster ${ process.pid } is running`);
  let complete = 0,
    completeTotal = () => Object.keys(cluster.workers).length;

  // let count = cpus - 1;
  // worker(count >> 1, 'loop', results.loop);
  console.log(`${ dt(Date.now() - time) } \tStart creating mapped queries`);
  const q = queries.map((v, i) => ({i, c: 0, s: s.slice(v[ 0 ], v[ 1 ] + 1)}));
  console.log(`${ dt(Date.now() - time) } \tEnd Map Objects`);
  let lens = queries.map((v, i) => [i + 1, []]);
  for (let sub of q.values()) lens[ sub.s.length - 1 ][ 1 ].push(sub.i);
  lens = lens.filter(v => v[ 1 ].length);
  console.log(`${ dt(Date.now() - time) } \tEnd Map Lengths`);

  const workerLen = cluster.fork();
  workerLen.send({count: s.length / 4, type: 'loop'});

  const workerTree = cluster.fork();
  workerTree.send({end: s.length - (s.length * 0.01), type: 'tree'});

  let exit = setTimeout(() => {
    cluster.disconnect(() => {
      process.exit();
    });
  }, 45000);

  cluster.on('exit', (worker, code, signal) => {
    let msg = `${ dt(Date.now() - time) } \t`;
    console.log(msg, `Process ${ worker.id || 'Parent' }::${ worker.process.pid } now exiting\n`);
  });

  cluster.on('message', (worker, data, handle) => {
    const pid = worker.process.pid;
    let msg = `${ dt(Date.now() - time) } \t`;
    console.log(msg, `Process ${ worker.id || 'Parent' }::${ pid } received ${ data.count ||
    data.end }, ${ data.mappedFile }\n`);
    if (data.type === 'loop' && data.count < s.length) {
      worker.send({count: data.count + 1, type: 'loop'});
    } else if (data.type === 'tree' && data.end > 0) {
      worker.send({end: data.end - (s.length * 0.01), type: 'tree'});
    } else {
      complete++;
      if (complete === completeTotal()) {
        cluster.disconnect(() => {
          clearTimeout(exit);
          process.exit();
        });
      }
    }
  });
} else {
  process.on('message', (data) => {
    const {type} = data;

    let msg = `${ dt(Date.now() - time) } \t`;
    msg += `Worker ${ cluster.worker.id }::${ process.pid } receives start cmd =>`;
    console.log(msg, type, '\n', data);

    if (type === 'tree') {
      tree(data.s || s, data.end).then(() => ({}));
    } else if (type === 'loop') {
      loop(data.s || s, data.count).then(() => {
        // process.disconnect();
      });
    } else {
      // todo: later
    }
  });
}

async function loop(s, count) {
  let set = new Set();
  const end = s.length - count + 1;
  for (let i = 0; i <= end; i += 1) set.add(s.slice(i, i + count));
  console.log(`${ dt(Date.now() - time) } \t[Loop] End ${ count }`, set.size);

  const mappedFile = path.resolve(__dirname, `./.store/${ count }_${ s.length }`);
  await open(mappedFile, 'w');
  const file = fs.createWriteStream(mappedFile);
  console.log(`${ dt(Date.now() - time) } \t[Loop] Start ${ count }`);

  for (let sub of set.values()) file.write(`${ sub }\n`);
  set.clear();
  file.end('\n');
  process.send({count, mappedFile});
}

async function tree(s, end) {
  let set = new Set();
  console.log(`${ dt(Date.now() - time) } \t[Tree] Start Recursive Call`);
  await firstBranch(s, set, end);
  console.log(`${ dt(Date.now() - time) } \t[Tree] End Recursive`, set.size);

  const mappedFile = path.resolve(__dirname, `./.store/${ end }_${ s.length }`);
  await open(mappedFile, 'w');
  const file = fs.createWriteStream(mappedFile);
  console.log(`${ dt(Date.now() - time) } \t[Tree] Write Stream`);

  for (let sub of set.values()) file.write(`${ sub }\n`);
  set.clear();
  file.end('\n');
  process.send({end, mappedFile});
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

async function addToMapped(set, q) {
  for (let sub of q.values()) {
  }
  console.log(`${ dt(Date.now() - time) } \t[Mapped] End map results`);

  process.send({});
}

function dt(now) {
  now = new Date(now);
  const t = n => (`0${ now[ `get${ n }` ]() }`).slice(-2);
  return `${ t('Minutes') }:${ t('Seconds') }.${ now.getMilliseconds() }`;
}

function distinct(arr) {
  const set = new Set();
  for (let i = 0; i < arr.length; i += 1) set.add(arr[ i ]);
  return [...set];
}

function plusFactor(n) {
  let sum = n;
  while (n--) sum += n;
  return sum;
}
