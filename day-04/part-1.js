// How many passports are valid?

import readFile from '../read-file.js';

const passports = [];
let nextPassport = {};
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  if (line.length === 0) {
    passports.push(nextPassport);
    nextPassport = {};
  } else {
    line
      .split(' ')
      .map((field) => field.split(':'))
      .forEach(([key, value]) => {
        nextPassport[key] = value;
      });
  }
});
passports.push(nextPassport);

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const passportValid = (passport) =>
  requiredKeys.every((key) => key in passport);

const countValid = passports.reduce(
  (acc, p) => (passportValid(p) ? acc + 1 : acc),
  0
);
console.log(countValid);
