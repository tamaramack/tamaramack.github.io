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

let inputString = '';
let currentLine = 0;

if (cluster.isMaster) {
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', (inputStdin) => {
    inputString += inputStdin;
  });

  process.stdin.on('end', (_) => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
  });
} else {

}

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the countSubstrings function below.
 */
function countSubstrings(s, queries) {
  /*
   * Write your code here.
   */

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
