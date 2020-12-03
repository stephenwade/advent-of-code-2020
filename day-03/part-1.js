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
const [slopeRight] = [3, 1];

let trees = 0;
mapData.forEach((rowData, row) => {
  const column = (row * slopeRight) % mapWidth;
  if (rowData[column] === 'tree') trees += 1;
});

console.log(trees);
