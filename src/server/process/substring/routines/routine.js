/* eslint-disable lines-around-directive */
/* eslint-disable strict */
/**
 * routine js file created by Tamara G. Mack on 04-Aug-19 for
 * tamaramack.github.io
 */

'use strict';

const cluster = require('cluster');
const cpus = require('os').cpus().length;
const fs = require('fs');
const path = require('path');
const util = require('util');

if (cluster.isMaster) {
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  let inputString = '';
  let currentLine = 0;

  process.stdin.on('data', (inputStdin) => {
    inputString += inputStdin;
  });

  process.stdin.on('end', (_) => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
  });

  function readLine() {
    return inputString[currentLine++];
  }

  let then = Date.now();
  while (cpus--) cluster.fork();
  const ids = Object.keys(cluster.workers);
  const iters = ids.splice(0, Math.floor(ids.length / 2));

  /*
   * Complete the countSubstrings function below.
   */
  function countSubstrings(s, queries) {
    console.log('CPUs', ids.length);

    const qWorker = cluster.workers[ids.pop()];
    qWorker.send({
      type: 'queries', s, queries, then
    });
    qWorker.on('message', (data) => {
      console.log(dt(then), 'queries worker response');
      const { result, lengths } = data;
    });

    let currentLevel = 0;
    let store = Array(s.length).fill(null).map((v, i) => []);
    store[0] = s.split('');

    /* const lvlWorker = cluster.workers[ids.pop()];
     lvlWorker.on('message', (data) => {
     const { row } = data;
     const level = row[0].length - 1;
     store[level] = row;
     console.log('level worker response', level, currentLevel);

     if (currentLevel < s.length) {
     currentLevel = level;
     lvlWorker.send({ type: 'levels', prev: store[currentLevel] });
     }
     });
     lvlWorker.send({ type: 'levels', prev: store[currentLevel] }); */

    let start = 0;
    const temp = [];
    iters.forEach((v, i) => {
      const worker = cluster.workers[v];
      worker.on('message', (data) => {
        const { row } = data;
        temp.push(row);
        console.log(`${dt(then)} loop worker ${worker.id} response`, start, row.length, temp.length);

        if (start < s.length) {
          worker.send({
            type: 'nested', start: start++, s, then
          });
        }
      });
      if (start < s.length) worker.send({ type: 'nested', start: start++, s });
    });
    // console.info('Loop substring', JSON.stringify(store));

    const loopWorker = cluster.workers[ids.pop()];
    loopWorker.on('message', (data) => {
      const { arr } = data;
      console.log(dt(then), 'simple worker response', arr);
      arr = arr.sort((a, b) => a.length - b.length);
      arr = arr.filter((v, i, tmp) => v !== tmp[i + 1]);
      console.log(dt(then), 'distinct simple', arr.length);
    });
    loopWorker.send({ type: 'simple', s, then });
    // for (let [i, arr] of store.entries()) store[i] = distinct(arr);

    // console.info('Loop substring store', store);
    return [];// results;
  }

  function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nq = readLine().split(' ');

    const n = parseInt(nq[0], 10);

    const q = parseInt(nq[1], 10);

    const s = readLine();

    let queries = Array(q);

    for (let queriesRowItr = 0; queriesRowItr < q; queriesRowItr++) {
      queries[queriesRowItr] = readLine().split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    let result = countSubstrings(s, queries);

    ws.write(`${result.join('\n')}\n`);

    ws.end();
  }
} else {
  process.on('message', (data) => {
    const {
      type, s, queries, then
    } = data;
    switch (type) {
      case 'queries':
        process.send(mapQueries(s, queries));
        break;
      case 'levels':
        const { prev } = data;
        process.send(mapLengthLevel(prev, then));
        break;
      case 'tree':
        const { stop } = data;
        process.send(tree(s, stop, then));
        break;
      case 'nested':
        const { start } = data;
        process.send(nestedLoop(s, start, then));
        break;
      case 'simple':
        process.send(simpleLoop(s, then));
        break;
      default:
        break;
    }
  });
}

function dt(then) {
  let now = new Date(Date.now() - then);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
}

function distinct(arr) {
  const o = {};
  let i = arr.length;
  while (i--) o[arr[i]] = 1;
  return Object.keys(o);
}

function mapQueries(s, queries) {
  const results = queries.map(v => s.slice(v[0], v[1] + 1));
  let lengths = Array(s.length).fill(null).map((v, i) => [i + 1, []]);

  for (let i = 0; i < results.length; i++) lengths[results[i].length - 1][1].push(i);
  lengths = lengths.filter(v => v[1].length);

  // console.log('lengths', lengths);
  return { results, lengths };
}

function tree(s, stop) {
  const store = {};
  first(s, stop);

  return { results: Object.keys(store).sort((a, b) => a.length - b.length) };

  async function first(sub, stop) {
    if (!!sub && !store[sub] && sub.length >= stop) {
      store[sub] = 1;
      first(sub.slice(0, -1), stop);
      second(sub.slice(1), stop);
    }
  }

  async function second(sub, stop) {
    if (!!sub && !store[sub] && sub.length >= stop) {
      store[sub] = 1;
      second(sub.slice(1), stop);
    }
  }
}

function simpleLoop(s, then) {
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    let sub = '';
    for (let j = i; j < s.length; j++) {
      sub += s[j];
      arr.push(sub);
    }
  }

  console.log(dt(then), 'simple loop', arr.length);
  return { arr };
}

function nestedLoop(s, start) {
  const o = [];
  let sub = '';
  for (let i = +start; i < s.length; i += 1) {
    sub += s[i];
    o[sub] = 1;
  }
  return { row: Object.keys(o).sort((a, b) => a.length - b.length) };
}

function mapLengthLevel(prev) {
  const row = [];
  for (let i = 1; i < prev.length; i += 1) {
    row[row.length] = (prev[i - 1][0] + prev[i]);
  }
  return { row };
}
