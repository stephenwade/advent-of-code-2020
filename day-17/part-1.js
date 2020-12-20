/*
Starting with your given initial configuration, simulate six cycles. How many
cubes are left in the active state after the sixth cycle?
*/

import rfdc from 'rfdc';
import readFile from '../read-file.js';

const clone = rfdc();

let pocket = []; // 3-dimensional array

const initialSlice = []; // 2-dimensional array
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  initialSlice.push(
    line.split('').map((char) => (char === '#' ? 'active' : 'inactive'))
  );
});
pocket.push(initialSlice);

const expandPocket = () => {
  const [sizeY, sizeZ] = [pocket[0].length, pocket[0][0].length];

  for (const slice of pocket) {
    for (const row of slice) {
      row.unshift('inactive');
      row.push('inactive');
    }

    const [rowBefore, rowAfter] = [[], []];
    for (let j = 0; j < sizeZ + 2; j += 1) {
      rowBefore.push('inactive');
      rowAfter.push('inactive');
    }
    slice.unshift(rowBefore);
    slice.push(rowAfter);
  }

  const [sliceBefore, sliceAfter] = [[], []];
  for (let i = 0; i < sizeY + 2; i += 1) {
    const [rowForSliceBefore, rowForSliceAfter] = [[], []];
    for (let j = 0; j < sizeZ + 2; j += 1) {
      rowForSliceBefore.push('inactive');
      rowForSliceAfter.push('inactive');
    }
    sliceBefore.push(rowForSliceBefore);
    sliceAfter.push(rowForSliceAfter);
  }
  pocket.unshift(sliceBefore);
  pocket.push(sliceAfter);
};

const getCell = (x, y, z) => {
  const slice = pocket[x];
  if (!slice) return 'inactive';

  const row = slice[y];
  if (!row) return 'inactive';

  const cell = row[z];
  if (!cell) return 'inactive';

  return cell;
};

const getNeighbors = (x, y, z) => {
  const neighborIndexes = [];
  [x - 1, x, x + 1].forEach((x_) => {
    [y - 1, y, y + 1].forEach((y_) => {
      [z - 1, z, z + 1].forEach((z_) => {
        if (x === x_ && y === y_ && z === z_) return;
        neighborIndexes.push([x_, y_, z_]);
      });
    });
  });

  return neighborIndexes.map((index) => getCell(...index));
};

const runCycle = () => {
  expandPocket();

  const newPocket = clone(pocket);
  newPocket.forEach((slice, x) => {
    slice.forEach((row, y) => {
      row.forEach((cell, z) => {
        const neighbors = getNeighbors(x, y, z);
        const countActiveNeighbors = neighbors.reduce(
          (acc, n) => (n === 'active' ? acc + 1 : acc),
          0
        );

        /* eslint-disable no-param-reassign */

        if (cell === 'active') {
          if (countActiveNeighbors < 2 || countActiveNeighbors > 3)
            row[z] = 'inactive';
        } else if (cell === 'inactive') {
          if (countActiveNeighbors === 3) row[z] = 'active';
        }
      });
    });
  });

  pocket = newPocket;
};

const CYCLE_COUNT = 6;

for (let i = 0; i < CYCLE_COUNT; i += 1) runCycle();

const result = pocket
  .flat(2)
  .reduce((acc, cube) => (cube === 'active' ? acc + 1 : acc), 0);
console.log(result);
