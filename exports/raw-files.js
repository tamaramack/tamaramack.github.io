/**
 * raw-files js file created by Tamara G. Mack on 09-Apr-19 for tamaramack.github.io
 */
const fs = require('fs');
const path = require('path');
const util = require('util');

(() => {
  const readFile = util.promisify(fs.readFile);
  const readDir = util.promisify(fs.readdir);

  const dataDir = path.resolve(__dirname, './txt/');
  const destinationDir = path.resolve(__dirname, '../src/js/data');
  const encoding = 'utf-8';

  saveJsonFile();

  async function saveJsonFile() {
    const dataFiles = await mapFiles();
    dataFiles.forEach(readTextFile);
  }

  async function mapFiles() {
    const items = await readDir(dataDir);
    const sets = new Set();

    let i = items.length;
    while (i--) {
      const item = items[i].split('.');
      const file = [item[0], item[1]].join('.');
      sets.add(file);
    }
    console.log('Directory Contents\n', [...sets]);
    return sets;
  }

  async function readTextFile(name) {
    const json = {};
    const workFile = `${name}.txt`;
    const resultsFile = `${name}.results.txt`;

    const rawInput = await readFile(path.join(dataDir, workFile), encoding);
    json.input = workFormat(rawInput);

    const rawOutput = await readFile(path.join(dataDir, resultsFile), encoding);
    json.output = resultsFormat(rawOutput);

    fs.writeFileSync(path.join(destinationDir, `${name}.json`),
      JSON.stringify(json, undefined, 2));
  }

  function resultsFormat(raw) {
    return raw.trim().split(/\n/).map(str => parseInt(str.trim(), 10));
  }

  function workFormat(raw) {
    let currentLine = 0;
    let rawArr = raw.trim().split(/\n/).map(str => str.trim());

    // read number and query count
    const nq = (rawArr[currentLine++]).split(/\s+/);
    const n = parseInt(nq[0], 10);
    const q = parseInt(nq[1], 10);
    const s = rawArr[currentLine++];

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
      const query = rawArr[currentLine++];
      queries[i] = query.split(/\s+/).map(item => parseInt(item, 10));
    }

    return { n, s, queries };
  }
})();
