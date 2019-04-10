/**
 * getFiles file for tamaramack.github.io on 14-Apr-17.
 */
const utils = require('./utilities');

module.exports = GetFiles;

function GetFiles(path, express, dir) {
  const _path = utils.static_path(path, express, dir);

  return getFiles;
  function getFiles(app, _package) {
    const results = {};

    var files = [
      '/favicon.ico'
      , '/npm-debug.log'
    ];

    let file,
      filepath,
      i = files.length;
    while (i--) {
      file = files[i];
      filepath = `../${file}`;
      app.get(file, (req, res) => { res.sendFile(filepath); });
    }

    app.get('/test', (req, res) => {
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
  }
}
