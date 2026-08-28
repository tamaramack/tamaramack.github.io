module.exports = {
  presets: [
    [
      '@vue/app', {
        useBuiltIns: 'entry',
        corejs: '3.1'
      }]
  ],
  env: {
    production: {
      plugins: [
        ['transform-remove-console', { exclude: ['error', 'warn'] }]
      ]
    },
    test: {
      presets: [['@babel/preset-env']],
      plugins: [
        '@babel/plugin-transform-modules-commonjs'
      ]
    }
  }
};
