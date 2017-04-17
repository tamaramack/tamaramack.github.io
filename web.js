/**
 * web.js file for tamaramack.github.io on 1/9/2017.
 * https://codeforgeek.com/2016/04/continuous-integration-deployment-jenkins-node-js/
 * https://pugjs.org/api/reference.html
 * https://nodejs.org/api/modules.html
 */
console.log("Initiate web.js");

var server;
const livereload = require('connect-livereload');
const express = require("express");
const pug = require('pug');
const app = express();
const dotenv = require('dotenv');
dotenv.load();

const request = require('request');
const LRU = require('lru-cache');
const public_lru = new LRU();
const private_lru = new LRU();
const request_cache = require('request-caching');
const cache = new request_cache.MemoryCache(public_lru, private_lru);

const setApp = require('./exports/setup');
const getFiles = require('./exports/get-files');
const renderPages = require('./exports/render-pages');

var _ = require('underscore');
//var swig = require('swig');
var sass = require('node-sass');
var _package = require('./package.json');

console.log(sass.info);
//swig.setDefaults({cache: isPROD});

const resultSet = setApp(express, app, pug),
    PORT = resultSet.port,
    ENV = resultSet.env;
var isPROD = (ENV === 'production');

const resultGet = getFiles(__dirname, app);

const resultRender = renderPages(app, ENV);

app.get('/help', function (req, res) {
    res.render('hook');
});

if (ENV === 'development') {
    module.exports = app;
} else {
    const production = require('./exports/create-server.js');
    production((require('http')).createServer(app), app.get('port'));
}

function renderPartial(template, res) {
    res.render(template, {layout: false});
}

function configureModules(_moduleObject) {
    //set modules
    var modules = {
        assets: 1
        , info: 1
        , links: 1
        , log: 1
        , panel: 1
        , player: 1
    };

    var arrModules = false;
    if (_.isString(_moduleObject)) {
        arrModules = _moduleObject.split(',');
    } else if (_.isArray(_moduleObject)) {
        arrModules = _moduleObject;
    }
    if (arrModules) {
        for (var _prop in modules) {
            if (_.contains(arrModules, _prop))continue;
            modules[_prop] = 0;
        }
    }

    return modules;
}
