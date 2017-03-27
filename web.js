/**
 * web.js file for tamaramack.github.io on 1/9/2017.
 * https://codeforgeek.com/2016/04/continuous-integration-deployment-jenkins-node-js/
 * https://pugjs.org/api/reference.html
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
var pug = require('pug');
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
//app.set('view engine', 'pug');
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

app.get('/test', function (req, res) {
    res.locals.package = JSON.stringify(_package);

    res.locals.version = _package.version;
    res.locals.build = _package.config.build;
    res.locals.timestamp = _package.config.timestamp;
    res.locals.port = _package.config.port;

    //res.render('hook');
    var str = '<h1>';
    str += 'Version:&nbsp' + _package.version;
    str += '</h1><h2>';
    str += 'Build:&nbsp' + _package.config.build;
    str += '</h2><h3>';
    str += 'Build Date:&nbsp' + new Date(parseInt(_package.config.timestamp));
    str += '</h3>';
    res.send(str);
});

app.get('/help', function (req, res) {
});

app.get('/', setBaseFlags, function (req, res) {
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

function renderPartial(template, res){
    res.render(template, {layout:false});
}

function setBaseFlags(req, res, next){
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

    var obj ={
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
    res.locals.datastring = JSON.stringify(datastring);
    next();
}

function setMainFlags(req,res, next){
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

function getGeoLocation(req, res, next) {
    var geolocation = require('geolocation');
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        next();
    }

    function success(position) {
        console.log(position);
        var crd = position.coords;
        res.query.geolocation = {
            lat: crd.latitude,
            long: crd.longitude,
            accuracy: crd.accuracy
        };

        next();
    }

    geolocation.getCurrentPosition(success, error, options);
}

function sendEmailerNotifier(req, res) {
    //https://github.com/andris9/Nodemailer
    var date = new Date();
    var datetime = date.toDateString() + ' ' + date.toTimeString();
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nd.vidreq@gmail.com",
            pass: "nbcnewsvideo"
        }
    });

    var mailOptions = {
        from: "nd.vidreq@gmail.com", // sender address
        to: "nd.vidreq@gmail.com", // list of receivers
        subject: "This is a Test: " + datetime, // Subject line
        text: "Hello world, This is test.  Please ignore.", // plaintext body
        html: req.query.html
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + info.response);
            res.end("sent");
        }
    });
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
