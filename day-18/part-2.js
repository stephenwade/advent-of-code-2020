/*
The rules of these math expressions are the same as regular math, except
that the rules of operator precedence have changed. Rather than evaluating
multiplication before addition, addition is evaluated before multiplication.

Evaluate the expression on each line of the homework; what is the sum of the
resulting values?
*/

import readFile from '../read-file.js';

const expressions = [];
await readFile(new URL('./input.txt', import.meta.url), (line) => {
  expressions.push(line);
});

/*
Shunting-yard algorithm and RPN evaluator modified from
https://eddmann.com/posts/implementing-the-shunting-yard-algorithm-in-javascript/
*/

const yard = (infix) => {
  const ops = { '+': 2, '*': 1 };
  const peek = (a) => a[a.length - 1];
  const stack = [];

  return infix
    .split('')
    .reduce((output, token) => {
      if (parseFloat(token)) {
        output.push(token);
      }

      if (token in ops) {
        while (peek(stack) in ops && ops[token] <= ops[peek(stack)])
          output.push(stack.pop());
        stack.push(token);
      }

      if (token === '(') {
        stack.push(token);
      }

      if (token === ')') {
        while (peek(stack) !== '(') output.push(stack.pop());
        stack.pop();
      }

      return output;
    }, [])
    .concat(stack.reverse())
    .join(' ');
};

const rpn = (ts, s = []) => {
  ts.split(' ').forEach((t) =>
    // eslint-disable-next-line no-eval, eqeqeq
    s.push(t == +t ? t : eval(s.splice(-2, 1)[0] + t + s.pop()))
  );
  return s[0];
};

const result = expressions
  .map(yard)
  .map((ts) => rpn(ts))
  .reduce((acc, n) => acc + n);
console.log(result);
