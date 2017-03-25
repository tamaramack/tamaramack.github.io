/**
 * babel file for tamaramack.github.io on 24-Mar-17.
 */
module.exports = function (grunt, opt) {
    return {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'dist/concat/',
                src: ['**/*.js'],
                dest: 'dist/babel/'
            }]
        }
    }
};