/*
For each group, count the number of questions to which anyone answered "yes".
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

const countDistinctAnswers = (answerGroup) => new Set(answerGroup.flat()).size;

const result = answerGroups
  .map(countDistinctAnswers)
  .reduce((acc, n) => acc + n);
console.log(result);
