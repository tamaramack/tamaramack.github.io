/**
 * map-query-substring js file created by Tamara G. Mack on 30-Jul-19 for
 * tamaramack.github.io
 */
import { removeDuplicates, isNumber } from '@/js/utilities/utilities';
import { plus } from '@/js/math-helpers';

var time;
export default async function (s, queries, then) {
  s = s.replace(/[\s\n]/gm, '');
  time = then;
  const results = [...queries].map((v, i) => [i, s.slice(v[0], v[1] + 1)]);
  const mapped = [...queries].map(v => new Array((v[1] - v[0]) + 1));
  const store = Object.fromEntries(new Array(s.length).fill(null).map((v, i) => [i + 1, {}]));
  const tree = new Array(queries.length).fill(null)
    .map((v, i) => [i + 1, results.filter(v => v[1].length === i + 1)])
    .filter(v => v[1].length);

  console.log('Mapped && Start Queries', dt(Date.now() - time), tree, store);

  // Start mapping initial 100 lengths
  let initialLength = 100;
  if (s.length < initialLength) initialLength = s.length;
  await mapQuerySubs(s, queries, mapped, 0, initialLength);
  console.log(`End initial ${initialLength}`, dt(Date.now() - time));

  for (let i = 0; i < results.length; i += 1) results[i] = plus(...mapped[i]);
  console.log('End map results', dt(Date.now() - time));

  return { results };
}

async function matchSubs(s, queries, mapped, subs) {
  if (!subs.length) return;
  const subLen = subs[0].length;
  for (let i = 0; i < mapped.length; i += 1) {
    if (mapped[i].length < subLen) continue;
    let sub = s.slice(queries[i][0], queries[i][1] + 1);
    for (let j = 0; j < subs.length; j += 1) {
      if (!isNumber(mapped[i][subLen - 1])) mapped[i][subLen - 1] = 0;
      if (sub.indexOf(subs[j]) > -1) mapped[i][subLen - 1] += 1;
    }
  }
}

async function countSubs(s, queries, mapped, count) {
  let keys = [],
    len = s.length - count;
  for (let i = 0; i <= len; i += 1) keys[keys.length] = s.slice(i, i + count);
  keys = removeDuplicates(keys);
  await matchSubs(s, queries, mapped, keys);
}

async function mapQuerySubs(s, queries, mapped, start = 0, length = 1) {
  await countSubs(s, queries, mapped, start + 1);
  if (start < length) await mapQuerySubs(s, queries, mapped, start + 1, length);
}

function searchStore(s, count, store) {
  for (let i = 0; i < count; i += 1) {
    const arr = store[i + 1],
      subs = Object.keys(arr);
    delete store[i + 1];
  }
}

async function startTreeMap(s, count, store) {
  let keys = {},
    len = s.length - count;
  for (let i = 0; i <= len; i += 1) keys[s.slice(i, i + count)] = 1;
  keys = Object.keys(keys);
  for (let i = 0; i < keys.length; i += 1) {
    Tree(keys[i], store).then(() => {
      searchStore(s, count, store);
    });
  }
}

async function Tree(s, store) {
  await firstBranch(s, store);
}

async function firstBranch(s, store) {
  if (store[s.length][s]) return;
  store[s.length][s] = 1;
  if (!store[s.length - 1]) return;
  await firstBranch(s.slice(0, -1), store);
  await secondBranch(s.slice(1), store);
}

async function secondBranch(s, store) {
  if (store[s.length][s]) return;
  store[s.length][s] = 1;
  if (!store[s.length - 1]) return;
  await secondBranch(s.slice(1), store);
}

function newMatrix(length) {
  return new Array(length).fill(0);
}

function dt(now) {
  now = new Date(now);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
}
