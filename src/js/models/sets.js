export class SubSets {
  constructor(s) {
    Object.defineProperties(this, {
      id: {
        get() {
          return s;
        },
        enumerable: true
      },
      set: {
        value: new Set(...s)
      },
      positions: {
        value: new Map()
      }
    });
  }

  has(sub) {

  }
}

export class Collection {
  constructor(...items) {
    const array = [...items];
    Object.defineProperties(this, {
      array: {
        get() {
          return array;
        }
      },
      set: {
        value: new Set(array)
      }
    });
  }

  get length() {
    return this.array.length;
  }

  has(value) {
    return this.set.has(value);
  }

  add(value) {
    if (this.has(value)) return;
    this.add(value);
    this.array.push(value);
  }

  forEach(cb) {
    for (let i = 0; i < this.length; i++) cb(this[i], i, this);
  }

  reduce(cb, number) {
    const { array } = this;
    let accummulator = number | 0;
    for (let i = 0; i < this.length; i++) accummulator = cb(accummulator, array[i], i, array);
  }
}
