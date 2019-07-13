/**
 * substring-nodes js file created by Tamara G. Mack on 12-Jul-19 for
 * tamaramack.github.io
 */
export class Substring {
  constructor(s, store, parentId) {
    if (!(s && s.length)) return new Error('Cannot map Empty String');

    const _kids = {};
    let _parent = parentId;
    Object.defineProperties(this, {
      id: {
        value: genId()
      },
      s: {
        get() {
          return s;
        },
        enumerable: true
      },
      distinct: {
        value: distinctString(s).sort().join('')
      },
      parent: {
        get() {
          return _parent;
        },
        set(id) {
          if (store[id]) {
            _parent = id;
          }
        }
      },
      kids: {
        get() {
          return Object.keys(_kids);
        },
        set(id) {
          if (!_kids[id]) {
            Object.defineProperty(_kids, id, {
              get() {
                return store[id];
              }
            });
          }
          if (this.parent) store[this.parent].kids = id;
        }
      }
    });
    store[this.id] = this;
    store.lookup.set(s, this.id);
    store.countMap.get(s.length).push(this.id);
    if (this.parent) store[this.parent].kids = this.id;
  }

  toString() {
    return this.s.toString();
  }
}

export class NodeStore extends Object {
  constructor(str) {
    const _map = new Array(str.length).fill(null).map((v, i) => [i + 1, []]);
    super();
    let id;
    Object.defineProperties(this, {
      id: {
        get() { return id; },
        enumerable: true
      },
      lookup: {
        value: new Map()
      },
      countMap: {
        value: new Map(_map)
      }
    });
    id = this.node(str);
  }

  get(key) {
    for (let [sub, id] of this.lookup) if (key === id) return sub;
    return undefined;
  }

  node(value, parentId) {
    parentId = parentId || this.id;
    if (!(value && value.length)) return false;
    let id;
    if (!this.lookup.has(value)) {
      const node = new Substring(value, this, parentId);
      id = node.id;
    } else {
      id = this.lookup.get(value);
    }
    if (parentId) this[parentId].kids = id;
    return id;
  }

  findChildren(value) {
    const arr = [];
    for (let [sub, id] of this.lookup) if (value.includes(sub)) arr[arr.length] = id;
    return arr;
  }

  treeBranch(str) {
    if (!(str && str.length)) return;
    this.firstBranch(str);
  }

  firstBranch(str) {
    const parentId = this.lookup.get(str);
    const first = str.slice(0, -1);
    if (!!first && !this.lookup.has(first)) {
      let id = this.node(first, parentId);
      this.firstBranch(first);
    } else if (this.lookup.has(first)) {
      this[parentId].kids = this.lookup.get(first);
    }
    const second = str.slice(1);
    if (!!second && !this.lookup.has(second)) {
      let id = this.node(second, parentId);
      this.secondBranch(second);
    } else if (this.lookup.has(second)) {
      this[parentId].kids = this.lookup.get(second);
    }
  }

  secondBranch(str) {
    const parentId = this.lookup.get(str);
    const second = str.slice(1);
    if (!!second && !this.lookup.has(second)) {
      let id = this.node(second, parentId);
      this.secondBranch(second);
    } else if (this.lookup.has(second)) {
      this[parentId].kids = this.lookup.get(second);
    }
  }
}

function genId() {
  const rand = (n, rndUp) => Math[rndUp ? 'ceil' : 'floor'](Math.random() * n);
  const code = () => (`0${rand(1024, 1).toString(32)}`.slice(-2))[rand(2) ? 'toLowerCase' : 'toUpperCase']();
  return `${code()}${code()}${code()}${code()}`;
}

function distinctString(s) {
  const o = {};
  let i = s.length;
  while (i--) o[s[i]] = 1;
  return Object.keys(o);
}
