/*
Find the first number in the list (after the preamble) which is not the sum of
two of the 25 numbers before it.
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

const PREAMBLE_LENGTH = 25;
for (let i = PREAMBLE_LENGTH; i < data.length; i += 1) {
  const previousNumbers = data.slice(i - PREAMBLE_LENGTH, i);
  const thisNumber = data[i];

  if (!allSums(previousNumbers).has(thisNumber)) {
    console.log(thisNumber);
    process.exit(0);
  }
}
