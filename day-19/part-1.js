// How many messages completely match rule 0?

import readFile from '../read-file.js';

const parseRuleContent = (ruleContent) => {
  if (ruleContent.includes('"')) {
    return {
      type: 'literal',
      string: ruleContent.replaceAll('"', ''),
    };
  }

  if (ruleContent.includes(' | ')) {
    const [left, right] = ruleContent
      .split(' | ')
      .map((side) => side.split(' ').map(Number));
    return {
      type: 'split',
      left,
      right,
    };
  }

  const subRules = ruleContent.split(' ').map(Number);
  return {
    type: 'subrules',
    subRules,
  };
};

const parseRule = (rule) => {
  const [idString, ruleContent] = rule.split(': ');
  const id = Number(idString);
  return { id, ...parseRuleContent(ruleContent) };
};

const rules = [];
const messages = [];

let parsingMode = 'rules';
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  if (line.length) {
    if (parsingMode === 'rules') {
      const rule = parseRule(line);
      rules[rule.id] = rule;
    } else messages.push(line);
  } else parsingMode = 'messages';
});

const ruleToRegex = (ruleId) => {
  const rule = rules[ruleId];

  switch (rule.type) {
    case 'split':
      return `(?:${[rule.left, rule.right]
        .map((side) => side.map(ruleToRegex).join(''))
        .join('|')})`;

    case 'subrules':
      return rule.subRules.map(ruleToRegex).join('');

    default:
      // case 'literal':
      return rule.string;
  }
};

const rule0Regex = new RegExp(`^${ruleToRegex(0)}$`);
const doesStringMatchRule0 = (string) => string.match(rule0Regex);

const result = messages.reduce(
  (acc, m) => (doesStringMatchRule0(m) ? acc + 1 : acc),
  0
);
console.log(result);
