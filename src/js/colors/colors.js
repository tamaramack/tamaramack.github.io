/**
 * colors js file created by Tamara G. Mack on 19-Apr-19 for tamaramack.github.io
 */
import names from "./colors.json";
import regex from './regex';
import ColorBase from './base';
import FlexColor from './flex-color';
import Color from './color';

const nameKeys = Object.keys(names).sort();

export default class Colors {
  constructor() {
    Object.defineProperties(this, {
      colors: {
        value: [],
        enumerable: true
      },
      hexset: {
        value: new Map(),
        enumerable: true
      }
    });

    for (let i = 0; i < nameKeys.length; i++) {
      if (nameKeys[i] === 'transparent') continue;
      const key = nameKeys[i],
        color = new Color(names[key], key);
      if (!this.hexset.has(color.hex)) {
        this.hexset.set(color.hex, this.length);
        this.colors.push(color);
      } else {
        this.colors[this.hexset.get(color.hex)].names.push(key);
      }
    }
  }

  get ColorNames() {
    return nameKeys;
  }

  get length() {
    return this.colors.length;
  }

  has(value, property) {
    for (let i = 0; i < this.colors.length; i++) {
      let color = this.colors[i];
      if (property)
        if (!Array.isArray(property)) {
          if (color[property] === value) return true;
        } else {
          while (property.length) color = color[property.shift()];
          if (color === value) return true;
        }
      else if (color === value) return true;
    }
    return false;
  }

  get(color) {
    if ((color instanceof Color))
      color = color.hex;

    return this.colors[this.hexset.get(color)];
  }

  add(...colors) {
    for (let i = 0; i < colors.length; i++) {
      let color = colors[i];
      if (!(color instanceof Color))
        color = new Color(color);

      if (!this.hexset.has(color.hex)) {
        this.hexset.set(color.hex, this.length);
        this.colors.push(color);
      } else if (color.names.length) {
        this.colors[this.hexset.get(color.hex)].names.push(...color.names);
      }
    }
  }

  filter(cb) {
    const results = [];
    for (let i = 0; i < this.colors.length; i++) {
      const value = this.colors[i];
      if (cb(value, i, this.colors)) results[results.length] = value;
    }
    return results;
  }

  map(cb) {
    const results = [];
    for (let i = 0; i < this.colors.length; i++) {
      const value = cb(this.colors[i], i, this.colors);
      if (value !== undefined) results[results.length] = value;
    }
    return results;
  }

  static random(alpha) {
    const opacity = alpha ? round(Math.random(), 2) : 1;
    return new Color({
      red: randomRgb256(),
      green: randomRgb256(),
      blue: randomRgb256()
    }, null, opacity);
  }

  static invertColor(color) {
    if (!(color instanceof ColorBase)) {
      console.error('Color not instance of Color class');
      return false;
    }
    let hex = color._.hex;
    hex = 0xFFFFFF ^ parseInt(hex, 16);
    hex = (`000000${hex.toString(16)}`).slice(-6);

    return this.Color(`#${hex}`);
  }

  static isHsl(color) {
    if (isTypeOf('HSL', color))
      return 'hsl';

    if (isTypeOf('HSLA', color))
      return 'hsla';

    return false;
  }

  static isHex(color) {
    if (isTypeOf('HEX', color))
      return 'hex';

    if (isTypeOf('HEX_ALPHA', color))
      return 'hex-alpha';

    return false;
  }

  static isRgb(color) {
    if (isTypeOf('RGB', color))
      return 'rgb';

    if (isTypeOf('RGBA', color))
      return 'rgba';

    return false;
  }

  static Color(color, flex) {
    if (color instanceof Color)
      return color;

    return new Color(color);
  }
}

function isTypeOf(type, color) {
  return regex[type].test(color);
}

function round(number, decimals) {
  if (!decimals) return Math.round(number);
  const multiplier = 10 ** decimals;
  return Math.round(number * multiplier) / multiplier;
}

function randomRgb256() {
  return Math.floor(Math.random() * 256);
}
