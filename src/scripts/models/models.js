/**
 * Class for substring Nodes
 */
export class StringNodeModel {
  /**
   *
   * @param {string} string string owner and id of this Node
   * @param {number} location Start index of string location
   * @param {StoreModel} store Global Node Store
   */
  constructor(string, store) {
    const sub = string;

    Object.defineProperties(this, {
      _store: {
        get: () => store
      },
      id: {
        get: () => sub,
        enumerable: true
      },
      name: {
        get: () => removeDuplicates(sub),
        enumerable: true
      },
      length: {
        get: () => sub.length,
        enumerable: true
      },
      count: {
        get() {
          // TODO: Count children nodes
          return 0;
        },
        enumerable: true
      },
      children: {
        value: new Set(),
        enumerable: true
      },
      parents: {
        value: new Set(),
        enumerable: true
      }
    });
  }

  /**
   *
   * @param {string} s Child substring of this Node string
   */
  addChild(s, addParents) {
    if (!s.length) return;
    if (!this._store.has(s)) this._store._add(s);


    this.children.add(s);
    if (addParents) this.addToParents(s);
  }

  /**
   *
   * @param {string} s Parent (sub)string of this Node string
   */
  addParent(s) {
    if (!s.length) return;
    if (!this._store.has(s)) this._store._add(s);


    this.parents.add(s);
    if (!this._store.get(s).children.has(this.id)) this._store.get(s).addChild(this.id);
  }

  addToParents(s) {
    const parents = [...this.parents];
    for (let i = 0; i < parents.length; i++) this._store.get(parents[i]).addChild(s, true);
  }

  getFirstChildren(onLoop, container = [], n = 1) {
    const store = this._store,
      sub = this.id;
    if (sub.length < n + 1) return container;

    const right = sub.slice(0, -n);
    const left = sub.slice(n);
    const mid = sub.slice(n, -n);

    if (store.has(right)
      && store.has(left)
      && store.has(mid)) {
      return container;
    }


    this.addChild(right);
    this.addChild(left);
    this.addChild(mid);

    n++;
    container.push(right, left, mid);

    if (n <= 10) {
      const retContain = this.getFirstChildren(onLoop, container, n);
      container.push(...retContain);

      if (onLoop) {
        if (store.has(right)) container.push(...store.get(right).getFirstChildren(onLoop));
        if (store.has(left)) container.push(...store.get(left).getFirstChildren(onLoop));
        if (store.has(mid)) container.push(...store.get(mid).getFirstChildren(onLoop));
      }
    }
    return container;
  }
}

export class StoreModel {
  constructor() {
    Object.defineProperties(this, {
      _: {
        value: new Set(),
        enumerable: true
      },
      __: {
        value: {}
      }
    });
  }

  get count() {
    return this._.size;
  }

  get keys() {
    return [...this._];
  }

  has(s) {
    return this._.has(s);
  }

  get(s) {
    return this.__[s];
  }

  removeDups(s) {
    return removeDuplicates(s);
  }

  /**
   *
   * @param {string} s
   */
  _add(s) {
    if (!(s && s.length)) return;
    this._.add(s);
    if (!this.__.hasOwnProperty(s)) {
      Object.defineProperty(this.__, s, {
        value: new StringNodeModel(s, this),
        enumerable: true
      });
    }
  }

  _addAll(...s) {
    if (!(s && s.length)) return;
    let i = s.length;
    while (i--) this._add(s[i]);
  }
}

export class SetModel {
  constructor() {
    Object.defineProperties(this, {
      '_': {
        value: new Set(),
        enumerable: true
      },
      '*': {
        value: {}
      },
      '__': {
        value: {}
      }
    });
  }

  get count() {
    return this._.size;
  }

  get keys() {
    return [...this._];
  }

  get startSet() {
    return this['*'];
  }

  has(s) {
    return this._.has(s);
  }

  get(s) {
    return this.__[s];
  }

  removeDups(s) {
    return removeDuplicates(s);
  }

  /**
   *
   * @param {string} s
   */
  add(s, startIndex, position) {
    if (!(s && s.length)) return;
    this._.add(s);

    if (!this.__.hasOwnProperty(s)) {
      Object.defineProperty(this.__, s, {
        value: new StringSet(s, this),
        enumerable: true
      });
    }


    if (position) this.get(s).addPosition(position);

    if (startIndex) {
      this.get(s).addLocation(startIndex);
      this.addLength(s.length, startIndex);
    }
  }

  addAll(...unsubs) {
    if (!unsubs) return;
    let i = unsubs.length;
    while (i--) this.add(unsubs[i]);
  }

  addLength(len, startIndex) {
    if (!this['*'].hasOwnProperty(len)) this['*'][len] = new Set();

    this['*'][len].add(startIndex);
  }
}

export class StringSet {
  /**
   *
   * @param {string} string string owner and id of this Node
   * @param {number} location Start index of string location
   * @param {StoreModel} store Global Node Store
   */
  constructor(s, store, locations = [], positions = []) {
    const sub = s;
    let count = 0;

    Object.defineProperties(this, {
      _store: {
        get: () => store
      },
      id: {
        get: () => sub,
        enumerable: true
      },
      name: {
        get: () => removeDuplicates(sub),
        enumerable: true
      },
      length: {
        get: () => sub.length,
        enumerable: true
      },
      locations: {
        value: new Set(locations),
        enumberable: true
      },
      children: {
        value: new Set()
      },
      positions: {
        value: new Set(positions),
        enumberable: true
      },
      count: {
        get() {
          if (!count) count = this.getCount() + 1;

          return count;
        },
        enumerable: true
      }
    });
  }

  addLocation(...indices) {
    if (!indices) return;
    let i = indices.length;
    while (i--) this.locations.add(indices[i]);
  }

  addPosition(...indices) {
    if (!indices) return;
    let i = indices.length;
    while (i--) this.positions.add(indices[i]);
  }

  getCount() {
    const unique = this.name;
    if (this.length === 1) return 0;
    if (unique.length === 1) return this.length - 1;
    if (this.length === unique.length) {
      if (this.length === 2) return 2;
      if (this.length === 3) return 5;
      if (this.length === 4) return 9;
    }

    for (let i = 0; i < this.length; i++) {
      const sub = this.id.substring(i);
      this.children.add(sub);
    }
    return this.children.size;

    const arr = this.stepString(new Set(), this.length);
    const values = arr;

    return values.length;
  }

  stepString(carry, i) {
    if (this.length <= 1) return carry;
    i--;
    for (let l = 0; l <= this.length - i; l++) exists = setSubstring.call(this, l, l + i, carry);


    if (i) return this.stepString(carry, i);
    return carry;
  }
}

function removeDuplicates(s) {
  return alphaSort([...new Set(s)]);
}

function alphaSort(str) {
  return ([...str].sort((a, b) => a.charCodeAt() - b.charCodeAt())).join('');
}

function setSubstring(start, end, carry) {
  const sub = this.id.substring(start, end);
  allocate.call(this, sub, carry);

  const reverse = [...sub].reverse();
  if (this.id.includes(reverse)) allocate.call(this, reverse, carry);
}

function allocate(sub, carry) {
  if (!sub || carry.has(sub)) return;

  // this.children.add(sub);
  /* if (this._store.has(sub)) {
    const count = this._store.get(sub).count;
    carry[sub] = count;
    if (!isNaN(count)) return exists;
    exists.add(sub);
  } */
  carry.add(sub);
}

function pushLastIndex(index, compare, s) {
  let i = index;
  while (i < s.length - 1) {
    let iteration = i + 1;
    if (!s[iteration] || !compare.includes(s[iteration])) return i;
    i = iteration;
  }

  return index;
}
