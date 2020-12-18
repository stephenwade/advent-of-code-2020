/*
Execute the initialization program using an emulator for a version 2 decoder
chip. What is the sum of all values left in memory after it completes?
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
    if (maskBit === '1') valueArray[i] = 1;
    if (maskBit === 'X') valueArray[i] = 'floating';
  }

  let allValueArrays = [valueArray];
  while (
    allValueArrays.filter((array) => array.includes('floating')).length > 0
  ) {
    const nextValueArrays = allValueArrays.map((array) => {
      const floatingIndex = array.findIndex((el) => el === 'floating');

      const firstResult = [...array];
      firstResult[floatingIndex] = 0;

      const secondResult = [...array];
      secondResult[floatingIndex] = 1;

      return [firstResult, secondResult];
    });
    allValueArrays = nextValueArrays.flat();
  }

  const result = allValueArrays.map((array) =>
    parseInt(array.reverse().join(''), 2)
  );
  return result;
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
  for (const address of applyMask(memoryAddress)) memory[address] = value;
};

program.forEach(executeInstruction);

const result = Object.values(memory).reduce((a, b) => a + b);
console.log(result);
