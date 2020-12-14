/*
What is the number of 1-jolt differences multiplied by the number of 3-jolt
differences?
*/

import readFile from '../read-file.js';

const adapters = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  adapters.push(Number(line));
});

/*
Treat the charging outlet near your seat as having an effective joltage rating
of 0.
*/
adapters.push(0);

adapters.sort((a, b) => a - b);

/*
Your device has a built-in joltage adapter rated for 3 jolts higher than the
highest-rated adapter in your bag.
*/
const deviceRating = adapters[adapters.length - 1] + 3;
adapters.push(deviceRating);

const allPairs = (array) => {
  const result = [];
  for (let i = 0; i < array.length - 1; i += 1)
    result.push([array[i], array[i + 1]]);
  return result;
};

let differences1 = 0;
let differences3 = 0;
for (const pair of allPairs(adapters)) {
  const [first, second] = pair;
  if (second - first === 3) differences3 += 1;
  if (second - first === 1) differences1 += 1;
}

const result = differences1 * differences3;
console.log(result);
