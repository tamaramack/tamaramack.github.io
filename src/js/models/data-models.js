export class List {
  constructor() {
    Object.defineProperties(this, {
      memory: {
        value: []
      },
      len: {
        value: 0,
        writable: true
      },
      length: {
        get() {
          return this.len;
        },
        enumerable: true
      }
    });
  }

  get(address) {
    return this.memory[address];
  }

  push(value) {
    this.memory[this.len] = value;
    this.len++;
  }

  pop() {
    if (this.len === 0) return;

    let lastAddress = this.len - 1;
    const value = this.memory[lastAddress];
    delete this.memory[lastAddress];
    this.len--;

    return value;
  }

  unshift(value) {
    let previous = value;

    for (let address = 0; address < this.len; address++) {
      let current = this.memory[address];
      this.memory[address] = previous;
      previous = current;
    }

    this.memory[this.len] = previous;
    this.len++;
  }

  shift() {
    if (this.length === 0) return;

    const value = this.memory[0];
    for (let address = 0; address < this.len; address++) this.memory[address] = this.memory[address + 1];


    delete this.memory[this.len - 1];
    this.len--;

    return value;
  }
}

export class HashTable {
  constructor() {
    Object.defineProperties(this, {
      memory: {
        value: []
      }
    });
  }

  hashKey(key) {
    let hash = 0;
    for (let i = 0; i < key.length; index++) {
      let code = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + code | 0;
    }

    return hash;
  }

  get(key) {
    let address = this.hashKey(key);
    return this.memory[address];
  }

  set(key, value) {
    let address = this.hashKey(key);
    this.memory[address] = value;
  }

  remove(key) {
    let address = this.hashKey(key);
    if (this.memory[address]) delete this.memory[address];
  }
}

export class Stack {
  constructor() {
    Object.defineProperties(this, {
      list: {
        value: []
      },
      length: {
        value: 0,
        enumerable: true
      }
    });
  }

  push(value) {
    this.length++;
    this.list.push(value);
  }

  pop() {
    if (this.length === 0) return;
    this.length--;
    return this.list.pop();
  }

  peek() {
    return this.list[this.length - 1];
  }
}

export class Queue {
  constructor() {
    Object.defineProperties(this, {
      list: {
        value: []
      },
      length: {
        value: 0,
        enumerable: true
      }
    });
  }

  enqueue(value) {
    this.length++;
    this.list.push(value);
  }

  dequeue() {
    if (this.length === 0) return;
    this.length--;
    return this.list.shift();
  }

  peek() {
    return this.list[0];
  }
}

export class Graph {
  constructor() {
    Object.defineProperties(this, {
      nodes: {
        value: []
      }
    });
  }

  addNode(value) {
    return this.nodes.push({
      value,
      lines: []
    });
  }

  find(value) {
    return this.nodes.find(node => node.value === value);
  }

  addLine(startValue, endValue) {
    const startNode = this.find(startValue);
    const endNode = this.find(endValue);

    if (!startNode || !endNode) {
      console.error('Both nodes need to exist');
      return;
    }

    startNode.lines.push(endNode);
  }
}

export class LinkedList {
  constructor() {
    Object.defineProperties(this, {
      head: {
        value: null,
        writable: true
      },
      length: {
        value: 0,
        writable: true
      }
    });
  }

  get(position) {
    if (position >= this.length) {
      console.error('Position outside of list range');
      return;
    }

    let current = this.head;
    for (let i = 0; i < position; i++) current = current.next;


    return current;
  }

  add(value, position) {
    const node = {
      value,
      next: null
    };

    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const prev = this.get(position - 1);
      const current = prev.next;

      node.next = current;
      prev.next = node;
    }

    this.length++;
  }

  remove(position) {
    if (!this.head) {
      console.error('Removing from empty list');
      return;
    }

    if (position === 0) {
      this.head = this.head.next;
    } else {
      const prev = this.get(position - 1);
      prev.next = prev.next.next;
    }

    this.length--;
  }
}
