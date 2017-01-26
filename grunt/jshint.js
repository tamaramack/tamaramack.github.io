/**
 * jshint file for ndp-video-spa on 23-Mar-16.
 */
module.exports = {

    options: {
        reporter: require('jshint-stylish'),
        curly: true,
        eqeqeq: true,
        eqnull: true,
        undef: true,
        browser:true,
        laxcomma:true,
        loopfunc:true,
        devel:true,
        node:true,
        globals: {
            jquery: false,
            require:false,
            '$':false,
            'angular':false,
            '$ndp':false
        }
    },

    all: [
        'app/scripts/**/**/**.js'
    ]
};