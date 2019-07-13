/**
 * infinite-loop-watch js file created by Tamara G. Mack on 12-Jul-19 for
 * tamaramack.github.io
 */

export default function ContinuousLoopTermination(max, initValue, compareFn) {
  let count = 0;
  return (currentValue) => {
    if (!compareFn(initValue, currentValue)) {
      initValue = currentValue;
      count = 0;
    } else {
      count++;
    }

    return (count === max);
  };
}
