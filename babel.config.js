module.exports = {
  presets: [
    [
      '@vue/app', {
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true
        }
      }]
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread'
  ]
};
