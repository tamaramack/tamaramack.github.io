/**
 * patterns js file created by Tamara G. Mack on 19-Aug-19 for
 * tamaramack.github.io
 */
const { dt, distinct } = require('./utilities');

module.exports = async function findPatterns(s) {
  const pattern = {};
  const getChars = s => distinct(s).sort().join('');

  let chunk = s.substring(0, 2);
  let chars = getChars(chunk);
  pattern[chars] = [];

  for (let i = 2; i < s.length; i++) {
    // console.log(char, s[i], chunk);
    const sample = chunk.slice(-3);
    if (!sample.includes(s[i])) {
      pattern[chars][pattern[chars].length] = chunk;

      chunk = s[i] + s[i + 1];
      chars = getChars(chunk);
      if (!pattern[chars]) {
        pattern[chars] = [];
      }
      i += 2;
      continue;
    }
    chunk += s[i];
  }

  let entries = Object.entries(pattern);
  for (let k = 0; k < entries.length; k++) {
    let key = entries[k][0],
      matrix = entries[k][1];
    if (!matrix.length) {
      delete pattern[key];
      continue;
    }
    matrix = distinct(matrix);
    pattern[key] = matrix.sort((a, b) => b.length - a.length);

    const primary = pattern[key][0];
    if (primary.length < 3) {
      delete pattern[key];
      continue;
    }

    for (let i = 1; i < pattern[key].length; i++) {
      if (primary.includes(pattern[key][i])) {
        pattern[key].splice(i, 1);
      }
    }
  }

  return pattern;
};
