
export class LargeNumber extends String {
  exp = false;

  neg = false;

  den = [];

  num = [];

  constructor(number) {
    if (number === LargeNumber) return number;
    if (Array.isArray(number)) throw Error('Input item is not a string or number');

    super(number.toString());
    this.original = `${number}`;
  }

  get numerator() {
    return this.num;
  }

  get denominator() {
    return this.den;
  }

  get negative() {
    return this.neg;
  }

  get exponent() {
    return this.exp;
  }

  makeArray() {
    let num,
      den;
    let arr = this.original.split(/e[+|-]/);
    this.exp = arr.length === 2 ? arr.pop() : false;

    arr = arr[0].split('.');
    num = arr[0];
    den = arr.length === 2 ? arr[1] : false;

    if (Number.isNaN(Number(num.substring(0, 1)))) {
      this.negative = num.substring(0, 1) === '-';
      num = num.substring(1);
    }

    this.num = mapLargeNumber(num);
    if (den) this.den = mapLargeNumber(den);
  }
}

export function mapLargeNumber(number) {
  const numberCount = 9;
  const tmp = [];
  console.log('number pre', number, tmp);

  if (!Array.isArray(number)) {
    number += '';
    number = number.split('');
  }

  while (number.length) {
    if (number.length <= numberCount) {
      let num = number.splice(0, number.length);
      tmp.unshift(num.join(''));
      break;
    }
    let num = number.splice(number.length - numberCount);
    tmp.unshift(num.join(''));
  }

  console.log('number', number, tmp);
  return tmp;
}
