// node --max-old-space-size=4096 ./src/server/process/process.js

const {
  fork
} = require('child_process');
const cluster = require('cluster');
// const http = require('http');
const path = require('path');
const count = require('os').cpus().length;
const strDb = require('../../js/data/substr/100.1');

const forks = [];
const { s, queries } = strDb.input;
let then = Date.now();

const results = [...queries].map((v, i) => [i, s.slice(v[0], v[1] + 1)]);
const mapped = [...queries].map(v => new Array((v[1] - v[0]) + 1));
const store = Object.fromEntries(new Array(s.length).fill(null).map((v, i) => [i + 1, {}]));
const tree = new Array(queries.length).fill(null)
  .map((v, i) => [i + 1, results.filter(v => v[1].length === i + 1)])
  .filter(v => v[1].length);

if (cluster.isMaster) {
  console.log(`${dt(Date.now() - then)} \tMaster ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < count; i++) {
    console.log(`${dt(Date.now() - then)} \tForking process number ${i}...`);
    const worker = cluster.fork();
    forks.push(worker.process.pid);
    setWorker(worker, worker.id);
  }

  cluster.on('exit', (worker, code, signal) => {
    const pid = worker.process.pid;
    if (signal) {
      console.log(`${dt(Date.now() - then)}\t worker ${pid} was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`${dt(Date.now() - then)}\t worker ${pid} exited with error code: ${code}`);
    } else {
      console.log(`${dt(Date.now() - then)}\t worker ${pid} died`);
    }
  });

  // runChildProcess(process.pid);
  setTimeout(() => {
    console.log(`${dt(Date.now() - then)} \tMaster ${process.pid} now exiting\n`);
    process.exit();
  }, 15000);
} else {
  // const index = parseInt(forks[process.pid].id) - 1;
  console.log(`${dt(Date.now() - then)} \tWorker ${process.pid} started`);
  process.on('message', (msg) => {
    console.log(`${dt(Date.now() - then)} \tWorker ${process.pid} receives message`, msg);
  });

  process.send({ msg: `Message from worker ${process.pid}` });
  setTimeout(() => {
    process.exit();
  }, 1000);
}

function setWorker(worker, index) {
  const pid = worker.process.pid;
  worker.on('message', (data) => {
    console.log(`${dt(Date.now() - then)} \tMessage from worker #${index}::${pid}`, data);
  });
}

function dt(now) {
  now = new Date(now);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
}
