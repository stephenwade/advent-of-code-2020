/*
Find a contiguous set of at least two numbers in your list which sum to the
invalid number from step 1. Add together the smallest and largest number in
this contiguous range.
*/

import readFile from '../read-file.js';

const data = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  data.push(Number(line));
});

const allSums = (numbers) =>
  new Set(
    numbers.flatMap((x, i) =>
      numbers.slice(i + 1).flatMap((y) => (x === y ? [] : [x + y]))
    )
  );

// eslint-disable-next-line consistent-return
const findInvalidNumber = (numbers) => {
  const PREAMBLE_LENGTH = 25;
  for (let i = PREAMBLE_LENGTH; i < numbers.length; i += 1) {
    const previousNumbers = numbers.slice(i - PREAMBLE_LENGTH, i);
    const thisNumber = numbers[i];

    if (!allSums(previousNumbers).has(thisNumber)) {
      return thisNumber;
    }
  }
};
const invalidNumber = findInvalidNumber(data);

// eslint-disable-next-line consistent-return
const findRange = (numbers, predicate) => {
  for (
    let i = 0;
    i < numbers.length - 1; // skip last slice because it has length 1
    i += 1
  ) {
    const slice = numbers.slice(i);
    /*
    if numbers is [1, 2, 3, 4, 5], slice will be:
      [1, 2, 3, 4, 5]
      [2, 3, 4, 5]
      [3, 4, 5]
      [4, 5]
    */

    for (
      let j = 1; // skip first subslice because it has length 1
      j < slice.length;
      j += 1
    ) {
      /*
      if slice is [2, 3, 4, 5], subslice will be:
        [2, 3]
        [2, 3, 4]
        [2, 3, 4, 5]
      */
      const subslice = slice.slice(0, j + 1);

      if (predicate(subslice)) return subslice;
    }
  }
};

const range = findRange(
  data,
  (numbers) => numbers.reduce((acc, n) => acc + n) === invalidNumber
);
const lowest = Math.min(...range);
const highest = Math.max(...range);
const result = lowest + highest;
console.log(result);
