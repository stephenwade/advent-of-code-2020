/*
Any given adapter can take an input 1, 2, or 3 jolts lower than its rating and
still produce its rated output joltage.

What is the total number of distinct ways you can arrange the adapters to
connect the charging outlet to your device?
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

/*
I've verified that the input contains no intervals of 2. All I have to handle
are intervals of 1 and 3.

If I split the adapters list on all intervals of 3, I can calculate how many
ways there are to arrange each set of intervals and multiply the answers.
*/

const allPairs = (array) => {
  const result = [];
  for (let i = 0; i < array.length - 1; i += 1)
    result.push([array[i], array[i + 1]]);
  return result;
};

const adapterGroups = [];
let nextGroup = [];
for (const pair of allPairs(adapters)) {
  const [first, second] = pair;
  nextGroup.push(first);

  const difference = second - first;
  if (difference === 3) {
    adapterGroups.push(nextGroup);
    nextGroup = [];
  }
}

// I've verified that my input contains no runs longer than length 5.
// eslint-disable-next-line consistent-return
const countArrangements = (adapterGroup) => {
  /*
  I worked these values out by hand because it was easier than figuring out how
  to calculate them.
  */

  const len = adapterGroup.length;

  if (len <= 2) return 1;
  if (len === 3) return 2;
  if (len === 4) return 4;
  if (len === 5) return 7;
};

const result = adapterGroups
  .map(countArrangements)
  .reduce((acc, count) => acc * count);
console.log(result);
