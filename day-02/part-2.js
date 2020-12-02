/*
How many passwords are valid according to their policies?

Example input:

  1-3 a: abcde
  1-3 b: cdefg
  2-9 c: ccccccccc

Each policy describes two positions in the password, where 1 means the
first character, 2 means the second character, and so on. Exactly one of
these positions must contain the given letter. Other occurrences of the
letter are irrelevant for the purposes of policy enforcement.
*/

import readFile from '../read-file.js';

const passwordValid = (password, policy) => {
  const { policyLetter, firstIndex, secondIndex } = policy;

  const firstLetter = password[firstIndex - 1];
  const secondLetter = password[secondIndex - 1];

  return Boolean(
    // eslint-disable-next-line no-bitwise
    (firstLetter === policyLetter) ^ (secondLetter === policyLetter)
  );
};

let totalValid = 0;
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [policyStr, password] = line.split(': ');
  const [rangeStr, policyLetter] = policyStr.split(' ');
  const [firstIndex, secondIndex] = rangeStr.split('-').map(Number);

  const policy = { policyLetter, firstIndex, secondIndex };
  if (passwordValid(password, policy)) totalValid += 1;
});

console.log(totalValid);
