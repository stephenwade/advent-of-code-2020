/*
Fix the program so that it terminates normally by changing exactly one jmp
(to nop) or nop (to jmp). What is the value of the accumulator after the
program terminates?
*/

import readFile from '../read-file.js';

const parseInstruction = (line) => {
  const [operation, argumentText] = line.split(' ');
  return { operation, argument: Number(argumentText) };
};

const program = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  program.push(parseInstruction(line));
});

/*
returns the value of the accumulator if the program terminates or false if the
program contains an infinite loop
*/
const execute = (code) => {
  let accumulator = 0;
  let instructionPointer = 0;
  /*
  returns true if the step executed successfully or false if the step attempted
  to execute an invalid instruction
  */
  const step = () => {
    const instruction = code[instructionPointer];
    if (instruction === undefined) return false;

    const { operation, argument } = instruction;
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
    return true;
  };

  const visitedInstructions = new Set();

  while (!visitedInstructions.has(instructionPointer)) {
    visitedInstructions.add(instructionPointer);

    const stepResult = step();
    if (!stepResult)
      // program terminated
      return accumulator;
  }
  // program encountered infinite loop
  return false;
};

program.forEach((instruction, index) => {
  if (instruction.operation === 'jmp' || instruction.operation === 'nop') {
    const newCode = [...program];
    if (instruction.operation === 'jmp')
      newCode[index] = { ...newCode[index], operation: 'nop' };
    else newCode[index] = { ...newCode[index], operation: 'jmp' };

    const executeResult = execute(newCode);
    if (executeResult !== false) {
      // program terminated
      console.log(executeResult);
      process.exit(0);
    }
  }
});
