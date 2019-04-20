/**
 * colors js file created by Tamara G. Mack on 19-Apr-19 for tamaramack.github.io
 */
import names from "@/js/data/colors.json";

class Color {
  constructor(color = {
    red: null,
    green: null,
    blue: null,
    hue: null,
    saturation: null,
    lightness: null,
    alpha: 1
  }) {
    for (const key in color) {
      if (!color.hasOwnProperty(key)) continue;
      Object.defineProperty(this, key, {
        value: color[key],
        enumerable: true
      });
    }
  }

  get rgbaString() {
    return '';
  }

  get hslaString() {
    return '';
  }

  get hexString() {
    return '';
  }

  transition(color, distance) {

  }

  blend(color) {

  }

  is(color) {

  }
}

export default class Colors {
  constructor(...color) {
    let _color = color;
    if (typeof color[0] === 'string') {
      // TODO: find color type
      _color = color[0];
      if (isHexString(_color))
        _color = toRGB(_color);
    } else if (Array.isArray(color[0])) {
      // TODO: set [red, green, blue, alpha]
    } else if (color.length === 1) {
    } else {

    }
    this.base = {};
  }

  static get ColorNames() {
    return names;
  }

  static toHex(...data) {
    return toHex.call(this, ...data);
  }

  static toRgb(hex) {
    const { red, green, blue } = toRGB.call(this, hex);
    return `rgb(${[red, green, blue].join(',')})`;
  }

  static invertColor() {

  }

  static isHex(color) {
    return isHexString.call(this, color);
  }

  static isRgb(color) {
    return isRgbString.call(this, color);
  }
}

function determine(color) {
  let _color = color;
  if (typeof color[0] === 'string') {
    // TODO: find color type
    _color = color[0];
    if (isHexString(_color))
      _color = toRGB(_color);
  } else if (Array.isArray(color[0])) {
    // TODO: set [red, green, blue, alpha]
  } else if (color.length === 1) {
  } else {

  }
}

function toHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);

  let hue,
    saturation,
    lightness = (max + min) / 2;

  if (max === min) {
    saturation = 0;
    hue = saturation;
  } else {
    const d = max - min;
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        hue = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / d + 2;
        break;
      case b:
        hue = (r - g) / d + 4;
        break;
      default:
    }

    hue /= 6;
  }

  return { hue, saturation, lightness };
}

function isHexString(color) {
  if (color.length === 4)
    return /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(color);
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
}

function toHex(r, g, b) {
  let red = (parseInt(r)).toString(16),
    green = (parseInt(g)).toString(16),
    blue = (parseInt(b)).toString(16);
    // rgb = blue | (green << 8) | (red << 16);

  red = (`0${red}`).slice(-2);
  green = (`0${green}`).slice(-2);
  blue = (`0${blue}`).slice(-2);

  return `#${red + green + blue}`;
}

function isRgbString(color) {
  let alpha;
  const colorResults = color.match(/\d+/g);
  if (colorResults.length < 3 && colorResults.length > 5) return false;
  if (colorResults.length > 3) alpha = parseFloat([...colorResults.slice(3)].join('.'));

  return {
    red: +colorResults[0],
    green: +colorResults[1],
    blue: +colorResults[2],
    alpha
  };
}

function toRGB(hex) {
  const result = isHexString(hex);
  let rgb = '',
    red,
    green,
    blue;

  if (result) {
    red = parseInt(result[1], 16);
    green = parseInt(result[2], 16);
    blue = parseInt(result[3], 16);
    rgb = `rgb(${[red, green, blue].join(',')})`;
  }

  return result ? {
    rgb, red, green, blue
  } : null;
}
