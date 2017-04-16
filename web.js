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

const setApp = require('./exports/setup.js');
const getFiles = require('./exports/get-files.js');
const renderPages = require('./exports/render-pages.js');

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

app.get('/', function (req, res) {
    res.locals.title = "Main";
    res.render('index');
});

if (ENV === 'development') {
    module.exports = app;
} else {
    const production = require('./exports/createServer.js');
    production((require('http')).createServer(app), app.get('port'));
}

function renderPartial(template, res) {
    res.render(template, {layout: false});
}

function setBaseFlags(req, res, next) {
    var user_agent = req.headers['user-agent'],
        _port = typeof PORT === 'string'
            ? 'Pipe ' + PORT
            : 'Port ' + PORT;
    var _ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var _query = req.query || {};
    var datastring = JSON.parse(res.locals.datastring || "{}");

    res.locals.debug = isTrue(_query.debug);
    res.locals.mode = _query.mode || (res.locals.debug ? 3 : 0);
    res.locals.preset = _query.preset || false;

    res.locals.version = _package.version;
    res.locals.build = _package.config.build;
    res.locals.timestamp = _package.config.timestamp;
    res.locals.port = _package.config.port;

    var obj = {
        debug: isOne(_query.debug),
        mode: isOne(_query.mode),
        //version: verifyString(_query.version),
        //preset: verifyString(_query.preset),
        //modules: configureModules(_query.modules),
        _package: _package,
        _environment: {
            env: ENV,
            ip: _ip,
            port: _port,
            userAgent: user_agent
        },
        _page: {
            timestamp: Date.now(),
            sourcePath: res.locals.sourcePath,
            configPath: res.locals.configPath
        }
    };

    if (!obj.mode && (/[,*]/g).test(_query.mode)) {
        obj.mode = _query.mode.replace(/[\s*]/g, '');
    }

    _.extend(datastring, obj);
    res.locals.datastring = encodeURIComponent(JSON.stringify(datastring));
    next();
}

function setMainFlags(req, res, next) {
    var datastring = JSON.parse(res.locals.datastring || "{}");
    var _query = req.query || {},
        obj = {};

    _.extend(datastring, obj);
    res.locals.datastring = JSON.stringify(datastring);
    next();
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

function requestJsonCallback(res, isCached) {
    return function (error, response, body) {
        if (isCached) {
            response = (response && response.value && response.value.response) || response;
        }
        var _json = {
            status: 'success',
            statusCode: response && response.statusCode,
            statusMessage: response && response.statusMessage,
            timestamp: Date.now()
        };
        console.log(_json);
        if (error) {
            console.log('\nERROR_TIMED_OUT', error.code === 'ETIMEDOUT');
            console.error(error);
            _json.status = 'error';
            _json.error = JSON.parse(JSON.stringify(error));
            _json.timestamp = Date.now();
        }

        if (body) _json.json = body;
        if (response) res.json(_json);
    };
}

function isLocalSPA(ipChain) {
    if (ENV === 'development') return true;
    if (PORT === 9005) return true;
    let len = ipChain.length;
    while (len--) {
        let _ip = (ipChain[len]).address || '';
        if ((_ip.split(':'))[0] === '172') {
            return true;
        }
    }

    return false;
}



function isTrue(obj) {
    if (typeof obj === 'undefined') return false;
    if (typeof obj === 'boolean') return obj;
    var _obj = parseInt(obj);
    if (isNaN(_obj))return obj === 'true';
    return _obj !== 0;
}

function isOne(obj, defValue) {
    if (typeof obj === 'undefined') return defValue || 0;
    var _obj = parseInt(obj);
    if (isNaN(_obj)) {
        _obj = 0;
        if (obj === true || obj === 'true') _obj = 1;
    }
    return _obj;
}

function verifyString(obj) {
    if (!!obj)return obj.toString();
    return false;
}
