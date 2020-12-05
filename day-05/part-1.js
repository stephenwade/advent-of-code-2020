// What is the highest seat ID on a boarding pass?

import readFile from '../read-file.js';

const boardingPasses = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const rowText = line.substring(0, 7);
  const rowBinary = rowText.replaceAll('F', '0').replaceAll('B', '1');
  const row = parseInt(rowBinary, 2);

  const columnText = line.substring(7);
  const columnBinary = columnText.replaceAll('L', '0').replaceAll('R', '1');
  const column = parseInt(columnBinary, 2);

  const boardingPass = { row, column };
  boardingPasses.push(boardingPass);
});

const getBoardingPassId = (pass) => pass.row * 8 + pass.column;

const result = boardingPasses
  .map(getBoardingPassId)
  .reduce((acc, id) => Math.max(acc, id));
console.log(result);
