/**
 * foundation js file created by Tamara G. Mack on 03-Apr-19 for tamaramack.github.io
 */
// Require non-modular scripts
require('motion-ui');

export default {
  install: function (context, options) {
    // you'll have this.$ anywhere in your vue project
    Object.defineProperties(context.prototype, {
      $: {
        value: import('jquery'),
        enumerable: true
      },
      _: {
        value: import('lodash'),
        enumerable: true
      }
    });
    // console.log('', context.prototype);
  }
};
