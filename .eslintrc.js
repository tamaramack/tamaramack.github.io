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
    'func-names': 0,
    'no-restricted-syntax': 0,
    'guard-for-in': 0,
    'consistent-return': 0, // Temporary
    'max-len': 0, // Temporary
    'no-shadow': 0, // Temporary
    'no-use-before-define': 0, // Temporary
    'no-empty': 0, // Temporary
    'no-unreachable': 0, // Temporary
    'nonblock-statement-body-position': 0, // Temporary
    'no-const-assign': 0, // Temporary
    'no-labels': 0,  // Temporary
    'class-methods-use-this': 0, // Temporary
    'prefer-destructuring': 0, // Temporary
    'no-unused-expressions': 0, // Temporary
    'no-restricted-globals': 0, // Temporary
    'no-useless-escape': 0, // Temporary
    'eqeqeq': 0, // Temporary
    'prefer-spread': 0, // Temporary
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
    'camelcase': 0,
    'radix': 0, // Temporary
    'no-var': 0,
    'vars-on-top': 0, // Temporary
    'one-var': [
      'warn',
      {
        uninitialized: 'always'
      }
    ],
    'no-unused-vars': 0,
    /*'no-use-before-define': [
      'warn',
      {
        functions: false
      }
    ],*/
    'no-bitwise': 0,
    'no-loop-func': 1,
    'no-param-reassign': 0,
    'no-continue': 0,
    'no-underscore-dangle': 0,
    'no-undef': 0,  // Temporary
    'no-mixed-operators': 1,
    'no-multi-assign': 1,
    'no-prototype-builtins': 0,
    //'no-useless-escape': 1,
    'no-plusplus': 0,
    'no-extra-boolean-cast': 0,
    'import/no-dynamic-require': 1,
    'import/extensions': 0, // Temporary
    'import/no-unresolved': 0, // Temporary
    'import/prefer-default-export': 0, // Temporary
    'import/named': 0, // Temporary
    'prefer-const': 0,
    'spaced-comment': 1,
    'object-shorthand': 0,
    'quotes': 0, // Temporary
    /*'quotes': [
      'warn',
      'single',
      'avoid-escape'
    ]*/
  }
};
