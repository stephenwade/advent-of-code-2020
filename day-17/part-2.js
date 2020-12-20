/*
Starting with your given initial configuration, simulate six cycles in a
4-dimensional space. How many cubes are left in the active state after the
sixth cycle?
*/

import rfdc from 'rfdc';
import readFile from '../read-file.js';

const clone = rfdc();

let pocket = [[]]; // 4-dimensional array
const initialSlice = []; // 2-dimensional array
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  initialSlice.push(
    line.split('').map((char) => (char === '#' ? 'active' : 'inactive'))
  );
});
pocket[0].push(initialSlice);

const expandPocket = () => {
  const [sizeY, sizeZ, sizeW] = [
    pocket[0].length,
    pocket[0][0].length,
    pocket[0][0][0].length,
  ];

  for (const volume of pocket) {
    for (const slice of volume) {
      for (const row of slice) {
        row.unshift('inactive');
        row.push('inactive');
      }

      const [rowBefore, rowAfter] = [[], []];
      for (let k = 0; k < sizeW + 2; k += 1) {
        rowBefore.push('inactive');
        rowAfter.push('inactive');
      }
      slice.unshift(rowBefore);
      slice.push(rowAfter);
    }

    const [sliceBefore, sliceAfter] = [[], []];
    for (let j = 0; j < sizeZ + 2; j += 1) {
      const [rowForSliceBefore, rowForSliceAfter] = [[], []];
      for (let k = 0; k < sizeW + 2; k += 1) {
        rowForSliceBefore.push('inactive');
        rowForSliceAfter.push('inactive');
      }
      sliceBefore.push(rowForSliceBefore);
      sliceAfter.push(rowForSliceAfter);
    }
    volume.unshift(sliceBefore);
    volume.push(sliceAfter);
  }

  const [volumeBefore, volumeAfter] = [[], []];
  for (let i = 0; i < sizeY + 2; i += 1) {
    const [sliceForVolumeBefore, sliceForVolumeAfter] = [[], []];
    for (let j = 0; j < sizeZ + 2; j += 1) {
      const [rowForSliceForVolumeBefore, rowForSliceForVolumeAfter] = [[], []];
      for (let k = 0; k < sizeW + 2; k += 1) {
        rowForSliceForVolumeBefore.push('inactive');
        rowForSliceForVolumeAfter.push('inactive');
      }
      sliceForVolumeBefore.push(rowForSliceForVolumeBefore);
      sliceForVolumeAfter.push(rowForSliceForVolumeAfter);
    }
    volumeBefore.push(sliceForVolumeBefore);
    volumeAfter.push(sliceForVolumeAfter);
  }
  pocket.unshift(volumeBefore);
  pocket.push(volumeAfter);
};

const getCell = (x, y, z, w) => {
  const volume = pocket[x];
  if (!volume) return 'inactive';

  const slice = volume[y];
  if (!slice) return 'inactive';

  const row = slice[z];
  if (!row) return 'inactive';

  const cell = row[w];
  if (!cell) return 'inactive';

  return cell;
};

const getNeighbors = (x, y, z, w) => {
  const neighborIndexes = [];
  [x - 1, x, x + 1].forEach((x_) => {
    [y - 1, y, y + 1].forEach((y_) => {
      [z - 1, z, z + 1].forEach((z_) => {
        [w - 1, w, w + 1].forEach((w_) => {
          if (x === x_ && y === y_ && z === z_ && w === w_) return;
          neighborIndexes.push([x_, y_, z_, w_]);
        });
      });
    });
  });

  return neighborIndexes.map((index) => getCell(...index));
};

const runCycle = () => {
  expandPocket();

  const newPocket = clone(pocket);
  newPocket.forEach((volume, x) => {
    volume.forEach((slice, y) => {
      slice.forEach((row, z) => {
        row.forEach((cell, w) => {
          const neighbors = getNeighbors(x, y, z, w);
          const countActiveNeighbors = neighbors.reduce(
            (acc, n) => (n === 'active' ? acc + 1 : acc),
            0
          );

          /* eslint-disable no-param-reassign */

          if (cell === 'active') {
            if (countActiveNeighbors < 2 || countActiveNeighbors > 3)
              row[w] = 'inactive';
          } else if (cell === 'inactive') {
            if (countActiveNeighbors === 3) row[w] = 'active';
          }
        });
      });
    });
  });

  pocket = newPocket;
};

const CYCLE_COUNT = 6;

for (let i = 0; i < CYCLE_COUNT; i += 1) runCycle();

const result = pocket
  .flat(3)
  .reduce((acc, cube) => (cube === 'active' ? acc + 1 : acc), 0);
console.log(result);
