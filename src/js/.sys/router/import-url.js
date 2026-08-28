/**
 * import-url js file created by Tamara G. Mack on 25-Sep-19 for
 * tamaramack.github.io
 */

export default {
  _async: url => () => import(`@/${url}`),
  home: url => () => import(/* webpackChunkName: "home" */ `@/${url}`),
  about: url => () => import(/* webpackChunkName: "about" */ `@/${url}`),
  projects: url => () => import(/* webpackChunkName: "projects" */ `@/${url}`)
};
