import { LargeNumber, mapLargeNumber } from './large-number';

export {
  add,
  plus,
  minus,
  substract,
  multiply,
  factorialize,
  minusFactor,
  plusFactor
};

function multiply(number, x) {
  let tmp;
  if (number.numerator) {
    tmp = number.numerator;
  } else {
    let obj = LargeNumber(number);
    tmp = obj.numerator;
  }

  let array = [].concat(tmp);
  let carry = 0;

  if (x.numerator) {
    const xNum = x.numerator;
    let j = xNum.length;
    let xIndex = 0;
    while (j--) {
      let _x = xNum[j];
      let i = array.length - xIndex++;
      carry = 0;

      // console.log("x.numerator", j, i, _x, array);
      while (i--) {
        let prod = mapLargeNumber((+array[i] * +_x + carry));
        array[i] = prod.pop();
        carry = +prod.join('');
      }
    }
  } else {
    let i = array.length;
    while (i--) {
      let prod = mapLargeNumber(+array[i] * +x + carry);
      array[i] = prod.pop();
      carry = +prod.join('');
    }
  }

  array = carry
    .toString()
    .split('')
    .concat(array);
  return array.join('');
}

function add(...values) {
  return plus(...values);
}

function plus(...n) {
  let sum = 0;
  let i = n.length;
  while (i--) sum += (+n[i]);
  return sum;
}

function plusRecursive(...n) {
  if (n.length === 1) return n[0];
  return n[0] + plus(...n.slice(1));
}

function substract(...values) {
  return minus(...values);
}

function minus(...n) {
  let sum = 0;
  let i = n.length;
  while (i--) sum -= (+n[i]);
  return sum;
}

function factorialize(number, limiter = 0) {
  let factor = 1;
  for (let i = number; i > limiter; i--) factor *= i;
  return factor;
}

function minusFactor(count) {
  let n = 1;
  let sum = 0;
  while (count >= n++) {
    sum += n;
  }

  return sum;
}

function plusFactor(count) {
  let n = count;
  let sum = count;
  while (n--) {
    sum += n;
  }

  return sum;
}
