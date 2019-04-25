/**
 * base js file created by Tamara G. Mack on 24-Apr-19 for tamaramack.github.io
 */
const formatTypes = Object.create({}, {
  hex: {
    value: 'hex',
    enumerable: true
  },
  rgb: {
    value: 'rgb',
    enumerable: true
  },
  hsl: {
    value: 'hsl',
    enumerable: true
  }
});

export default class ColorBase {
  constructor(...color) {
    const codes = ColorBase.determine(...color);
  }

  toString(type = 'hex', alpha = false) {
    return '';
  }

  static determine(...color) {
    for (const key in color) {
      if (!color.hasOwnProperty(key)) continue;
      Object.defineProperty(this, key, {
        value: color[key],
        enumerable: true
      });
    }
    return {};
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
