// What is the ID of your seat?

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

const boardingPassIds = boardingPasses.map(getBoardingPassId);
boardingPassIds.sort((a, b) => a - b);
let lastId = boardingPassIds[0];
for (const id of boardingPassIds.slice(1)) {
  if (id - lastId !== 1) {
    console.log(id - 1);
    process.exit(0);
  }
  lastId = id;
}
