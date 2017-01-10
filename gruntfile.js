/**
 * gruntfile.js file for tamaramack.github.io on 1/9/2017.
 */
module.exports = function (grunt) {
    var path = require('path');
    var package = require(path.resolve(__dirname, 'package.json'));

    var options = {
        configPath: path.join(process.cwd(), 'grunt'),

        init: true,

        data: {
            path: path,
            build_num: process.env.BUILD_NUMBER || 0,
            port: package.config.port,
            version: package.version,
            banner: '/*! <%= package.name %> - <%= package.version %> - '
            + 'Last Build: <%= grunt.template.today("yyyymmddHHMM") %> */'
        },

        loadGruntTasks: {
            config: require('./package.json'),
            scope: ['dependencies', 'devDependencies']
        }
    };

    require('time-grunt')(grunt);

    require('load-grunt-config')(grunt, options);

    var request = require('request');
    var async = require('async');
    var beautify = require('js-beautify').js_beautify;
    grunt.registerMultiTask('asyncfetch', function () {
        var done = this.async();
        var options = this.options({
            separator: '\n'
        });
        async.eachSeries(this.files, function (file, next) {
            var out = '';
            var out_beautified = '';
            var out_name = [];
            //console.log(file);
            async.eachSeries(file.orig.src, function (url, nextUrl) {
                grunt.log.writeln('Downloading ' + url);
                request(url).on('data', function (data) {
                    out += data.toString();
                    out_beautified += beautify(out, {
                        indent_size: 4,
                        max_preserve_newlines: 5
                    });
                }).on('end', function () {
                    out += options.separator;
                    out_beautified += options.separator;
                    if (file.orig.process) {
                        out_name.push(file.process(out, file.dir));
                    } else {
                        var arr = url.split('/');
                        var filename = arr[arr.length - 1];
                        out_name.push(filename);
                    }
                    nextUrl();
                });
            }, function () {
                var dir = file.dir;
                if (dir.substring(dir.length - 1) !== '/') dir += '/';
                for (var i = 0; i < out_name.length; i++) {
                    grunt.file.write(dir + out_name[i], out_beautified);
                    grunt.log.ok('Wrote ' + dir + out_name[i] + '.');
                }
                next();
            });
        }, done);
    });
};