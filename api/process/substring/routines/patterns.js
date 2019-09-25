/**
 * patterns js file created by Tamara G. Mack on 19-Aug-19 for
 * tamaramack.github.io
 */
const {dt, distinct, plusFactor} = require('./utilities');
const {findSubstringsByLength} = require('./find-algos');

module.exports = (function() {
  const p = {};
  let s = '';

  return class Patterns {
    constructor(str) {
      s = str;
      Object.defineProperties(this, {
        patterns: {
          get: () => p,
          enumerable: true,
        },
      });
    }

    find() {
      let chunk = s.substring(0, 2);
      let chars = getChars(chunk);
      let startIndex = 0;
      p[ chars ] = [];

      for (let i = 2; i < s.length; i++) {
        if (!chunk.slice(-3).includes(s[ i ])) {
          if (chunk.length > 4) {
            p[ chars ].push(s.slice(startIndex, startIndex + chunk.length));
            i = startIndex + chunk.length;
          }

          chunk = s[ i ] + s[ i + 1 ];
          chars = getChars(chunk);
          if (!p[ chars ]) {
            p[ chars ] = [];
          }
          startIndex = +i;
          i += 1;
          continue;
        }
        chunk += s[ i ];
      }
    }

    filter() {
      let entries = Object.entries(p);
      for (let entry of entries) {
        let key = entry[ 0 ],
          matrix = entry[ 1 ];
        if (!matrix.length) {
          delete p[ key ];
          continue;
        }
        matrix = distinct(matrix);
        let o = matrix.sort((a, b) => b.length - a.length);

        const primary = o[ 0 ];
        if (primary.length < 5) {
          delete p[ key ];
          continue;
        }

        clean(key, o);
        p[ key ] = o;
      }
    }

    mapArray() {
      let array = [];
      for (let key in p) {
        const tmp = p[ key ];
        for (let i = 0; i < tmp.length; i++) {
          array.push(tmp[ i ]);
        }
      }
      array.sort((a, b) => a.start - b.start);
      loopclean(array);

      const last = array[ array.length - 1 ],
        remStart = last.start + last.length,
        remSub = s.slice(remStart);
      array.push({
        key: '_remainder',
        start: remStart,
        length: remSub.length,
        s: remSub,
      });

      Object.defineProperty(this, 'array', {
        value: array,
        enumerable: true,
      });

      return this.array;
    }

    setQueriesInArray() {
      if (!this.array) {
        this.mapArray();
      }

      loopcleanmap(this.array);
    }
  };

  function clean(key, o) {
    let j = 0;
    for (let i = 0; i < o.length; i++) {
      const start = s.indexOf(o[ i ], j);
      if (start < 0 || !s[ i ].length) {
        o.splice(i, 1);
        continue;
      }
      o[ i ] = {
        key,
        start,
        length: o[ i ].length,
        s: o[ i ],
      };
      j += o[ i ].length - 1;
    }
  }

  function loopclean(array) {
    let i = array.length;
    while (i--) {
      const prev = array[ i - 1 ];
      const curr = array[ i ];
      if (prev && prev.start + prev.length !== curr.start) {
        array.splice(i, 1);
      }
    }
  }

  function loopcleanmap(array) {
    for (let obj of array) {
      if (obj.key.length > 1) {
        // obj.total = calc2CharPat(obj.s);
        obj.queries = Array(obj.length).fill(null).map(() => ({}));
      }
    }
  }

  function calc2CharPat(sub, _median) {
    const halfway = Math.floor(sub.length / 2),
      median = _median || innerLoop(halfway, sub).length,
      tail = sub.length - (median - 1),
      diff = tail - median;
    let sum = plusFactor(median) * 2;
    return sum + diff * median - 1;
  }

  function getChars(sub) {
    return distinct(sub).sort().join('');
  }
}());
