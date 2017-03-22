/**
 * concat file for ndp-video-spa on 16-Mar-16.
 */
module.exports = function (grunt, opt) {
    var path = 'app/scripts/',
        data = path + 'data/',
        base = path + 'base/',
        configuration = data + "configuration/",
        console = data + 'console/',
        moduleMgmt = data + 'module/',
        utils = data + "utils/";

    var bower = 'bower_component/';

    return {
        options: {
            separator: '\n',
            process: function (src, filepath) {
                return '\n/**\n * SOURCE: ' + filepath + '\n*/\n' + src;
            }
        },
        base: {
            files: {
                'dist/base.js': [base + '**.js']
                , 'dist/base/events.js': [base + 'events/**.js']
                , 'dist/base/logs.js': [base + 'logs/**.js']
                , 'dist/base/models.js': [base + 'models/**.js']
                , 'dist/base/parameters.js': [base + 'parameters/**.js']
                , 'dist/base/utilities.js': [base + 'utilities/**.js']
            }
        },
        configuration: {
            files: {
                'dist/global.js': ['app/scripts/**.js']
            }
        }
    }
};