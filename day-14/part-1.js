/*
Execute the initialization program. What is the sum of all values left in memory
after it completes?
*/

import readFile from '../read-file.js';

const parseLine = (line) => {
  const [leftHandSide, rightHandSide] = line.split(' = ');

  if (leftHandSide === 'mask') {
    // mask = XX001001X10X110X0001111001110X110101
    return {
      expressionType: 'maskAssignment',
      newMask: rightHandSide,
    };
  }

  // mem[3250] = 4436
  return {
    expressionType: 'memoryAssignment',
    memoryAddress: Number(leftHandSide.substring(4, leftHandSide.length - 1)),
    value: Number(rightHandSide),
  };
};

const program = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  program.push(parseLine(line));
});

let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const memory = {};

const applyMask = (value) => {
  const maskArray = mask.split('').reverse();
  const valueArray = value.toString(2).padStart(36, '0').split('').reverse();

  for (let i = 0; i < valueArray.length; i += 1) {
    const maskBit = maskArray[i];
    if (maskBit !== 'X') valueArray[i] = maskBit;
  }

  const newValue = parseInt(valueArray.reverse().join(''), 2);
  return newValue;
};

const executeInstruction = (instruction) => {
  const { expressionType } = instruction;
  if (expressionType === 'maskAssignment') {
    /*
    {
      expressionType: 'maskAssignment',
      newMask: 'XX001001X10X110X0001111001110X110101',
    }
    */
    const { newMask } = instruction;
    mask = newMask;
    return;
  }

  /*
  {
    expressionType: 'memoryAssignment',
    memoryAddress: 3250,
    value: 4436,
  }
  */
  const { memoryAddress, value } = instruction;
  memory[memoryAddress] = applyMask(value);
};

program.forEach(executeInstruction);

const result = Object.values(memory).reduce((a, b) => a + b);
console.log(result);
