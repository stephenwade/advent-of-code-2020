/*
Starting at the top-left corner of your map and following a slope of
right 3 and down 1, how many trees would you encounter?
*/

import readFile from '../read-file.js';

const mapData = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  mapData.push(line.split('').map((char) => (char === '#' ? 'tree' : 'empty')));
});

const mapWidth = mapData[0].length;
const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const treesCounts = [];
for (const [slopeRight, slopeDown] of slopes) {
  let trees = 0;
  mapData.forEach((rowData, row) => {
    if (row % slopeDown !== 0) return;

    const column = ((row * slopeRight) / slopeDown) % mapWidth;
    if (rowData[column] === 'tree') trees += 1;
  });
  treesCounts.push(trees);
}

const result = treesCounts.reduce((acc, n) => acc * n);
console.log(result);
