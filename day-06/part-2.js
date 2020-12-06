/*
For each group, count the number of questions to which everyone answered "yes".
What is the sum of those counts?
*/

import readFile from '../read-file.js';

const answerGroups = [];
let nextGroup = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  if (line.length === 0) {
    answerGroups.push(nextGroup);
    nextGroup = [];
  } else {
    nextGroup.push(line.split(''));
  }
});
answerGroups.push(nextGroup);

// https://exploringjs.com/impatient-js/ch_sets.html#intersection-a-b
const intersection = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  return [...setA].filter((x) => setB.has(x));
};
const countIntersectionAnswers = (answerGroup) =>
  answerGroup.reduce(intersection).length;

const result = answerGroups
  .map(countIntersectionAnswers)
  .reduce((acc, n) => acc + n);
console.log(result);
