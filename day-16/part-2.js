/*
Discard invalid tickets. Use the remaining valid tickets to determine which
field is which.

Once you work out which field is which, look for the six fields on your ticket
that start with the word departure. What do you get if you multiply those six
values together?
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
let myTicket;
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
      if (line.length > 0) myTicket = parseTicket(line);
      else parseMode = 'nearby tickets label';
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

const isValueValid = (value, rule) =>
  rule.ranges.some((range) => value >= range.low && value <= range.high);

const isValueValidForAnyRule = (value) =>
  fieldRules.some((rule) => isValueValid(value, rule));

const isTicketValid = (ticket) => ticket.every(isValueValidForAnyRule);
const validTickets = [myTicket, ...nearbyTickets.filter(isTicketValid)];

const ticketLabels = [];
for (let i = 0; i < myTicket.length; i += 1) {
  const valuesAtIndex = validTickets.map((ticket) => ticket[i]);
  const fieldNames = fieldRules
    .filter((rule) => valuesAtIndex.every((value) => isValueValid(value, rule)))
    .map((field) => field.name);
  ticketLabels.push(fieldNames);
}

while (ticketLabels.some(Array.isArray)) {
  /* eslint-disable no-continue */
  const uniqueOptions = [];
  for (let i = 0; i < ticketLabels.length; i += 1) {
    if (!Array.isArray(ticketLabels[i])) continue;

    if (ticketLabels[i].length !== 1) continue;

    uniqueOptions.push(ticketLabels[i][0]);
    ticketLabels[i] = ticketLabels[i][0];
  }

  for (let i = 0; i < ticketLabels.length; i += 1) {
    if (!Array.isArray(ticketLabels[i])) continue;

    ticketLabels[i] = ticketLabels[i].filter(
      (label) => !uniqueOptions.includes(label)
    );
  }
}

const result = ticketLabels
  .map((label, index) => ({ label, index }))
  .filter((o) => o.label.startsWith('departure'))
  .map((o) => myTicket[o.index])
  .reduce((acc, value) => acc * value);
console.log(result);
