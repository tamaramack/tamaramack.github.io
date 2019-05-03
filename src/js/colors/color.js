/**
 * color js file created by Tamara G. Mack on 24-Apr-19 for tamaramack.github.io
 */
import ColorBase from './base';

export default class Color extends ColorBase {
  constructor(color, name = null, alpha = 0.75) {
    super(color);
    Object.defineProperties(this, {
      id: {
        value: `h${this._.hex}`,
        enumerable: true
      },
      names: {
        value: name ? [name] : [],
        enumerable: true
      },
      a: {
        value: alpha,
        writable: true
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

  get alpha() {
    return this.a;
  }

  set alpha(value) {
    this.a = parseFloat(value);
  }

  get invert() {
    /* let hex = this._.hex;
    hex = 0xFFFFFF ^ parseInt(hex, 16);
    hex = (`000000${hex.toString(16)}`).slice(-6); */
    const c = this._;
    let color = {
      red: (255 - c.red),
      green: (255 - c.green),
      blue: (255 - c.blue)
    };

    return new Color(color);
  }

  get bw() {
    const c = this.invert._;
    let condition = ((c.red * 0.299) + (c.green * 0.587) + (c.green * 0.114)) > 186;
    return condition ? '#ffffff' : '#000000';
  }

  saturation(percent) {
    const c = this._;
    let color = {
      hue: c.hue,
      saturation: ((c.saturation / 100) * parseFloat(percent)) * 100,
      lightness: c.lightness
    };

    return new Color(color);
  }

  darken(percent) {
    const c = this._;
    let dark = (c.lightness - (c.lightness * parseFloat(percent)));
    let color = {
      hue: c.hue,
      saturation: c.saturation,
      lightness: +dark.toFixed(1)
    };

    return new Color(color);
  }

  lighten(percent) {
    const c = this._;
    let light = (c.lightness + (parseFloat(percent) * (100 - c.lightness)));
    let color = {
      hue: c.hue,
      saturation: c.saturation,
      lightness: +light.toFixed(1)
    };

    return new Color(color);
  }

  contrast(blackWhite) {
    const c = this._;
    let color = {
      red: (255 - c.red),
      green: (255 - c.green),
      blue: (255 - c.blue)
    };

    if (blackWhite) {
      let condition = ((c.red * 0.299) + (c.green * 0.587) + (c.green * 0.114)) > 186;
      color = condition ? '#ffffff' : '#000000';
    }
    return new Color(color);
  }

  transition(color, distance) {

  }

  blend(...colors) {
    const b = this._,
      rgbArray = {
        reds: [b.red],
        greens: [b.green],
        blues: [b.blue]
      };

    for (let i = 0; i < colors.length; i++) {
      let color = colors[i];
      if (!(color instanceof ColorBase))
        color = new ColorBase(color);
      rgbArray.reds.push(color._.red);
      rgbArray.greens.push(color._.green);
      rgbArray.blues.push(color._.blue);
    }

    return new Color({
      red: calc(rgbArray.reds),
      green: calc(rgbArray.greens),
      blue: calc(rgbArray.blues)
    });
  }

  is(color) {
    if (!(color instanceof ColorBase))
      color = new ColorBase(color);
    return (this._.hex === color._.hex);
  }
}

function sum(arr) {
  if (!Array.isArray(arr)) return +arr;
  let sum = 0,
    { length: i } = arr;
  while (i--) sum += arr[i];
  return sum;
}

function calc(arr) {
  if (!Array.isArray(arr)) return +arr;
  const base = 255,
    { length: count } = arr,
    sum = sum(arr);

  return Math.round((sum / (base * count)) * base);
}
