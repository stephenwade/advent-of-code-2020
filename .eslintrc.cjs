module.exports = {
  extends: ['eslint-config-airbnb-base', 'eslint-config-prettier'],
  parser: '@babel/eslint-parser',
  rules: {
    'import/extensions': ['error', 'always'],
    'no-console': 'off',

    // eslint-config-airbnb-base restricts for of loops, which we want to allow. we can't cherry pick it out, so we have to copy over the existing rules
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
};
