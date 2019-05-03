import ColorBase from './base';

/**
 * interface js file created by Tamara G. Mack on 03-May-19 for tamaramack.github.io
 */
const properties = [
  'hex',
  'rgb',
  'hsl',
  'rgba',
  'hsla',
  'cmyk',
  'invert',
  'bw',
  'desaturate',
  'saturate',
  'darken',
  'lighten',
  'blend',
  'is'
];

class ColorInterface extends ColorBase {
  constructor(...data) {
    super(...data);
    let missing = properties.filter(prop => typeof this[prop] === 'undefined');
    if (missing.length) {
      const name = this.constructor.name,
        err = `Colors {${name}} requires these missing properties: [${missing.join(', ')}]`;
      throw new Error(err);
    }
  }
}

export default ColorInterface;
