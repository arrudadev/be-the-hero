module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'classes',
    'import-helpers'
  ],
  rules: {
    indent: ['error', 'tab'],
    'no-tabs': 'off',
    'linebreak-style': 'off',    
    'comma-spacing': 2,
    'no-multiple-empty-lines': [2, { 'max': 1 }],
    'no-trailing-spaces': 2,
    'classes/name': [2, 'class', 'method'],
    'class-methods-use-this': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
          newlinesBetween: 'always',
          groups: [
            '/^express/',
            '/^react/',
            'module',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off'
  },
};
