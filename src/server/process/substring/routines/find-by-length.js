/**
 * find-by-length js file created by Tamara G. Mack on 03-Aug-19 for
 * tamaramack.github.io
 */
const path = require('path');
const { dt } = require('./utilities');
const writeStreamFile = require('./write-stream');

let time = Date.now();

module.exports = async function mapLengthSet(s, count) {
  let set = new Set();
  const end = s.length - count + 1;
  for (let i = 0; i <= end; i += 1) set.add(s.slice(i, i + count));
  console.log(`${dt(Date.now() - time)} \t[Loop] End ${count}`, set.size);

  const mappedFile = path.resolve(__dirname, `./.store/${count}_${s.length}`);
  await writeStreamFile(set.values(), mappedFile, { count, mappedFile });
  console.log(`${dt(Date.now() - time)} \t[Loop] Start ${count}`);
  set.clear();
};
