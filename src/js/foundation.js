/**
 * foundation js file created by Tamara G. Mack on 03-Apr-19 for tamaramack.github.io
 */
// Foundation core and utils - Best to import all of these
import jQuery from 'jquery';
import Lodash from 'lodash';
import Foundation from 'foundation-sites';
// Require non-modular scripts
require('motion-ui');
require('what-input');

export default initFoundation;

function initFoundation(Vue) {
  Vue.use({
    install: function (context, options) {
      // you'll have this.$ anywhere in your vue project
      Object.defineProperties(context.prototype, {
        $: {
          value: jQuery,
          enumerable: true
        },
        _: {
          value: Lodash,
          enumerable: true
        },
        $foundation_sites: {
          value: Foundation,
          enumerable: true
        }
      });

      console.log(context.prototype);
      context.prototype.$foundation_sites.addToJquery(context.prototype.$);
    }
  });
}
