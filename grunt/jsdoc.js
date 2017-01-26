/**
 * jsdoc file for ndp-video-spa on 17-May-16.
 * https://www.npmjs.com/package/grunt-jsdoc
 * http://usejsdoc.org/
 */

module.exports = function (grunt, opt) {

    return {
        dist:{
            src:['scripts/**/*.js'],
            options:{
                destination:'doc'
            }
        }
    }
};