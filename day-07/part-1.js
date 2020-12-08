// How many bag colors can eventually contain at least one shiny gold bag?

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

const applicableRules = [];

let currentRules = rules.filter(
  (rule) =>
    rule.innerBags.filter((innerBag) => innerBag.color === 'shiny gold')
      .length > 0
);
while (currentRules.length > 0) {
  applicableRules.push(...currentRules);
  const nextColors = new Set(currentRules.map((rule) => rule.outerColor));
  currentRules = rules.filter(
    (rule) =>
      rule.innerBags.filter((innerBag) => nextColors.has(innerBag.color))
        .length > 0
  );
}

const result = new Set(applicableRules.map((rule) => rule.outerColor)).size;
console.log(result);
