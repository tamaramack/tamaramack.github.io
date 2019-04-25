/**
 * color js file created by Tamara G. Mack on 24-Apr-19 for tamaramack.github.io
 */
import ColorBase from './base';

export default class Color {
  constructor(...color) {
    const _base = new ColorBase(...color);
    Object.defineProperties(this, {
      base: {
        value: _base,
        enumerable: true
      },
      id: {
        value: _base.hex,
        enumerable: true
      },
      name: {
        value: '',
        enumerable: true
      },
      a: {
        value: 1,
        writable: true
      }
    });
  }

  get hex() {
    return this.base.toString('hex');
  }

  get rgb() {
    return this.base.toString('rgb');
  }

  get hsl() {
    return this.base.toString('hsl');
  }

  get rgba() {
    return this.base.toString('rgb', this.alpha);
  }

  get hsla() {
    return this.base.toString('hsl', this.alpha);
  }

  get alpha() {
    return this.a;
  }

  set alpha(value) {
    this.a = +value;
  }

  transition(color, distance) {

  }

  blend(color) {

  }

  is(color) {

  }

  invert() {

  }
}
