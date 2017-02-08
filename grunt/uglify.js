/**
 * uglify file for ndp-video-spa on 16-Mar-16.
 */
module.exports = function (grunt, opt) {
    var scriptPath = 'app/scripts';
    var allfiles = function (cwd, dest, deep) {
        deep = !!deep;
        return {
            expand: true,
            cwd: cwd,
            src: deep ? ['**/*.js'] : ['*.js'],
            dest: dest,
            ext: '.js'
        }
    };
    var debugOpt = {
            mangle: false,
            beautify: true,
            compress: false,
            preserveComments: 'all',
            banner: '<%= banner %>\n'
        },
        minOpt = {
            screwIE8: true,
            sourceMap: true,
            mangle: true,
            compress: {
                dead_code: true,
                global_defs: {
                    "$DEBUG": false
                }
            },
            banner: '<%= banner %>'
        };

    return {
        debugAll: {
            options: debugOpt,
            files: [
                allfiles('dist/', 'build/js/debug')
            ]
        },
        all: {
            options: minOpt,
            files: [
                allfiles('dist/', 'build/js', true)
            ]
        }
    }
};