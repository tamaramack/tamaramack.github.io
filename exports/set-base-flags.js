/**
 * set-base-flags file for tamaramack.github.io on 13-Apr-17.
 */
const _ = require('underscore');
const utils = require('./exports/utilities.js');

module.exports = function setBaseFlags(req, res, next) {
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

    res.locals.debug = utils.isTrue(_query.debug);
    res.locals.mode = _query.mode || (res.locals.debug ? 3 : 0);
    res.locals.preset = _query.preset || false;

    res.locals.version = _package.version;
    res.locals.build = _package.config.build;
    res.locals.timestamp = _package.config.timestamp;
    res.locals.port = _package.config.port;

    var obj = {
        debug: utils.isOne(_query.debug),
        mode: utils.isOne(_query.mode),
        //version: utils.verifyString(_query.version),
        //preset: utils.verifyString(_query.preset),
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
};