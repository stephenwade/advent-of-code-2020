/*
Seating rules:

- If a seat is empty and there are no occupied seats adjacent to it, the seat
  becomes occupied.
- If a seat is occupied and four or more seats adjacent to it are also occupied,
  the seat becomes empty.
- Otherwise, the seat's state does not change.

Simulate your seating area by applying the seating rules repeatedly until no
seats change state. How many seats end up occupied?
*/

import readFile from '../read-file.js';

const seats = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  seats.push(
    line
      .split('')
      .map((char) => ({ type: char === 'L' ? 'empty seat' : 'floor' }))
  );
});

const getSeat = (rowIndex, columnIndex) => {
  const row = seats[rowIndex];
  if (row) return row[columnIndex];
  return undefined;
};

const getAdjacentSeats = (rowIndex, columnIndex) => {
  const adjacentSeatIndexes = [
    [rowIndex - 1, columnIndex - 1],
    [rowIndex - 1, columnIndex],
    [rowIndex - 1, columnIndex + 1],
    [rowIndex, columnIndex - 1],
    [rowIndex, columnIndex + 1],
    [rowIndex + 1, columnIndex - 1],
    [rowIndex + 1, columnIndex],
    [rowIndex + 1, columnIndex + 1],
  ];

  return adjacentSeatIndexes.map((index) => getSeat(...index));
};

const markRule = (rowIndex, columnIndex) => {
  const seat = getSeat(rowIndex, columnIndex);
  if (seat.type === 'floor') return null;

  const adjacentSeats = getAdjacentSeats(rowIndex, columnIndex);
  const occupiedAdjacentSeats = adjacentSeats.filter(
    (seat_) => seat_ && seat_.type === 'occupied seat'
  );

  if (seat.type === 'empty seat' && occupiedAdjacentSeats.length === 0) {
    seat.nextType = 'occupied seat';
    return seat;
  }

  if (seat.type === 'occupied seat' && occupiedAdjacentSeats.length >= 4) {
    seat.nextType = 'empty seat';
    return seat;
  }

  return null;
};

const applyRule = (seat) => {
  /* eslint-disable no-param-reassign */
  seat.type = seat.nextType;
  delete seat.nextType;
};

const runAllRules = () => {
  const changedSeats = [];

  for (let rowIndex = 0; rowIndex < seats.length; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < seats[0].length; columnIndex += 1) {
      const ruleResult = markRule(rowIndex, columnIndex);
      if (ruleResult) changedSeats.push(ruleResult);
    }
  }

  changedSeats.forEach(applyRule);

  return changedSeats.length;
};

// eslint-disable-next-line no-constant-condition
while (true) {
  const changedSeatsCount = runAllRules();
  if (changedSeatsCount === 0) break;
}

const result = seats.flat().filter((seat) => seat.type === 'occupied seat')
  .length;
console.log(result);
