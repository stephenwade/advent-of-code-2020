// What is the product of the three entries that sum to 2020?

import readFile from '../read-file.js';

const expenseReport = new Set();
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  expenseReport.add(Number(line));
});

for (const num of expenseReport) {
  const target = 2020 - num;
  for (const num2 of expenseReport) {
    const num3 = target - num2;
    if (expenseReport.has(num3)) {
      console.log(num * num2 * num3);
      process.exit(0);
    }
  }
}
