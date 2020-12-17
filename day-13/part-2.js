/*
What is the earliest timestamp such that all of the listed bus IDs depart at
offsets matching their positions in the list?
*/

import readFile from '../read-file.js';

const lines = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  lines.push(line);
});

const busIDs = lines[1].split(',').map(Number);

// https://stackoverflow.com/a/65275958/1102945

const modularMultiplicativeInverse = (a, modulus) => {
  const b = a % modulus;

  for (let guess = 1n; guess <= modulus; guess += 1n) {
    if ((b * guess) % modulus === 1n) return guess;
  }

  return 1n;
};

const chineseRemainderTheorem = (remainders, moduli) => {
  const product = moduli.reduce((acc, val) => acc * val);

  return (
    moduli.reduce((acc, modulus, index) => {
      const p = product / modulus;
      return (
        acc + remainders[index] * modularMultiplicativeInverse(p, modulus) * p
      );
    }, 0n) % product
  );
};

const busIDsWithIndexes = busIDs
  .map((id, index) => ({ id, index }))
  .filter((x) => !Number.isNaN(x.id));
const remainders = busIDsWithIndexes.map((x) => BigInt(x.id - x.index));
const moduli = busIDsWithIndexes.map((x) => BigInt(x.id));
const result = chineseRemainderTheorem(remainders, moduli);
console.log(result);
