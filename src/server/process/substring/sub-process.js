module.exports = (s, count) => {
  let keys = [];
  let len = s.length - count;
  let i = -1;
  while (len > i++) keys[keys.length] = s.slice(i, i + count);
  keys = keys.sort();

  i = keys.length;
  while (i--) { if (i && keys[i] === keys[i - 1]) delete keys[i]; }
  keys = keys.filter(v => v);

  return keys;
};
