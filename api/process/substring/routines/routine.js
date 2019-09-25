const cluster = require('cluster');
// const http = require('http');
const path = require('path');
const fs = require('fs');
let cpus = require('os').cpus().length;

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
    return inputString[ currentLine++ ];
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

    let currentLevel = 0;

    let count = Math.ceil(s.length / 20);
    let start = -count;
    let temp = [];
    iters.forEach(async (v, i) => {
      const worker = cluster.workers[ v ];
      worker.on('message', (data) => {
        let {row} = data;
        console.log(`${ dt(then) } worker ${ worker.id } response`, start, row.length);

        if (start + count < s.length) {
          start += count;
          worker.send({
            type: 'lengths', start, s, count, then,
          });
        }
      });
      if (start + count < s.length) {
        start += count;
        console.log(`${ dt(then) } worker ${ worker.id } start`, start);
        worker.send({
          type: 'lengths', start, s, count, then,
        });
      }
    });

    // console.info('substring', count);
    return [];// results;
  }

  function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nq = readLine().split(' ');

    const n = parseInt(nq[ 0 ], 10);

    const q = parseInt(nq[ 1 ], 10);

    const s = readLine();

    let queries = Array(q);

    for (let queriesRowItr = 0; queriesRowItr < q; queriesRowItr++) {
      queries[ queriesRowItr ] = readLine().
        split(' ').
        map(queriesTemp => parseInt(queriesTemp, 10));
    }
    queries = queries.map((v, i) => ({i, s: s.slice(v[ 0 ], v[ 1 ] + 1), c: {}}));
    queries = queries.sort((a, b) => a.s.length - b.s.length);

    let result = countSubstrings(s, queries);

    ws.write(`${ result.join('\n') }\n`);

    ws.end();
  }
} else {
  process.on('message', async (data) => {
    const {
      type, s, queries, then,
    } = data;
    switch (type) {
      case 'count':
        const {q} = data;
        count(1500, q, then);
        break;
      case 'match':
        const {start, count} = data;
        setTimeout(() => {
          nestedLoop(s, start, count, then);
        }, 1);
        break;
      case 'tree':
        const {stop} = data;
        process.send(tree(s, stop, then));
        break;
    }
  });
}

function dt(then) {
  let now = new Date(Date.now() - then);
  const t = n => (`0${ now[ `get${ n }` ]() }`).slice(-2);
  return `${ t('Minutes') }:${ t('Seconds') }.${ now.getMilliseconds() }`;
}

function distinct(arr) {
  const o = {};
  let i = arr.length;
  while (i--) o[ arr[ i ] ] = 1;
  return Object.keys(o);
}

function mapQueries(s, queries) {
  const tmp = queries.map((v, i) => ({i, s: s.slice(v[ 0 ], v[ 1 ] + 1), c: {}}));
  const q = tmp.sort((a, b) => a.s.length - b.s.length);
  return {q};
}

async function count(num, s, then) {
  const o = {};
  for (let j = 0; j <= s.length - num; j++) {
    o[ s.slice(j, j + num) ] = 1;
  }
  process.send({row: Object.keys(o)});
}

async function map(lengths, q, then) {
  const len = lengths[ 0 ].length;
  for (const query of q) {
    let remainder = query.s.length - len + 1;
    if (remainder <= 0) continue;
    let i = 0,
      count = 0;
    while (remainder && i < lengths.length) {
      if (!query.s.includes(lengths[ i++ ])) continue;
      remainder--;
      count++;
    }

    query.r[ len ] = count;
  }
  process.send({q});
}

function tree(s, stop) {
  const store = {};
  first(s, stop);

  return {results: Object.keys(store).sort((a, b) => a.length - b.length)};

  async function first(sub, stop) {
    if (!!sub && !store[ sub ] && sub.length >= stop) {
      store[ sub ] = 1;
      first(sub.slice(0, -1), stop);
      second(sub.slice(1), stop);
    }
  }

  async function second(sub, stop) {
    if (!!sub && !store[ sub ] && sub.length >= stop) {
      store[ sub ] = 1;
      second(sub.slice(1), stop);
    }
  }
}

async function simpleLoop(s, then, start = 0, count = Infinity) {
  const fb = fs.openSync('data.txt', 'w');
  let file = fs.createWriteStream('data.txt');
  const end = start + count < s.length ? start + count : s.length;
  let arr = [],
    i = 0;
  for (i = start; i < end; i++) {
    const o = Array(s.length - i).fill(null);
    for (let j = 0; j < s.length - i; j++) {
      o[ j ] = (s.slice(j, j + i + 1));
    }
    arr[ i ] = o;
    // file.write(o.join(',')+'\n');
  }

  // process.stdout.write(JSON.stringify(arr));
  // process.stdout.end('\n');
  console.log(dt(then), 'simple loop', arr.length);
  while (arr.length) {
    process.send({arr: arr.pop()});
  }
}

async function vine(substring, stop = Infinity) {
  const store = Array.call(null, ...Array(substring.length)).map(_ => ({}));
  let len = 0,
    positionCount = 0;

  for (let i = 0; i < substring.length; i++) add(substring[ i ], i);
  store[ len ] = Object.values(store[ len ]);

  let tmp = substring.split('');
  while (tmp.length > 1 && tmp[ 0 ].length < stop) lateral();

  return {subs: store.flat(), tmp};

  async function lateral() {
    len += 1;
    positionCount = 0;
    for (let i = 0; i < tmp.length - 1; i += 1) {
      const fir = tmp[ i ],
        sec = tmp[ i + 1 ];
      tmp[ i ] = fir[ 0 ] + sec;
      add(tmp[ i ], i);
    }
    const discard = tmp.pop();
    store[ len ] = Object.values(store[ len ]);
  }

  function add(sub, startIndex) {
    if (!store[ len ][ sub ]) {
      store[ len ][ sub ] = [`${ len + 1 };${ positionCount++ }`, `${ startIndex }`];
    } else {
      store[ len ][ sub ][ 1 ] += `,${ startIndex }`;
    }
  }
}
