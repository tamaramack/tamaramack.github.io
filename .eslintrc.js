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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'curly': [
      'warn',
      'multi',
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
    'linebreak-style': 0,
    'global-require': 1,
    'eol-last': 1,
    'camelcase': 1,
    'radix': [
      'warn',
      'as-needed'
    ],
    'no-var': 0,
    'vars-on-top': 1,
    'one-var': [
      'warn',
      {
        uninitialized: 'always'
      }
    ],
    'no-unused-vars': [
      'warn',
      {
        vars: 'local',
        args: 'none'
      }
    ],
    'no-use-before-define': [
      'warn',
      {
        functions: false
      }
    ],
    'no-loop-func': 1,
    'no-param-reassign': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'no-undef': 1,
    'no-mixed-operators': 1,
    'no-multi-assign': 1,
    'no-prototype-builtins': 0,
    'no-useless-escape': 1,
    'no-plusplus': 0,
    'import/no-dynamic-require': 1,
    'prefer-const': 0,
    'spaced-comment': 1,
    'object-shorthand': 0,
    'no-extra-boolean-cast': 0,
    'quotes': [
      'warn',
      'single',
      'avoid-escape'
    ]
  }
};
