/*
How many passwords are valid according to their policies?

Example input:

  1-3 a: abcde
  1-3 b: cdefg
  2-9 c: ccccccccc

The password policy indicates the lowest and highest number of times a given
letter must appear for the password to be valid.
*/

import readFile from '../read-file.js';

const passwordValid = (password, policy) => {
  const { policyLetter, rangeLow, rangeHigh } = policy;

  let validLetters = 0;
  for (const letter of password) {
    if (letter === policyLetter) validLetters += 1;
  }

  return validLetters >= rangeLow && validLetters <= rangeHigh;
};

let totalValid = 0;
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [policyStr, password] = line.split(': ');
  const [rangeStr, policyLetter] = policyStr.split(' ');
  const [rangeLow, rangeHigh] = rangeStr.split('-').map(Number);

  const policy = { policyLetter, rangeLow, rangeHigh };
  if (passwordValid(password, policy)) totalValid += 1;
});

console.log(totalValid);
