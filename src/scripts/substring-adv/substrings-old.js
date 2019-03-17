/** Consider a string of n characters, s, of where each character is indexed from 0 to n-1.

 You are given q queries in the form of two integer indices: left and right. For each query, count and print the number of different substrings of s in the inclusive range between left and right.
 */

export default countstrings;

let substringArray = [];
const queryObjects = {};
let deepQueryObjects = {};

function countstrings(s, queries) {
  const stringTotal = s.length;
  const queriesTotal = queries.length;

  const resultArray = [];
  const store = {
    '*': {}
  };

  let stringMatrix = [],
    queriesMatrix = [];

  // get unique and find patterns
  getUniqueOrCluster(s, store['*']);

  // if > 3000, > 100 or else
  // Map array or string
  // String break
  if (stringTotal > 3000) {
    splitArray(s, 200, stringMatrix);
  } else if (stringTotal > 100) {
    splitArray(s, 10, stringMatrix);
  } else {

  }

  // Queries break
  if (queriesTotal > 3000) {
    splitArray(queries, 200, queriesMatrix);
  } else if (queriesTotal > 100) {
    splitArray(queries, 10, queriesMatrix);
  } else {

  }

  // chunk large queries in to asynchonous calls
  console.info('GET SUBSTRING');
  const query = getSubstring(s, queries[494], 494, stringMatrix, store);
  console.debug('getSubstring Object', query);

  console.debug('Store', store);
  console.info('String Matrix', stringTotal, stringMatrix.length);
  console.info('Queries Matrix', queriesTotal, queriesMatrix.length);
  return resultArray;
}

function setPromise(callback, owner, time = 10) {
  return new Promise(((resolve, reject) => {
    setTimeout(() => {
      let results = callback.call(owner);
      resolve(results || 'works');
    }, time);
  }));
}

function getSubstring(s, query, queryIndex, matrix, store) {
  let start = query[0],
    end = query[1];

  const substring = s.substring(start, end);

  if (store[substring]) return store[substring];

  const subset = new SubSet(substring, store);
  let sets = [];

  if (subset.cluster.length === 1) return substring.length;
  console.debug('new subset', subset);

  if (matrix) {
    let rowMaxLength = matrix[0].length;
    const merge = [];

    let rowStart = Math.floor(start / rowMaxLength);
    let columnStart = (start % (matrix[rowStart].length));
    start = [rowStart, columnStart];

    let rowEnd = Math.floor(end / rowMaxLength);
    let columnEnd = (end % (matrix[rowEnd].length));
    end = [rowEnd, columnEnd];

    /* console.debug('getSubstring matrix map', 'start', matrix[start[0]][start[1]],
      'end', matrix[end[0]][end[1]], query); */

    for (let rowIndex = rowStart; rowIndex <= rowEnd; rowIndex++) {
      const start = rowIndex === rowStart ? columnStart : 0;
      const end = rowIndex === rowEnd ? columnEnd : matrix[rowIndex].length;

      const matrixString = matrix[rowIndex].substring(start, end);
      sets.push(matrixString);

      merge.push({
        matrixString,
        start,
        end
      });

      const substrSet = countSubstring(matrixString, matrixString.length);
      sets.push(...substrSet);
      console.debug('sets matrixString', sets.length);
    }

    let largeMatrixString = '';
    while (merge.length) {
      let count = largeMatrixString.length;
      const submatrix = merge.shift();
      if (!count) {
        let secondary = merge.shift();
        count = submatrix.matrixString.length;
        submatrix.matrixString += secondary.matrixString;
        submatrix.end = secondary.end;
      }

      largeMatrixString += submatrix.matrixString;
      sets.push(largeMatrixString);

      const substrSet = countSubstring(largeMatrixString, largeMatrixString.length, count);
      sets.push(...substrSet);
      console.debug('sets largeMatrixString', sets.length);
    }
  } else {
    const substrSet = countSubstring(substring, substring.length);
    sets.push(...substrSet);
    console.debug('sets short', sets.length);
  }

  sets = new Set(sets);
  console.debug('sets', sets.size);
  subset.addAll([...sets]);

  console.debug('getSubstring subset', substring.length);
  return {
    substring,
    queryIndex,
    start,
    end
  };
}

function countSubstring(s, totalCount = 10, minCount = 1) {
  let i = totalCount;
  let subsets = [];

  while (minCount < i--) {
    // identify subCount
    const sizeArray = [];
    const end = s.length - i;
    const count = i + 1;
    // create property of parentsubstring
    for (let j = 0; j < end; j++) {
      const substring = s.slice(j, j + count);
      sizeArray.push(substring);
    }

    subsets.push(...sizeArray);
  }

  return subsets;
}

class SubSet {
  constructor(s, store) {
    const cluster = removeDuplicates(s);

    Object.defineProperties(this, {
      '_store_': {
        get() {
          return store;
        }
      },
      '_': {
        value: {},
        writable: false,
        enumerable: true
      },
      '*': {
        value: {},
        writable: false,
        enumerable: true
      },
      'cluster': {
        get() {
          return cluster;
        },
        enumerable: true
      }
    });

    if (s && s.length) this.add(s);
  }

  get countArray() {
    return Object.keys(this._);
  }

  add(substring) {
    const count = substring.length;
    const store = this._store_;
    let set = this._;
    if (!set[count]) {
      this._[count] = new Set();
      Object.defineProperty(this['*'], count, {
        get() {
          const prop = set[count];
          return prop.size;
        },
        enumerable: true
      });
    }

    if (!set[count].has(substring)) {
      set[count].add(substring);
      Object.defineProperty(this, substring, {
        get() {
          return 1; // this.querify(substring);
        },
        enumerable: true
      });
    } else {
      // return this[substring];
    }

    if (store[substring]) {
      // set[count][substring] = store[substring];
    } else {
      // return this[substring];
    }

    return false;
  }

  addAll(array) {
    let i = array.length;
    while (i--) this.add(array[i]);
    // this[array[i]] = this.querify(array[i]);
  }

  querify(substring) {
    const keys = this.countArray;
    let i = keys.size;
    let halfpoint = Math.ceil(keys.size - (i / 10));
    const arr = [];
    while (halfpoint < i--) {
      const key = +keys[i];
      if (key <= substring.length) continue;
      arr.push(...this.addSubstringToKey(key, substring));
    }
    /* while (halfpoint--) {
      const key = +keys[halfpoint];
      if (key <= substring.length) continue;
      this.addSubstringToKey(key, substring);
    } */
    return arr;
  }

  addSubstringToKey(key, substring) {
    const keys = [...this._[key]];
    return keys.filter(x => x.includes(substring));
  }
}

function findPattern(s) {
  return false;
}

function getUniqueOrCluster(s, store) {
  const totalLetterCluster = 4;
  const maxRepeatedLetter = 5;
  const addToStore = (key) => {
    if (!store.hasOwnProperty(key)) store[key] = [];
  };

  const addLetter = (index) => {
    const letter = s[index];
    addToStore(letter);

    let lastIndex = pushLastIndex(index, letter, s);
    if (lastIndex > index + maxRepeatedLetter) {
      store[letter].push({
        start: index,
        end: lastIndex
      });
    }


    return lastIndex;
  };

  const addClusters = (startIndex, cluster, position = 0) => {
    if (position >= totalLetterCluster) return startIndex;

    let lastIndex = startIndex + cluster.length;
    let nextIndex = startIndex + cluster.length + 1;
    const nextLetter = s[nextIndex];

    if (!nextLetter) return startIndex;

    nextIndex = addLetter(nextIndex);
    if (nextIndex > lastIndex + 1) return nextIndex;

    const updatedCluster = removeDuplicates(`${cluster}${nextLetter}`);
    if (updatedCluster === cluster) return addClusters(nextIndex, updatedCluster, position);


    lastIndex = pushLastIndex(nextIndex, updatedCluster, s);

    if (lastIndex > nextIndex) {
      const min = nextIndex + (updatedCluster.length * 3);
      if (lastIndex > min) {
        addToStore(updatedCluster);
        store[updatedCluster].push({
          start: startIndex,
          end: lastIndex
        });
      }
      return lastIndex;
    }

    return addClusters(startIndex, updatedCluster, position++);
  };

  console.warn('getUniqueOrCluster', 'Start Loop');

  for (let i = 0; i < s.length; i++) {
    let lastIndex = addLetter(i);
    // console.debug('letter loop', lastIndex, s[lastIndex]);

    if (lastIndex > i + maxRepeatedLetter) {
      i = lastIndex;
      continue;
    }

    i = addClusters(lastIndex, s[lastIndex]);
    // console.debug('cluster loop', i, s[i]);
  }

  console.warn('getUniqueOrCluster', 'End Loop');
}

function splitArray(arr, rowCount, matrix) {
  let splitpoint = Math.ceil(arr.length / rowCount);
  let startIndex = 0;

  while (startIndex < arr.length) {
    let end = startIndex + splitpoint;
    if (end > arr.length) end = arr.length;
    const row = arr.slice(startIndex, end);
    matrix.push(row);
    startIndex = end;
  }
}

function pushLastIndex(index, compare, s, negIteration = false) {
  // console.log('pushLastIndex', index, i);
  let i = index;
  while (i >= 0 || i < s.length - 1) {
    let iteration = negIteration ? i - 1 : i + 1;
    // console.info(index, i, compare, s[iteration]);
    if (!s[iteration] || !compare.includes(s[iteration])) return i;
    i = iteration;
  }

  console.debug(i, compare);
  return i;
}

function removeDuplicates(s) {
  return alphaSort(Array.from(new Set(s)));
}

function alphaSort(str) {
  if (Array.isArray(str)) return (str.sort((a, b) => a.charCodeAt() - b.charCodeAt())).join('');

  return (str.split('').sort((a, b) => a.charCodeAt() - b.charCodeAt())).join('');
}

function possibilities(substring) {
  if (!substring.length) return [];
  if (substring.length === 1) return [substring];
  const total = substring.length;
  let start = 0;
  const obj = {};

  while (start < total) {
    pullSeq(substring.slice(start), obj);
    start++;
  }
  // console.log(obj);
  return Object.keys(obj);
}
