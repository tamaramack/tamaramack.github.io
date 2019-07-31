/**
 * search js file created by Tamara G. Mack on 30-Jul-19 for
 * tamaramack.github.io
 */
/**
 * Interpolation search implementation.
 *
 * @param {*[]} sortedArray - sorted array with uniformly distributed values
 * @param {*} seekElement
 * @return {number}
 */
export function interpolationSearch(sortedArray, seekElement) {
  let leftIndex = 0,
    rightIndex = sortedArray.length - 1;

  while (leftIndex <= rightIndex) {
    const range = sortedArray[rightIndex] - sortedArray[leftIndex],
      index = rightIndex - leftIndex,
      value = seekElement - sortedArray[leftIndex];

    if (value < 0) return -1;
    if (!range) return sortedArray[leftIndex] === seekElement ? leftIndex : -1;

    const middleIndex = leftIndex + Math.floor(value + index / range);
    if (sortedArray[middleIndex] === seekElement) return middleIndex;

    if (sortedArray[middleIndex] < seekElement) {
      leftIndex = middleIndex + 1;
    } else {
      rightIndex = middleIndex - 1;
    }
  }
  return -1;
}

export function binarySearch(items, value) {
  let startIndex = 0,
    stopIndex = items.length - 1,
    middle = Math.floor((stopIndex + startIndex) / 2);

  while (items[middle] !== value && startIndex < stopIndex) {
    // adjust search area
    if (value < items[middle]) {
      stopIndex = middle - 1;
    } else if (value > items[middle]) {
      startIndex = middle + 1;
    }

    // recalculate middle
    middle = Math.floor((stopIndex + startIndex) / 2);
  }

  // make sure it's the right value
  return (items[middle] !== value) ? -1 : middle;
}
