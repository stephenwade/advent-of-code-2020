/*
What is the ID of the earliest bus you can take to the airport multiplied by the
number of minutes you'll need to wait for that bus?
*/

import readFile from '../read-file.js';

const lines = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  lines.push(line);
});

const earliestTimestamp = Number(lines[0]);
const busIDs = lines[1]
  .split(',')
  .map(Number)
  .filter((x) => !Number.isNaN(x));

const calculateTimeToWait = (id) => {
  const result = id - (earliestTimestamp % id);
  if (result === id) return 0;
  return result;
};

const buses = busIDs.map((id) => ({
  id,
  timeToWait: calculateTimeToWait(id),
}));

const earliestBus = buses.reduce((acc, bus) =>
  acc.timeToWait < bus.timeToWait ? acc : bus
);

const { id, timeToWait } = earliestBus;
const result = id * timeToWait;
console.log(result);
