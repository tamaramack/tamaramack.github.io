import ColorBase from './base';

/**
 * manipulations js file created by Tamara G. Mack on 03-May-19 for tamaramack.github.io
 */
export default {
  saturation,
  lightness,
  contrast,
  blend,
  compare
};


function saturation(contextColor, saturate, percent) {
  const c = contextColor._;
  let calculation = (c.saturation - (c.saturation * parseFloat(percent)));
  if (saturate)
    calculation = (c.saturation + (parseFloat(percent) * (100 - c.saturation)));
  let color = {
    hue: c.hue,
    saturation: +calculation.toFixed(1),
    lightness: c.lightness
  };

  return new ColorBase(color);
}

function lightness(contextColor, lighten, percent) {
  const c = contextColor._;
  let calculation = (c.lightness - (c.lightness * parseFloat(percent)));
  if (lighten)
    calculation = (c.lightness + (parseFloat(percent) * (100 - c.lightness)));

  let color = {
    hue: c.hue,
    saturation: c.saturation,
    lightness: +calculation.toFixed(1)
  };

  return new ColorBase(color);
}

function contrast(contextColor, blackWhite) {
  if (blackWhite) return bw(contextColor);

  const c = contextColor._;
  let color = {
    red: (255 - c.red),
    green: (255 - c.green),
    blue: (255 - c.blue)
  };

  return new ColorBase(color);
}

function transition(color, distance) {

}

function blend(...colors) {
  const rgbArray = {
    reds: [],
    greens: [],
    blues: []
  };

  for (let i = 0; i < colors.length; i++) {
    let color = colors[i];
    if (!(color instanceof ColorBase))
      color = new ColorBase(color);
    rgbArray.reds.push(color._.red);
    rgbArray.greens.push(color._.green);
    rgbArray.blues.push(color._.blue);
  }

  return new ColorBase({
    red: calc(rgbArray.reds),
    green: calc(rgbArray.greens),
    blue: calc(rgbArray.blues)
  });
}

function compare(color1, color2) {
  if (!(color1 instanceof ColorBase))
    color1 = new ColorBase(color1);
  if (!(color2 instanceof ColorBase))
    color2 = new ColorBase(color2);
  return (color1._.hex === color2._.hex);
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

function bw(contextColor) {
  const c = contextColor.invert._;
  let condition = ((c.red * 0.299) + (c.green * 0.587) + (c.green * 0.114)) > 186;
  return condition ? '#ffffff' : '#000000';
}

function invert(contextColor) {
  let hex = contextColor._.hex;
  hex = 0xFFFFFF ^ parseInt(hex, 16);
  hex = (`000000${hex.toString(16)}`).slice(-6);

  return new ColorBase(`#${hex}`);
}
