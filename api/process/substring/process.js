// node --max-old-space-size=4096 ./src/server/process/process.js

const {
  fork,
} = require('child_process');
const cluster = require('cluster');// const http = require('http');
const fs = require('fs');
const path = require('path');
const util = require('util');
const count = require('os').cpus().length;

const substringJson = '100000.1';
const substringPath = `${ __dirname }/api/data/${ substringJson }`;
const strDb = require(substringPath);

const readFile = util.promisify(fs.readFile);
const readdir = util.promisify(fs.readdir);
// const openSync = util.promisify(fs.openSync);
// const createWriteStream = util.promisify(fs.createWriteStream);
// const createReadStream = util.promisify(fs.createReadStream);

const forks = [];
const {s, queries} = strDb.input;
let then = Date.now();

if (cluster.isMaster) {
  console.log(`${ dt(Date.now() - then) } \tMaster ${ process.pid } is running`);

  // Fork workers.
  for (let i = 0; i < count; i++) {
    console.log(`${ dt(Date.now() - then) } \tForking process number ${ i }...`);
    const worker = cluster.fork();
    forks.push(worker.process.pid);
    setWorker(worker, worker.id);
  }

  const ids = Object.keys(cluster.workers);
  for (let i = 0; i < ids.length; i++) {
    const worker = cluster.workers[ ids[ i ] ];
    const nextW = cluster.workers[ ids[ i + 1 ] ];
    const pid = worker.process.pid;

    let msg = `${ dt(Date.now() - then) } \tMessage from worker #${ worker.id }`;

    worker.on('message', (data) => {
      console.log(msg, data);
    });

    if (nextW) {
      worker.stdout.pipe(nextW);
    }

    worker.send({nextWorker: nextW || {}});
  }

  cluster.on('exit', (worker, code, signal) => {
    const pid = worker.process.pid;
    if (signal) {
      console.log(`${ dt(Date.now() - then) }\t worker ${ pid } was killed by signal: ${ signal }`);
    } else if (code !== 0) {
      console.log(`${ dt(Date.now() - then) }\t worker ${ pid } exited with error code: ${ code }`);
    } else {
      console.log(`${ dt(Date.now() - then) }\t worker ${ pid } died`);
    }
  });

  // runChildProcess(process.pid);
  setTimeout(() => {
    console.log(`${ dt(Date.now() - then) } \tMaster ${ process.pid } now exiting\n`);
    process.exit();
  }, 15000);
} else {
  const id = cluster.worker.id;
  const pid = process.pid;
  let nextWorker;
  console.log(`${ dt(Date.now() - then) } \tWorker ${ id }::${ pid } started`);

  process.on('message', (data) => {
    console.log(`${ dt(Date.now() - then) } \tWorker ${ pid } receives message`,
      data.nextWorker.id);
    nextWorker = data.nextWorker;
  });

  process.send({msg: `Message from worker ${ pid }`});

  // process.stdin.pipe('');

  setTimeout(() => {
    process.exit();
  }, 1000);
}

function setWorker(worker, index) {
  const pid = worker.process.pid;
  worker.on('message', (data) => {
    console.log(`${ dt(Date.now() - then) } \tMessage from worker #${ index }::${ pid }`, data);
  });
}

async function readMapSubs(count, s, index) {

}

async function readMapQueries(queries, s, index) {

}

function temp() {
  const mappedFile = path.resolve(__dirname, './.store/mapped');
  const fb = fs.openSync(mappedFile, 'w');
  const file = fs.createWriteStream(mappedFile);

  const subLen = Array(s.length).fill(null).map((v, i) => []);
  const qLen = Array(queries.length).fill(null).map((v, i) => [i + 1, []]);
  const results = Array(queries.length).fill(null).map((v, i) => []);

  const iQueries = queries.values();
  const iSubLen = subLen.values();
  const iQLen = qLen.values();

  for (let i = 0; i < queries.length; i += 1) {
    const v = queries[ i ];
    file.write(
      `${ JSON.stringify([i, s.slice(v[ 0 ], v[ 1 ] + 1), Array((v[ 1 ] - v[ 0 ]) + 1)]) }\n`);
  }

  file.end();

  /* const store = Object.fromEntries(new Array(s.length).fill(null).map((v, i) => [i + 1, {}]));
   const tree = new Array(queries.length).fill(null)
   .map((v, i) => [i + 1, results.filter(v => v[1].length === i + 1)])
   .filter(v => v[1].length); */
}

function dt(now) {
  now = new Date(now);
  const t = n => (`0${ now[ `get${ n }` ]() }`).slice(-2);
  return `${ t('Minutes') }:${ t('Seconds') }.${ now.getMilliseconds() }`;
}
