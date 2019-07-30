/**
 * async-substrings js file created by Tamara G. Mack on 30-Jul-19 for
 * tamaramack.github.io
 */
import { removeDuplicates } from '@/js/utilities/utilities';

export default async function (s, queries) {
  s = s.replace(/[\s\n]/gm, '');
  let all = new Array(s.length).fill(null);
  const results = new Array(queries.length)
    .fill(0)
    .map((v, i) => s.slice(+queries[i][0], +queries[i][1] + 1));
  let qs = new Array(s.length).fill(null).map((v, i) => [i + 1, []]);

  if (s.length < 3000) {
    all = [];
    for (let i = 0; i < s.length; i += 1) {
      let n = '';
      for (let j = i; j < s.length; j += 1) {
        n += s[j];
        all[all.length] = n;
      }
    }
    all = all.sort();

    let i = all.length;
    while (i--) if (i && all[i] === all[i - 1]) delete all[i];

    all = all.filter(v => v);
    all = all.sort((a, b) => a.length - b.length);

    for (let i = 0; i < results.length; i += 1) {
      const sub = results[i],
        arr = [];
      for (let j = 0; j < all.length; j += 1) {
        const tmp = all[j];
        if (tmp.length > sub.length) break;
        if (sub.indexOf(tmp) > -1) arr[arr.length] = j;
      }
      results[i] = arr.length;
    }
    return { results, qs, all };
  }

  let i = results.length;
  while (i--) qs[(results[i]).length - 1][1].push(i);
  qs = qs.filter(v => (v[1]).length);

  // const patterns = await findPattern(s);
  console.info('Map with async Fn', results.length, qs);

  await mapLengths(s, all);
  console.log('async all', all);

  return { results, qs, all };
}

async function countSubs(s, count) {
  let keys = [];
  let len = s.length - count;
  for (let i = 0; i < len; i += 1) keys[keys.length] = s.slice(i, i + count);
  keys = keys.sort();

  let i = keys.length;
  while (i--) if (i && keys[i] === keys[i - 1]) delete keys[i];
  keys = keys.filter(v => v);

  return keys;
}

async function mapLengths(s, all) {
  let then = Date.now();
  let breakpoint = all.length - 1;
  for (let i = 0; i < all.length; i += 1) {
    countSubs(s, i + 1).then((keys) => { all[i] = keys; });
    if (Date.now() - then > 15000) {
      breakpoint = i;
      break;
    }
  }
  if (breakpoint < all.length - 1) console.warn('mapLengths() Timed Out after 15s', breakpoint);
}

async function findPattern(s) {
  const pattern = {};
  const getChars = s => removeDuplicates(s).sort().join('');

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
    matrix = removeDuplicates(matrix);
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

  console.log('Patterns', ...Object.entries(pattern));
  return pattern;
}
