/**
 * queue js file created by Tamara G. Mack on 10-Jul-19 for tamaramack.github.io
 */

// const queue = new Queue();
// let length = queue.length; (number)
// queue.insert(25);
// queue.insert(50);
// let


// [1, 2, 3, 4, 5]
// insert => 6 :: [1, 2, 3, 4, 5, 6]
// dequeue => 1 :: [2, 3, 4, 5, 6]

// C: [None, 2, 3, 4, 5]

// cookie
// session,

// a.com b.com c.com

function node(value) {
  this.node = value;
  this.previous = null;
  this.next = null;
}

class Queue {
  constructor() {
    this.items = []; // new Set(); // new Array<int>(10)  /// Object
    this.location = {};
    // this.parent;
  }

  get length() {
    return this.items.length;
  }

  enqueue(value) {
    const limit = 10;
    if (this.length > limit) {
      this.items.push(value); // index: items.length-1
      // this.items[this.items.length] = value;

      if (this.location.hasOwnProperty(value)) {
        this.location[value]++;
      } else {
        this.location[value] = 1; // 5
      }
    } else {
      return new Error('Queue is at Capacity.');
    }
  }

  dequeue() {
    const value = this.items[0];

    this.location[value]--;
    if (!this.location[value]) delete this.location[value];

    return this.items.shift(); // index: 0
    // return this.items.slice(1)
  }

  getValue(index) {
    if (Number.isNaN(Number(index))) return undefined;
    let item = this.items[index];
    return item;
  }

  find(value) {
    // return this.items.includes(value);
    if (this.location.hasOwnProperty(value)) return true;

    let i = this.items.length;
    while (i--) {
      if (this.items[i] === value) return true;
    }
    return false;
  }
}
