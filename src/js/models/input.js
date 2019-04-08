/**
 * input-models js file created by Tamara G. Mack on 07-Apr-19 for tamaramack.github.io
 */
class InputItems {
  constructor(item) {
    this.tp = Date.now();
    Object.defineProperty(this, 'value', {
      value: item,
      enumerable: true
    });
  }

  get id() {
    return `label_${this.value}_${this.tp}`;
  }

  get label() {
    return this.value.replace(/[-_]+/gm, ' ').trim();
  }
}

class InputList {
  constructor({
    group = '',
    desc = '',
    key = '',
    model = {},
    list = []
  }) {
    this.desc = desc;
    this.list = list;
    this.group = group;
    this.key = key;
    this.model = model;
  }
}

export {
  InputItems,
  InputList
};
