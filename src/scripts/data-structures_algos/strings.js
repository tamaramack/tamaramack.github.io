export {
  zArray,
  powerSet
};

function zArray(s) {
  const array = new Array(s.length).fill(null).map(() => 0);
  array[0] = s.length;

  let left = 0;
  let right = 0;
  let shift = 0;

  for (let i = 1; i < s.length; i++) {
    if (i > right) {
      let n = 0;
      while ((n + i) < s.length && s[n] === s[n + i]) n++;

      array[i] = n;
      if (n > 0) {
        left = i;
        right = i + n - 1;
      }
    } else {
      shift = i - left;
      const right_len = right - i + 1;

      if (array[shift] < right_len) {
        array[i] = array[shift];
      } else {
        let j = right + 1;
        while (j < s.length && s[j] === s[j - i]) j++;

        array[i] = j - i;
        left = i;
        right = j - 1;
      }
    }
  }

  return array;
}

function powerSet(set, subsets = [''], current = '', startAt = 0) {
  for (let position = startAt; position < set.length; position++) {
    current += set[position];
    subsets.push([current]);
    powerSet(set, subsets, current, position++);
    current = current.slice(0, -1);
  }
  return subsets;
}
