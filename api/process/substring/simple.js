/**
 * simple js file created by Tamara G. Mack on 01-Aug-19 for
 * tamaramack.github.io
 */

const cluster = require('cluster');// const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');
const cpus = require('os').cpus().length;

const substringJson = '100000.1';
const substringPath = `../../data/${ substringJson }`;
const strDb = require(substringPath);

const {s, queries} = strDb.input;
let time = Date.now();

// Run Process
if (cluster.isMaster) {
  console.log(`${ dt(Date.now() - time) } \tMaster ${ process.pid } is running`);
  const results = {
    loop: [],
    tree: [],
    recursive: [],
  };
  let complete = 0,
    completeTotal = () => Object.keys(cluster.workers).length;

  let exit = setTimeout(() => {
    cluster.disconnect(() => {
      process.exit();
    });
  }, 15000);

  cluster.on('exit', (worker, code, signal) => {
    let msg = `${ dt(Date.now() - time) } \t`;
    console.log(msg, `Process ${ worker.id || 'Parent' }::${ worker.pid } now exiting\n`);
  });

  cluster.on('message', (worker, data, handle) => {
    const pid = worker.process.pid,
      final = results[ data.type ];

    let msgStr = `${ dt(Date.now() - time) }\t`;
    msgStr += `[${ data.type.toUpperCase() }] Worker ${ worker.id }::${ pid }`;

    final[ data.i ] = data.results;
    if (final.every(v => v && v.length)) {
      console.log(`${ msgStr } FINAL\n`, final.flat().join(', '));
      worker.disconnect();
    }

    complete++;
    if (complete === completeTotal()) {
      cluster.disconnect(() => {
        clearTimeout(exit);
        process.exit();
      });
    }
  });

  // let count = cpus - 1;
  // worker(count >> 1, 'loop', results.loop);
  console.log(`${ dt(Date.now() - time) } \tStart creating mapped queries`);
  const q = queries.map((v, i) => ({v, i}));
  console.log(`${ dt(Date.now() - time) } \tEnd Map Objects, \n\tStart Map Substrings`);

  for (let obj of q.values()) obj.v = s.slice(obj.v[ 0 ], obj.v[ 1 ] + 1);
  console.log(`${ dt(Date.now() - time) } \tEnd Map Substrings, \n\tStart Map Array of Lengths`);

  for (let obj of q.values()) obj.r = [];
  // console.log(`${dt(Date.now() - time)} \tCont Map Array of Lengths`);
  // for (let obj of q.values()) obj.r.fill(0);
  console.log(`${ dt(Date.now() - time) } \tEnd Map Array of Lengths, \n\tStart Map Distinct`);

  for (let obj of q.values()) {
    obj.r[ 0 ] = distinct(obj.v).length;
    obj.r[ obj.v.length - 1 ] = obj.s;
  }
  console.log(`${ dt(Date.now() - time) } \tEnd Map Distinct`, JSON.stringify(q));
} else {
  process.on('message', (data) => {
    const {type} = data;

    let msg = `${ dt(Date.now() - time) } \t`;
    msg += `Worker ${ cluster.worker.id }::${ process.pid } receives start cmd =>`;
    console.log(msg, type, '\n', data);

    if (type === 'tree') {
      tree(data).then(() => {
        process.disconnect();
      });
    } else if (type === 'loop') {
      loop(data).then(() => {
        process.disconnect();
      });
    } else {
      recursive(data).then(() => {
        process.disconnect();
      });
    }
  });
}

function worker(num, type, final) {
  final = Array(num).fill(null);
  for (let i = 0; i < final.length; i++) {
    const worker = cluster.fork();

    let count = Math.ceil(s.length / final.length);
    let start = !i ? i : i * count;
    if (count === s.length) count = 0;

    worker.send({
      type, count, start, i,
    });
  }
}

async function loop(data) {
  let store = [];
  console.log(`${ dt(Date.now() - time) } \t[Loop] Start Loop`);

  for (let i = 0; i < s.length; i += 1) {
    let n = '';
    for (let j = i; j < s.length; j += 1) {
      n += s[ j ];
      store[ store.length ] = n;
    }
  }
  console.log(`${ dt(Date.now() - time) } \t[Loop] End Loop`, store.length);

  store = distinct(store).sort((a, b) => a.length - b.length);
  console.log(`${ dt(Date.now() - time) } \t[Loop] Distinct & Sorted`, store.length);
  await addToResults(store, 'Loop', data);
}

async function tree(data) {
  let store = new Set();
  console.log(`${ dt(Date.now() - time) } \t[Tree] Start Recursive Call`);
  await firstBranch(s, store);
  console.log(`${ dt(Date.now() - time) } \t[Tree] End Recursive`, store.size);

  store = ([...store]).sort((a, b) => a.length - b.length);
  console.log(`${ dt(Date.now() - time) } \t[Tree] Distinct & Sorted`, store.length);

  await addToResults(store, 'Tree', data);
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

async function addToResults(store, name, data) {
  const {count, start} = data;
  let end = start + count;
  end = end > queries.length ? queries.length : end;

  const results = queries.slice(start, end).map(v => s.slice(v[ 0 ], v[ 1 ] + 1));
  for (let i = 0; i < results.length; i += 1) {
    const qs = results[ i ];
    let c = 0;
    for (let j = 0; j < store.length; j += 1) {
      const ss = store[ j ];
      if (qs.length < ss.length) break;
      if (qs.indexOf(ss) > -1) c += 1;
    }
    results[ i ] = c;
  }
  console.log(`${ dt(Date.now() - time) } \t[${ name }] End map results`);

  process.send({results, ...data});
}

async function recursive(data) {
  const {count, start} = data;
  let end = start + count;
  end = end > queries.length ? queries.length : end;
  let results = queries.slice(start, end).map(v => s.slice(v[ 0 ], v[ 1 ] + 1));
  console.log(`${ dt(Date.now() - time) } \t[Recursive] Start Recursive Call`);

  for (let i of results.keys()) results[ i ] = recurCount(i, results);
  console.log(`${ dt(Date.now() - time) } \t[Recursive] End map results`);

  results = await Promise.all(results);
  process.send({results, ...data});
}

async function recurCount(idx, results) {
  const sub = results[ idx ];
  const d = distinct(sub);
  if (d.length === 1) return sub.length;
  if (d.length === sub.length) {
    return plusFactor(d.length);
  }

  if (d.length === 2) {
    // return 0;
  }

  let n = d.length;
  for (let i = 0; i < d.length; i += 1) {
    n = map(n, d[ i ], sub.indexOf(d[ i ]), d, sub);
  }

  // console.log('sub', `${idx} => ${sub.length}`, `${r[idx]} :: ${n}`);
  return n;
}

function map(n, cluster, start, dist, sub) {
  for (let i = 0; i < dist.length; i++) {
    const index = sub.indexOf(cluster + dist[ i ], start);
    if (index > -1) n = map(n + 1, cluster + dist[ i ], index, dist, sub);
  }
  return n;
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
      const digit = getDigit(arr[ j ].length, i + 1);
      buckets[ digit ] = buckets[ digit ] || [];
      buckets[ digit ].push(arr[ j ]);
    }

    index = 0;
    for (let j = 0; j < buckets.length; j += 1) {
      if (!(buckets[ j ] && buckets[ j ].length)) continue;
      for (let k = 0; k < buckets[ j ].length; k += 1) {
        arr[ index++ ] = buckets[ j ][ k ];
      }
    }
  }

  return arr;
}
