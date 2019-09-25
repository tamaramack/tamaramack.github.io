/**
 * utilities js file created by Tamara G. Mack on 05-Aug-19 for
 * tamaramack.github.io
 */

module.exports = {
  dt,
  distinct,
  plusFactor,
};

function dt(now) {
  now = new Date(now);
  const t = n => (`0${ now[ `get${ n }` ]() }`).slice(-2);
  return `${ t('Minutes') }:${ t('Seconds') }.${ now.getMilliseconds() }`;
}

function distinct(arr) {
  const o = {};
  for (let value of arr) o[ value ] = 1;
  return Object.keys(o);
}

function plusFactor(n) {
  let sum = +n;
  while (n--) sum += n;
  return sum;
}
