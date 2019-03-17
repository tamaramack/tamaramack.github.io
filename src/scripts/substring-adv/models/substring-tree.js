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
      const node = SubstringTree.First(substr, this.nodes);
      this.nodes.set(substr, node);
    }
    return this.get(substr);
  }

  execute(query) {
    if (!query) {
      this.add(this.substring);
      return this.get(this.substring);
    }
    const substr = this.substring.substring(query[0], query[1] + 1);
    this.add(substr);
    return this.get(substr);
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
    if (!this.sets[substr] && this.nodes.has(substr)) {
      this.set(substr);
    } else if (!this.sets[substr]) return false;

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

class Node {
  constructor(substring, collection) {
    Object.defineProperties(this, {
      substring: {
        get() {
          return substring;
        },
        enumerable: true
      },
      q: {
        value: []
      },
      nodes: {
        get() {
          return collection;
        },
        enumerable: true
      }
    });
  }

  get length() {
    return this.substring.length;
  }

  slice(start, end) {
    return this.substring.slice(start, end);
  }

  addNode(substr, Model) {
    if (!this.nodes.has(substr)) {
      const node = new Model(substr, this.nodes);
      if (!(node instanceof Node)) return null;

      this.nodes.set(substr, node);
    }
    Object.defineProperty(this, Model.name, {
      get() {
        return this.nodes.get(substr);
      },
      enumerable: true
    });
    return this[Model.name];
  }
}

class FirstNode extends Node {
  constructor(...data) {
    super(...data);
    if (this.length > 1) {
      this.addNode(this.slice(0, -1), FirstNode);
      this.addNode(this.slice(1), SecondNode);
    }
  }
}

class SecondNode extends Node {
  constructor(...data) {
    super(...data);
    if (this.length > 1) this.addNode(this.slice(1), SecondNode);
  }
}

class SingleNode extends Node {
  constructor(substr, collection, childNode) {
    super(substr, collection);
    if (childNode) {
      Object.defineProperty(this, 'SecondNode', {
        get() {
          return this.nodes.get(childNode.substring);
        },
        enumerable: true
      });
    }
  }
}
