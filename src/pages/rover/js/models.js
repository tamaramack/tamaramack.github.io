/**
 * models js file created on 31-Mar-19 for interview-190319-tm
 */
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
  ResultModel,
  PersonModel
};
