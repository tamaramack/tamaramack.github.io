/**
 * aliases file for tamaramack.github.io on 1/9/2017.
 */

module.exports = {
  'default': {
    description: 'Default (development) build',
    tasks: ['dev', 'express', 'watch']
  },
  merge: {
    description: 'Merge and Update Scripts Files',
    tasks: ['clean', 'sass', 'concat', 'babel', 'uglify']
  },
  dev: {
    description: 'Development build',
    tasks: ['concurrent:first', 'concurrent:second', 'concurrent:third', 'concurrent:fourth']
  },
  prod: {
    description: 'Production build',
    tasks: []
  }
};