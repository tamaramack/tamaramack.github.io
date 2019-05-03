/**
 * https://css-tricks.com/converting-color-spaces-in-javascript/
 * base js file created by Tamara G. Mack on 24-Apr-19 for tamaramack.github.io
 */
import regex from './regex';

export default class ColorBase {
  constructor(color) {
    const codes = determine(color);
    Object.defineProperty(this, '_', {
      get() {
        return codes;
      }
    });
  }

  toString(type = 'hex', alpha = 1) {
    const b = this._;
    let msg = 'ERROR: Color Type is not Supported.';
    switch (type) {
      case 'hex':
        return `#${b.hex}`;
      case 'rgb':
        return `rgb(${b.red},${b.green},${b.blue})`;
      case 'rgba':
        return `rgba(${b.red},${b.green},${b.blue},${alpha})`;
      case 'hsl':
        return `hsl(${b.hue},${b.saturation}%,${b.lightness}%)`;
      case 'hsla':
        return `hsla(${b.hue},${b.saturation}%,${b.lightness}%,${alpha})`;
      default:
        console.error(`PROBLEM!\t${msg}`);
        return msg;
    }
  }
}

function determine(color) {
  let hex = false,
    c = {
      r: 0,
      g: 0,
      b: 0,
      h: 0,
      s: 0,
      l: 0
    };
  if (typeof color === 'string') {
    if ((regex.HEX).test(color)) {
      hex = color.substring(1);
      const { red, green, blue } = fromHEXtoRGB(color);
      c.r = red;
      c.g = green;
      c.b = blue;
      const {
        hue,
        saturation,
        lightness
      } = fromRGBtoHSL(c.r, c.g, c.b);
      c.h = hue;
      c.s = saturation;
      c.l = lightness;
    } else {
      stringRgbHslConversion(color, c);
    }
  } else if (Array.isArray(color)) {
    const [red, green, blue] = color;
    c.r = red;
    c.g = green;
    c.b = blue;
  } else {
    objectConversion(color, c);
  }

  return Object.create({}, {
    red: {
      value: c.r,
      enumerable: true
    },
    green: {
      value: c.g,
      enumerable: true
    },
    blue: {
      value: c.b,
      enumerable: true
    },
    hue: {
      value: c.h,
      enumerable: true
    },
    saturation: {
      value: c.s,
      enumerable: true
    },
    lightness: {
      value: c.l,
      enumerable: true
    },
    hex: {
      value: hex || fromRGBtoHex(c.r, c.g, c.b),
      enumerable: true
    }
  });
}

function stringRgbHslConversion(color, c) {
  let hsl;
  const rgb = convertRGBorHSL(color);
  if (rgb)
    switch (rgb.type) {
      case 'rgb':
        c.r = rgb.rh;
        c.g = rgb.gs;
        c.b = rgb.bl;
        hsl = fromRGBtoHSL(c.r, c.g, c.b);
        c.h = hsl.hue;
        c.s = hsl.saturation;
        c.l = hsl.lightness;
        break;
      case 'hsl':
        c.h = rgb.rh;
        c.s = rgb.gs;
        c.l = rgb.bl;
        hsl = fromHSLtoRGB(c.h, c.s, c.l);
        c.r = hsl.red;
        c.g = hsl.green;
        c.b = hsl.blue;
        break;
      default:
        console.error('ERROR: String not RGB or HSL');
    }
}

function objectConversion(color, c) {
  const {
    red, green, blue, hue, saturation, lightness
  } = color;

  if (!(isNaN(red)
    && isNaN(green)
    && isNaN(blue))) {
    c.r = red;
    c.g = green;
    c.b = blue;
  } else {
    const {
      red, blue, green
    } = fromHSLtoRGB(hue, saturation, lightness);
    c.r = red;
    c.g = green;
    c.b = blue;
  }

  if (hue !== undefined
    && saturation !== undefined
    && lightness !== undefined) {
    c.h = hue;
    c.s = saturation;
    c.l = lightness;
  } else {
    const {
      hue, saturation, lightness
    } = fromRGBtoHSL(red, green, blue);
    c.h = hue;
    c.s = saturation;
    c.l = lightness;
  }
}

function fromRGBtoHex(r, g, b) {
  let red = (parseInt(r)).toString(16),
    green = (parseInt(g)).toString(16),
    blue = (parseInt(b)).toString(16);
  // rgb = blue | (green << 8) | (red << 16);

  red = (`0${red}`).slice(-2);
  green = (`0${green}`).slice(-2);
  blue = (`0${blue}`).slice(-2);

  return red + green + blue;
}

function fromRGBtoHSL(r, g, b) {
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

  hue = Math.round(hue * 360);
  saturation = +(saturation * 100).toFixed(1);
  lightness = +(lightness * 100).toFixed(1);

  return { hue, saturation, lightness };
}

function fromHSLtoRGB(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % (2 - 1))),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  let deg = 0;
  const calcDeg = () => { deg += 60; return deg; };
  const map = (start, stop, r, g, b) => ({
    start,
    stop,
    red: r,
    green: g,
    blue: b
  });
  const ranges = [
    map(deg, calcDeg(), c, x, 0),
    map(deg, calcDeg(), x, c, 0),
    map(deg, calcDeg(), 0, c, x),
    map(deg, calcDeg(), 0, x, c),
    map(deg, calcDeg(), x, 0, c),
    map(deg, calcDeg(), c, 0, x)
  ];
  const isRange = range => (range.start <= h && h < range.stop);
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (isRange(range)) {
      r = range.red; g = range.green; b = range.blue;
      break;
    }
  }

  return {
    red: Math.round((r + m) * 255),
    green: Math.round((g + m) * 255),
    blue: Math.round((b + m) * 255)
  };
}

function fromHEXtoRGB(hex) {
  const [firstChar] = hex;
  if (firstChar === '#')
    hex = hex.substring(1);

  let red = 0,
    green = 0,
    blue = 0;
  const { length } = hex;

  if (length === 3) {
    const [R, G, B] = hex;
    red = +(`0x${R + R}`);
    green = +(`0x${G + G}`);
    blue = +(`0x${B + B}`);
  } else if (length === 6) {
    const [R, r, G, g, B, b] = hex;
    red = +(`0x${R + r}`);
    green = +(`0x${G + g}`);
    blue = +(`0x${B + b}`);
  }

  return {
    red, green, blue
  };
}

function convertRGBorHSL(color) {
  let type = color.substring(0, 3);
  let colorResults = color.match(/\d+/g);
  const sep = color.indexOf(',') > -1 ? /,\s*/ : /\s+/;
  const startIndex = color[3] === 'a' ? 5 : 4;

  if (type === 'rgb') colorResults = rgbFromString(color, startIndex, sep);
  else if (type === 'hsl') colorResults = hslFromString(color, startIndex, sep);

  return {
    rh: +colorResults[0],
    gs: +colorResults[1],
    bl: +colorResults[2],
    type
  };
}

function rgbFromString(color, startIndex, sep) {
  let rgb = color.substring(startIndex).split(')')[0].split(sep);
  rgb = rgb.slice(0, 3);

  let i = rgb.length;
  while (i--) {
    let range = rgb[i];

    if (range.includes('%')) {
      const pct = +(range.slice(0, -1)) / 100;
      range = Math.round(pct * 255);
    }
    rgb[i] = `${range}`;
  }

  return rgb;
}

function hslFromString(color, startIndex, sep) {
  let hsl = color.substring(startIndex).split(')')[0].split(sep);
  hsl = hsl.slice(0, 3);

  let i = hsl.length;
  while (i--) {
    let range = hsl[i];
    const has = ['deg', 'rad', 'turn', '%'].find(t => range.includes(t));

    if (has) range = range.slice(0, -has.length);
    switch (has) {
      case 'rad':
        range = Math.round(+range * (180 / Math.PI));
        break;
      case 'turn':
        range = Math.round(+range * 360);
        break;
      default:
    }

    if (range >= 360) range %= 360;
    hsl[i] = range;
  }

  return hsl;
}
