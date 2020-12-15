/*
Seating rules:

People don't just care about adjacent seats - they care about the first seat
they can see in each of eight directions.

- If a seat is empty and there are no occupied seats in any direction, the seat
  becomes occupied.
- If a seat is occupied and five or more seats in any direction are also
  occupied, the seat becomes empty.
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

const getFirstSeatInDirection = (rowIndex, columnIndex, direction) => {
  const [directionRow, directionColumn] = direction;

  let seat;
  do {
    /* eslint-disable no-param-reassign */
    rowIndex += directionRow;
    columnIndex += directionColumn;
    seat = getSeat(rowIndex, columnIndex);
  } while (seat && seat.type === 'floor');

  return seat;
};

const getAdjacentSeats = (rowIndex, columnIndex) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return directions.map((direction) =>
    getFirstSeatInDirection(rowIndex, columnIndex, direction)
  );
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

  if (seat.type === 'occupied seat' && occupiedAdjacentSeats.length >= 5) {
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
