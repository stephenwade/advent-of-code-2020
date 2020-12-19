// Given your starting numbers, what will be the 2020th number spoken?

import readFile from '../read-file.js';

const startingNumbers = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  line
    .split(',')
    .map(Number)
    .forEach((num) => startingNumbers.push(num));
});

let turn = 0;
const LAST_TURN = 30_000_000;

// preallocating space for the array improves performance drastically
const whenSpoken = [];
for (let i = 0; i < LAST_TURN; i += 1) whenSpoken[i] = [];

let lastNumberSpoken;
const speak = (number) => {
  const whenNumberSpoken = whenSpoken[number];
  if (whenNumberSpoken.length < 2) {
    whenNumberSpoken.push(turn);
  } else {
    whenNumberSpoken[0] = whenNumberSpoken[1];
    whenNumberSpoken[1] = turn;
  }

  lastNumberSpoken = number;
};

startingNumbers.forEach((number) => {
  turn += 1;
  speak(number);
});

while (turn < LAST_TURN) {
  turn += 1;

  const whenLastNumberSpoken = whenSpoken[lastNumberSpoken];

  const lastNumberSpokenForTheFirstTime = whenLastNumberSpoken.length === 1;
  if (lastNumberSpokenForTheFirstTime) {
    speak(0);
  } else {
    const difference = whenLastNumberSpoken[1] - whenLastNumberSpoken[0];
    speak(difference);
  }
}

console.log(lastNumberSpoken);
