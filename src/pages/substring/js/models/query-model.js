import {
  isDistinct,
  isNumber,
  distinctString,
  getSetOf,
  removeDuplicates,
  clone,
  compare,
  sum,
  substringCount
} from '@/js/utilities/utilities';
import {
  StringObject
} from '@/js/models/objects/string-object';
import {
  Collection,
  MapCollection,
  SetCollection
} from '@/js/models/collection';

export class QueryCollection {
  constructor(queries, s) {
    const arr = new Array(queries.length).fill(null);
    const mapped = map(queries, s);

    Object.defineProperties(this, {
      main: {
        value: new StringObject(s),
        enumerable: true
      },
      o: {
        value: queries,
        enumerable: true
      },
      queries: {
        value: new Map(mapped),
        enumerable: true
      },
      results: {
        get() {
          return arr;
        },
        enumerable: true
      }
    });
  }
}

export class QueryObject {
  constructor(start, substring) {
    Object.defineProperties(this, {
      i: { value: start },
      l: { value: substring.length },
      s: { value: new StringObject(substring) },
      c: {
        value: 0,
        writable: true
      }
    });
  }
}

function map(queries, str) {
  let mapped = [];
  for (let i = 0; i < queries.length; i += 1) {
    const q = queries[i],
      start = q[0],
      end = q[1] + 1,
      sub = str.slice(start, end);
    mapped[mapped.length] = [i, new QueryObject(start, sub)];
  }

  return mapped.sort((a, b) => a[1].l - b[1].l);
}

function multiSort(a, b) {
  const indexA = a[1].i,
    indexB = b[1].i,
    lenA = a[1].l,
    lenB = b[1].l;
}
