/**
 * models js file created on 31-Mar-19 for interview-190319-tm
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

class PersonModel {
  constructor(result) {
    for (let prop in result) {
      const value = result[prop];
      Object.defineProperty(this, prop, {
        value,
        enumerable: true
      });
    }
  }
}

class ResultModel {
  constructor(result) {
    for (let prop in result) {
      let value = result[prop];
      if (prop === 'person_summary') value = new PersonModel(value);
      Object.defineProperty(this, prop, {
        value,
        enumerable: true
      });
    }
  }

  get location() {
    return `${this.neighborhood}, ${this.city}, ${this.state} ${this.zip}`;
  }
}

export {
  InputItems,
  InputList,
  ResultModel
};
