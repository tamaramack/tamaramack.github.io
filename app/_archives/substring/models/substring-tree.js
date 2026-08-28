import {
  FirstNode,
  SecondNode,
  SingleNode
} from './nodes';

export default class SubstringTree {
  constructor(substring, parent = new Map()) {
    Object.defineProperties(this, {
      substring: {
        get() {
          return substring;
        },
        enumerable: true
      },
      nodes: {
        value: new NodeCollection(parent)
      },
      parentCollection: {
        get() {
          return parent;
        }
      }
    });
  }

  get size() {
    return this.nodes.size;
  }

  has(substr) {
    return this.nodes.has(substr);
  }

  get(substr) {
    return this.nodes.get(substr);
  }

  add(substr) {
    if (!this.nodes.has(substr)) {
      const node = SubstringTree.First(substr, this);
      this.nodes.set(substr, node);
    }
    return this.get(substr);
  }

  execute(query) {
    let str = this.substring;
    if (query) str = str.substring(query[0], query[1] + 1);
    if (str.length > 2) SubstringTree.mapPattern(str, this);

    this.add(str);
    return this.get(str);
  }

  static mapPattern(...data) {
    return patterns.apply(this, data);
  }

  static First(...data) {
    return new FirstNode(...data);
  }

  static Second(...data) {
    return new SecondNode(...data);
  }

  static Single(...data) {
    return new SingleNode(...data);
  }
}

class NodeCollection {
  constructor(parentCollection) {
    Object.defineProperties(this, {
      sets: {
        value: {},
        enumerable: true
      },
      nodes: {
        get() {
          return parentCollection;
        }
      }
    });
  }

  get size() {
    return Object.keys(this.sets).length;
  }

  has(substr) {
    if (!this.sets[substr] && this.nodes.has(substr)) this.set(substr);
    else if (!this.sets[substr]) return false;

    return this.sets[substr];
  }

  get(substr) {
    return this.nodes.get(substr);
  }

  set(substr, node) {
    if (!this.nodes.has(substr)) this.nodes.set(substr, node);

    Object.defineProperty(this.sets, substr, {
      value: true,
      enumerable: true
    });
  }
}

function patterns(s, tree) {
  const { length } = s;
  const all = [];
  const prI = i => i - 1;

  if (length < 2) return all;

  let cluster = '';
  let pattern = '';
  for (let i = 0; i < length; i++) {
    let current = s[i];

    // sanity check
    if (!current) break;

    // the beginning
    if (!pattern || !cluster) pattern = current;

    if (!search(current, cluster)) cluster += current;


    // get one letter pattern
    if (cluster.length === 1) {
      let nextIndex = i + 1;
      while (current === s[nextIndex] && nextIndex < length) {
        pattern += s[nextIndex];
        nextIndex++;
      }

      if (pattern.length > 5) {
        tree.add(pattern);
        const clusterValue = {
          i,
          cluster,
          length: pattern.length
        };
        all.push(clusterValue);
      }
      i = nextIndex - 1;

      if (pattern.length > 3) {
        cluster = '';
        pattern = '';
        continue;
      }

      if (!search(s[i + 1], cluster)) cluster += s[i + 1];
    }

    // get two letter pattern
    if (cluster.length === 2 || cluster.length === 3) {
      let nextIndex = i + 1;
      while (search(s[nextIndex], cluster) && nextIndex < length) {
        pattern += s[nextIndex];
        nextIndex++;
      }

      if (pattern.length > cluster.length * 3) {
        if (pattern.length > 3000) {
          let patBit = 6;
          while (patBit--) {
            const end = pattern >> patBit;
            let subPattern = pattern.slice(0, end);
            tree.add(subPattern);
          }
        } else {
          tree.add(pattern);
        }
        const clusterValue = {
          i,
          cluster,
          length: pattern.length
        };
        all.push(clusterValue);
      }
      const sub = s.substring(i, i + pattern.length);
      i = nextIndex - 1;

      if (pattern.length > cluster.length * 2) {
        cluster = '';
        pattern = '';
        continue;
      }

      pattern += sub;
      current = s[i];
    }

    if (!search(current, cluster)) {
      pattern = '';
      cluster = '';
    }
  }

  return all;
}

function search(inner, main) {
  if (!inner) return false;
  let i = main.length - inner.length;
  if (i <= 0) return false;
  const regex = new RegExp(inner, 'g');
  return regex.test(main);
}
