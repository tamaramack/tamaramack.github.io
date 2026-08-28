/**
 * color js file created by Tamara G. Mack on 24-Apr-19 for tamaramack.github.io
 */
import ColorInterface from './interface';
import ColorBase from './base';
import FlexColor from './flex-color';
import Mani from './manipulations';

const {
  saturation,
  lightness,
  contrast,
  blend,
  compare
} = Mani;

export default class Color extends ColorInterface {
  constructor(color, name = null, alpha = 0.75) {
    super(color);
    let a = +alpha;
    Object.defineProperties(this, {
      id: {
        value: `s${this._.hex}`,
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
        set(value) {
          a = +value;
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
    return new FlexColor(base);
  }

  get bw() {
    return contrast(this, true);
  }

  desaturate(percent) {
    const base = saturation(this, false, percent);
    return new FlexColor(base);
  }

  saturate(percent) {
    const base = saturation(this, true, percent);
    return new FlexColor(base);
  }

  darken(percent) {
    const base = lightness(this, false, percent);
    return new FlexColor(base);
  }

  lighten(percent) {
    const base = lightness(this, true, percent);
    return new FlexColor(base);
  }

  transition(color, distance) {

  }

  blend(...colors) {
    const base = blend(this, ...colors);
    return new FlexColor(base);
  }

  is(color) {
    return compare(this, color);
  }
}
