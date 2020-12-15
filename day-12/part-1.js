/*
Figure out where the navigation instructions lead. What is the Manhattan
distance between that location and the ship's starting position?
*/

import readFile from '../read-file.js';

const parseInstruction = (line) => {
  const action = line[0];
  const value = Number(line.substring(1));
  return { action, value };
};

const instructions = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  instructions.push(parseInstruction(line));
});

let direction = 90; // east
let x = 0;
let y = 0;

const doInstruction = (instruction) => {
  const { action, value } = instruction;

  switch (action) {
    case 'N':
      y += value;
      break;

    case 'S':
      y -= value;
      break;

    case 'E':
      x += value;
      break;

    case 'W':
      x -= value;
      break;

    case 'L':
      direction = (direction - value + 360) % 360;
      break;

    case 'R':
      direction = (direction + value) % 360;
      break;

    case 'F':
      switch (direction) {
        case 0:
          y += value;
          break;

        case 90:
          x += value;
          break;

        case 180:
          y -= value;
          break;

        case 270:
          x -= value;
          break;

        // no default
      }
      break;

    // no default
  }
};

instructions.forEach(doInstruction);

const result = Math.abs(x) + Math.abs(y);
console.log(result);
