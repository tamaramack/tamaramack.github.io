const prod = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': prod ? ['error', {allow: ['error', 'warn']}] : 'off',
    'no-debugger': prod ? 'error' : 'off',
    'func-names': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'no-unreachable': 0, // Temporary
    'no-const-assign': 0, // Temporary
    'no-labels': 0,  // Temporary
    'class-methods-use-this': 0, // Temporary
    'prefer-destructuring': 0, // Temporary
    'consistent-return': 0,
    'no-shadow': 0,
    'curly': [
      'warn',
      'multi-line',
      'consistent'
    ],
    'comma-dangle': [
      'warn',
      'never'
    ],
    'comma-style': [
      'warn',
      'last',
      {
        exceptions: {
          ArrayExpression: true,
          ObjectExpression: true
        }
      }
    ],
    'quote-props': [
      'warn',
      'consistent-as-needed'
    ],
    'camelcase': 0,
    'no-var': 0,
    'vars-on-top': 0, // Temporary
    'one-var': [
      'warn',
      {
        uninitialized: 'always'
      }
    ],
    'no-unused-vars': 0,
    'no-use-before-define': 0,
    /*'no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false
      }
    ],*/
    'no-bitwise': 0,
    'no-param-reassign': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'no-prototype-builtins': 0,
    'no-plusplus': 0,
    'no-extra-boolean-cast': 0,
    'import/no-extraneous-dependencies': 0, // Temporary
    'import/extensions': 0, // Temporary
    'import/no-unresolved': 0, // Temporary
    'import/prefer-default-export': 0, // Temporary
    'import/named': 0, // Temporary
    'prefer-const': 0,
    'object-shorthand': 0,
    'quotes': [
      'warn',
      'single',
      'avoid-escape'
    ]
  }
};
