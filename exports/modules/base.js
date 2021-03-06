/**
 * set-base-flags file for tamaramack.github.io on 13-Apr-17.
 */

/**
 * Set base parameters to all html pages
 * @param req
 * @param res
 * @param next
 */
module.exports = (() => {
  const _ = require('underscore');
  const packageJson = require('../../package.json');
  const utils = require('./utilities');

  return setBaseFlags;

  function setBaseFlags(ENV, PORT) {
    const { isTrue } = utils,
      { isOne } = utils;

    return BaseFlags;

    function BaseFlags(req, res, next) {
      const isPROD = (ENV === 'production');

      var user_agent = req.headers['user-agent'],
        _port = typeof PORT === 'string'
          ? `Pipe ${PORT}`
          : `Port ${PORT}`;
      var _ip = req.headers['x-forwarded-for']
        || req.connection.remoteAddress
        || req.socket.remoteAddress
        || req.connection.socket.remoteAddress;

      var _query = req.params || req.query || {};
      var datastring = JSON.parse(decodeURIComponent(res.locals.datastring || '{}'));

      res.locals.debug = isTrue(_query.debug);
      res.locals.mode = _query.mode || (res.locals.debug ? 3 : 0);
      res.locals.preset = _query.preset || false;

      res.locals.version = packageJson.version;
      res.locals.build = packageJson.config.build;
      res.locals.timestamp = packageJson.config.timestamp;
      res.locals.port = packageJson.config.port;

      var obj = {
        debug: isOne(_query.debug),
        mode: isOne(_query.mode),
        _package: packageJson,
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

      if (!obj.mode && (/[,*]/g).test(_query.mode)) obj.mode = _query.mode.replace(/[\s*]/g, '');

      _.extend(datastring, obj);
      res.locals.datastring = encodeURIComponent(JSON.stringify(datastring));
      next();
    }
  }
})();
