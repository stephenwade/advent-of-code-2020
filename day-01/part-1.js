// Find the two entries that sum to 2020; what do you get if you multiply them together?

import readFile from '../read-file.js';

const expenseReport = new Set();
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  expenseReport.add(Number(line));
});

for (const num of expenseReport) {
  const other = 2020 - num;
  if (expenseReport.has(other)) {
    console.log(num * other);
    break;
  }
}
