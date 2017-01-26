/**
 * sass file for ndp-video-spa on 16-Mar-16.
 */
module.exports = {
    options: {
        includePaths: [
            './bower_components/foundation-sites/scss',
            './bower_components/bourbon/app/assets/stylesheets'
        ]
    },
    dev: {
        options: {
            outputStyle: 'nested'
        },
        files: {
            'build/css/global.css': './app/styles/site.scss'
            , 'build/css/clean.css': './app/styles/clean.scss'
        }
    },
    prod: {
        options: {
            outputStyle: 'compressed',
            sourceMap: true
        },
        files: {
            'build/css/global.min.css': './app/styles/site.scss'
            , 'build/css/clean.min.css': './app/styles/clean.scss'
        }
    }
};