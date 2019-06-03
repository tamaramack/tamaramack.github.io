/**
 * Nodes js file created by Tamara G. Mack on 09-Apr-19 for tamaramack.github.io
 */

export class Node {
  constructor(substring, parentTree) {
    Object.defineProperties(this, {
      substring: {
        get() {
          return substring;
        },
        enumerable: true
      },
      unique: {
        value: removeDuplicates(...substring)
      },
      q: {
        value: []
      },
      nodes: {
        get() {
          return parentTree.nodes;
        },
        enumerable: true
      },
      parent: {
        get() {
          return parentTree;
        }
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
    if (!this.nodes.has(substr)) this.parent.add(substr);

    Object.defineProperty(this, Model.name, {
      get() {
        return this.nodes.get(substr);
      },
      enumerable: true
    });
    return this[Model.name];
  }
}

export class FirstNode extends Node {
  constructor(...data) {
    super(...data);
    if (this.length > 1) {
      this.addNode(this.slice(0, -1), FirstNode);
      this.addNode(this.slice(1), SecondNode);
    }
  }
}

export class SecondNode extends Node {
  constructor(...data) {
    super(...data);
    if (this.length > 1) this.addNode(this.slice(1), SecondNode);
  }
}

export class SingleNode extends Node {
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

function removeDuplicates(...s) {
  const obj = {};
  for (let i = 0; i < s.length; i++) obj[s[i]] = 1;

  return Object.keys(obj).join('');
}
