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

let waypoint = { x: 10, y: 1 };
let shipPosition = { x: 0, y: 0 };

const doInstruction = (instruction) => {
  const { action, value } = instruction;

  switch (action) {
    case 'N':
      waypoint.y += value;
      break;

    case 'S':
      waypoint.y -= value;
      break;

    case 'E':
      waypoint.x += value;
      break;

    case 'W':
      waypoint.x -= value;
      break;

    case 'L':
      for (let i = 0; i < value; i += 90)
        waypoint = { x: -waypoint.y, y: waypoint.x };
      break;

    case 'R':
      for (let i = 0; i < value; i += 90)
        waypoint = { x: waypoint.y, y: -waypoint.x };
      break;

    case 'F':
      shipPosition = {
        x: shipPosition.x + waypoint.x * value,
        y: shipPosition.y + waypoint.y * value,
      };
      break;

    // no default
  }
};

instructions.forEach(doInstruction);

const { x, y } = shipPosition;
const result = Math.abs(x) + Math.abs(y);
console.log(result);
