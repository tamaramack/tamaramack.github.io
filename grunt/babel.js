/**
 * babel file for tamaramack.github.io on 24-Mar-17.
 */
module.exports = function (grunt, opt) {
    return {
        options: {
            sourceMap: true,
            presets: ['latest']
        },
        concat: {
            files: [{
                expand: true,
                cwd: 'dist/concat/',
                src: ['**/*.js'],
                dest: 'dist/babel/',
                ext: '.js'
            }]
        },
        misc:{
            files:[{
                expand: true,
                cwd: 'app/scripts/misc/',
                src: ['*.js'],
                dest: 'dist/babel/misc/',
                ext: '.js'
            }]
        },
        common:{
            files:[{
                expand: true,
                cwd: 'app/scripts/common/',
                src: ['*.js'],
                dest: 'dist/babel/common/',
                ext: '.js'
            }]
        }
    }
};