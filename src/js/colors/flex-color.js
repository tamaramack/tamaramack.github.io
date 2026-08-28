/**
 * flex-color js file created by Tamara G. Mack on 03-May-19 for tamaramack.github.io
 */
import ColorInterface from './interface';
import ColorBase from './base';
import Mani from './manipulations';

const {
  saturation,
  lightness,
  contrast,
  blend,
  compare
} = Mani;

export default class FlexColor extends ColorInterface {
  constructor(color, name = null, alpha = 0.75) {
    super(color, true);
    let a = +alpha;
    Object.defineProperties(this, {
      id: {
        value: `x${this._.hex}`,
        enumerable: true
      },
      names: {
        value: name ? [name] : [],
        enumerable: true
      },
      alpha: {
        get() {
          return a;
        },
        set(val) {
          a = +val;
        },
        enumerable: true
      }
    });
  }

  get hex() {
    return this.toString('hex');
  }

  get rgb() {
    return this.toString('rgb');
  }

  get hsl() {
    return this.toString('hsl');
  }

  get rgba() {
    return this.toString('rgba', this.alpha);
  }

  get hsla() {
    return this.toString('hsla', this.alpha);
  }

  get cmyk() {
    // TODO: create
    return '';
  }

  get invert() {
    const base = contrast(this);
    return update.call(this, base);
  }

  get bw() {
    return contrast(this, true);
  }

  desaturate(percent) {
    const base = saturation(this, false, percent);
    return update.call(this, base);
  }

  saturate(percent) {
    const base = saturation(this, true, percent);
    return update.call(this, base);
  }

  darken(percent) {
    const base = lightness(this, false, percent);
    return update.call(this, base);
  }

  lighten(percent) {
    const base = lightness(this, true, percent);
    return update.call(this, base);
  }

  transition(color, distance) {

  }

  blend(...colors) {
    const base = blend(this, ...colors);
    return update.call(this, base);
  }

  is(color) {
    return compare(this, color);
  }
}

function update(newColor) {
  this._ = newColor._;
  return this;
}
