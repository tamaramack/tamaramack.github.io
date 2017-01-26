/**
 * concurrent file for ndp-video-spa on 23-Mar-16.
 */
module.exports = {

    options: {
        limit: 4
    },

    first: [
        //'jshint',
        'clean'
    ],
    second: [
        'sass',
        'concat'
    ],

    third: [
        'uglify'
    ]
};