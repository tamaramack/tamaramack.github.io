/**
 * utilities js file created by Tamara G. Mack on 05-Aug-19 for
 * tamaramack.github.io
 */

function dt(now) {
  now = new Date(now);
  const t = n => (`0${now[`get${n}`]()}`).slice(-2);
  return `${t('Minutes')}:${t('Seconds')}.${now.getMilliseconds()}`;
}

function distinct(arr) {
  const set = new Set();
  for (let i = 0; i < arr.length; i += 1) set.add(arr[i]);
  return [...set];
}

function plusFactor(n) {
  let sum = n;
  while (n--) sum += n;
  return sum;
}
