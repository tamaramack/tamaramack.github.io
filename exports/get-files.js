/**
 * getFiles file for tamaramack.github.io on 14-Apr-17.
 */

module.exports = function(directoryPath, app) {
  const results = {};

  var files = [
    '/favicon.ico'
    , '/npm-debug.log'
  ];

  let i = files.length;
  while (i--) app.get(files[i], (req, res) => { res.sendFile(directoryPath + files[i]); });

  app.get('/test', (req, res) => {
    const _package = require('../package.json');
    res.locals.package = JSON.stringify(_package);

    res.locals.version = _package.version;
    res.locals.build = _package.config.build;
    res.locals.timestamp = _package.config.timestamp;
    res.locals.port = _package.config.port;

    // res.render('hook');
    var str = '<h1>';
    str += `Version:&nbsp${_package.version}`;
    str += '</h1><h2>';
    str += `Build:&nbsp${_package.config.build}`;
    str += '</h2><h3>';
    str += `Build Date:&nbsp${new Date(parseInt(_package.config.timestamp))}`;
    str += '</h3>';
    res.send(str);
  });

  return results;
};
