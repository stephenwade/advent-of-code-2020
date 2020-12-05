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

const requirements = {
  byr: (byr) => {
    const n = Number(byr);
    return n >= 1920 && n <= 2002;
  },
  iyr: (iyr) => {
    const n = Number(iyr);
    return n >= 2010 && n <= 2020;
  },
  eyr: (eyr) => {
    const n = Number(eyr);
    return n >= 2020 && n <= 2030;
  },
  hgt: (hgt) => {
    const result = /^([0-9]+)(cm|in)$/.exec(hgt);
    if (!result) return false;
    const n = Number(result[1]);
    const unit = result[2];
    if (unit === 'cm') return n >= 150 && n <= 193;
    /* unit === 'in' */ return n >= 59 && n <= 76;
  },
  hcl: (hcl) => hcl.match(/^#[0-9a-f]{6}$/),
  ecl: (ecl) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl),
  pid: (pid) => pid.match(/^[0-9]{9}$/),
};
const passportValid = (passport) => {
  const hasAllKeys = Object.keys(requirements).every((key) => key in passport);
  if (!hasAllKeys) return false;
  for (const key of Object.keys(requirements)) {
    const value = passport[key];
    const fn = requirements[key];
    if (typeof fn !== 'function' || !fn(value)) return false;
  }
  return true;
};

const countValid = passports.reduce(
  (acc, p) => (passportValid(p) ? acc + 1 : acc),
  0
);
console.log(countValid);
