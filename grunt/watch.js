/**
 * watch file for ndp-video-spa on 16-Mar-16.
 */
module.exports = {

    options: {
        /**
         * Uncomment `livereload: true` if you want to use it. More details and config options can be found here:
         *   https://github.com/gruntjs/grunt-contrib-watch#optionslivereload
         *
         * The easiest way to get Livereload working is to install the browser extension. Details here:
         *   http://feedback.livereload.com/knowledgebase/articles/86242
         */
        //livereload: true,
        //spawn: false
    },
    reload: {
        files: [
            'app/views/**/**/**.html'
            , 'app/*.js'
            , 'build/js/**/**/**/**.js'
            , 'build/css/**.css'
        ],
        options: {
            livereload: true
        }
    },

    concat: {
        files: [
            'app/scripts/**.js'
        ],
        tasks: [
            'newer:concat'
        ]
    },

    script: {
        files: [
            'dist/**.js'
        ],
        tasks: [
            'newer:uglify'
        ]
    },

    styles: {
        files: [
            'app/styles/**/**.scss'
        ],
        tasks: [
            'sass'
        ]
    }
};