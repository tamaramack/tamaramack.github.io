/**
 * setup file for tamaramack.github.io on 13-Apr-17.
 */

module.exports = function () {
    const express = require("express");
    const compression = require('compression');
    const http = require("http");
    const path = require("path");
    const fs = require('fs');

    const request = require('request');
    const request_cache = require('request-caching');
    const cache = new request_cache.MemoryCache(public_lru, private_lru);
    const app = express();

    const livereload = require('connect-livereload');
    const packageJson = require('./package.json');
    const PORT = normalizePort(process.env.PORT || packageJson.config.port);
    const ENV = process.env.NODE_ENV || app.get('env') || 'development';
    const isPROD = (ENV === 'production');

    app.set('port', PORT);
    app.set('views', __dirname + '/app/views');

    //app.engine('html', swig.renderFile);
    app.engine('pug', pug.renderFile);

    //app.set('view engine', 'html');
    app.set('view engine', 'pug');

    app.set('view cache', isPROD);
    app.set('case sensitive routing', false);
    app.locals.pretty = true;

    app.use(compression());

    app.use('/', _path('/app'));
    app.use('/dist', _path('/dist'));
    app.use('/js', _path('/build/js'));
    app.use('/css', _path('/build/css'));
    app.use('/temp', _path('/build/temp'));

    app.use('/data', _path('/app/data'));
    app.use('/views', _path('/app/views'));
    app.use('/pages', _path('/app/pages'));
    app.use('/scripts', _path('/app/scripts'));
    app.use('/styles', _path('/app/styles'));

    app.use('/libs', _path('/bower_components'));
    app.use('/node', _path('/node_modules'));

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    if (ENV === 'development') {
        app.use(livereload());
    } else {
        app.use('/app', _path('/app'));
    }


    function _path(url) {
        return express.static(path.join(__dirname, url));
    }

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) return val;
        if (port >= 0) return port;
        return false;
    }

};