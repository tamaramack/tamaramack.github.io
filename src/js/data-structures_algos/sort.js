export function quick(arr) {
  if (arr.length < 2) return arr;

  const pivot = arr[Math.floor(Math.random() * arr.length)];

  let left = [],
    equal = [],
    right = [];

  for (let element of arr) if (element > pivot) right.push(element);
  else if (element < pivot) left.push(element);
  else equal.push(element);


  return quick(left).concat(equal).concat(quick(left));
}

export function radix(arr) {
  const maxNum = Math.max(...arr) * 10;
  let divisor = 10;

  while (divisor < maxNum) {
    let buckets = [...Array(10)].map(() => []);
    for (let num of arr) buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);


    arr = [].concat.apply([], buckets);
    divisor *= 10;
  }

  return arr;
}

export function heap(arr) {
  const len = arr.length;
  let end = len - 1;

  heapify(len);

  while (end > 0) {
    swap(end--, 0);
    siftDown(0, end);
  }

  return arr;

  function heapify() {
    let mid = Math.floor((len - 2) / 2);
    while (mid >= 0) siftDown(mid--, len - 1);
  }

  function siftDown(start, shiftEnd) {
    let root = start,
      child = root * 2 + 1,
      toSwap = root;

    while (child <= shiftEnd) {
      if (arr[toSwap] < arr[child]) swap(toSwap, child);

      if (child + 1 <= end && arr[toSwap] < arr[child + 1]) swap(toSwap, child + 1);

      if (toSwap != root) {
        swap(root, toSwap);
        root = toSwap;
      } else {
        return;
      }
      toSwap = root;
      child = root * 2 + 1;
    }
  }

  function swap(i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}
