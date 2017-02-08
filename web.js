/**
 * web.js file for tamaramack.github.io on 1/9/2017.
 * https://codeforgeek.com/2016/04/continuous-integration-deployment-jenkins-node-js/
 */
console.log("Initiate web.js");

var server;
var livereload = require('connect-livereload');
var express = require("express");
var compression = require('compression');
var http = require("http");
var path = require("path");
var fs = require('fs');

var request = require('request');
var LRU = require('lru-cache');
var public_lru = new LRU();
var private_lru = new LRU();
var request_cache = require('request-caching');
var cache = new request_cache.MemoryCache(public_lru, private_lru);
var app = express();

var _ = require('underscore');
var nodemailer = require('nodemailer');
var swig = require('swig');
var sass = require('node-sass');
var _package = require('./package.json');


var PORT = normalizePort(process.env.PORT || _package.config.port);
var ENV = process.env.NODE_ENV || app.get('env') || 'development';
//var BUILD = process.env.BUILD_NUMBER || 0;

console.log(sass.info);
swig.setDefaults({cache: false});

app.set('port', PORT);
app.set('views', __dirname + '/app/views');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
app.set('case sensitive routing', false);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

if (ENV === 'development') {
    app.use(livereload());
} else {
    app.use('/app', _path('/app'));
}

app.get('/npm-debug.log', function (req, res) {
    res.sendFile(__dirname + '/npm-debug.log');
});

app.get('/', function (req, res) {
    res.locals.package = JSON.stringify(_package);

    res.locals.version = _package.version;
    res.locals.build = _package.config.build;
    res.locals.timestamp = _package.config.timestamp;
    res.locals.port = _package.config.port;

    //res.render('hook');
    var str = '<h1>';
    str += 'Version:&nbsp' + _package.version;
    str += '</h1><h2>'
    str += 'Build:&nbsp' + _package.config.build;
    str += '</h2><h3>'
    str += 'Build Date:&nbsp' + new Date(parseInt(_package.config.timestamp));
    str += '</h3>';
    res.send(str);
});

if (ENV === 'development') {
    module.exports = app;
} else {
    server = http.createServer(app);
    server.listen(app.get('port'));
    server.on('error', onError);
    server.on('listening', onListening);
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

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') throw error;

    var bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    if (!server)return;
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
