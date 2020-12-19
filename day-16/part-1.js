/*
Start by determining which nearby tickets are completely invalid; these are
tickets that contain values which aren't valid for any field.

Adding together all of the invalid values produces your ticket scanning error
rate. What is your ticket scanning error rate?
*/

import readFile from '../read-file.js';

const parseFieldRange = (rangeText) => {
  const [low, high] = rangeText.split('-').map(Number);
  return { low, high };
};

const parseFieldRule = (line) => {
  const [name, rangesText] = line.split(': ');
  const ranges = rangesText.split(' or ').map(parseFieldRange);
  return { name, ranges };
};

const parseTicket = (line) => line.split(',').map(Number);

const fieldRules = [];
// let myTicket;
const nearbyTickets = [];

let parseMode = 'field rule';
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  switch (parseMode) {
    case 'field rule':
      if (line.length > 0) fieldRules.push(parseFieldRule(line));
      else parseMode = 'your ticket label';
      break;

    case 'your ticket label':
      parseMode = 'your ticket';
      break;

    case 'your ticket':
      // if (line.length > 0) myTicket = parseTicket(line);
      // else parseMode = 'nearby tickets label';
      if (line.length === 0) parseMode = 'nearby tickets label';
      break;

    case 'nearby tickets label':
      parseMode = 'nearby tickets';
      break;

    case 'nearby tickets':
      nearbyTickets.push(parseTicket(line));
      break;

    // no default
  }
});

const isValueValidForAnyRule = (value) =>
  fieldRules.some((rule) =>
    rule.ranges.some((range) => value >= range.low && value <= range.high)
  );

const result = nearbyTickets
  .flat()
  .filter((value) => !isValueValidForAnyRule(value))
  .reduce((acc, value) => acc + value);
console.log(result);
