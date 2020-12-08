// How many individual bags are required inside your single shiny gold bag?

import readFile from '../read-file.js';

const parseBagText = (bagText) => {
  const [numberText, color] = bagText
    .replace(/ bags?/, '')
    .split(/(?<=[0-9]) /);
  return { number: Number(numberText), color };
};

const rules = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  const [outerColor, innerText] = line.split(' bags contain ');
  const innerBagsText = innerText
    .substring(0, innerText.length - 1)
    .split(', ');
  const innerBags =
    innerBagsText[0] === 'no other bags' ? [] : innerBagsText.map(parseBagText);
  rules.push({ outerColor, innerBags });
});

/*
rule example:
  "dotted turquoise bags contain 2 shiny green bags, 5 striped magenta bags."
  ->
  { outerColor: "dotted turquoise",
    innerBags: [
      { number: 2,
        color: "shiny green" },
      { number: 5,
        color: "striped magenta" }
    ] }
*/

const countBags = (outerColor) => {
  const thisRule = rules.filter((rule) => rule.outerColor === outerColor)[0];
  return thisRule.innerBags.reduce(
    (acc, innerBag) =>
      acc + innerBag.number + innerBag.number * countBags(innerBag.color),
    0
  );
};

const result = countBags('shiny gold');
console.log(result);
