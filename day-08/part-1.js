/*
Run your copy of the boot code. Immediately before any instruction is executed
a second time, what value is in the accumulator?
*/

import readFile from '../read-file.js';

const parseInstruction = (line) => {
  const [operation, argumentText] = line.split(' ');
  return { operation, argument: Number(argumentText) };
};

const code = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  code.push(parseInstruction(line));
});

let accumulator = 0;
let instructionPointer = 0;
const execute = () => {
  const { operation, argument } = code[instructionPointer];
  switch (operation) {
    case 'acc':
      accumulator += argument;
      instructionPointer += 1;
      break;
    case 'jmp':
      instructionPointer += argument;
      break;
    case 'nop':
      instructionPointer += 1;
      break;
    // no default
  }
};

const visitedInstructions = new Set();

while (!visitedInstructions.has(instructionPointer)) {
  visitedInstructions.add(instructionPointer);
  execute();
}
console.log(accumulator);
