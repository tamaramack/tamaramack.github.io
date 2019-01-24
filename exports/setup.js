/**
 * setup file for tamaramack.github.io on 13-Apr-17.
 */
const utils = require('./utilities');
const path = require('path');

module.exports = Setup;

function Setup(express, app, dir) {
  const _path = utils.static_path(path, express, dir);
  const fs = require('fs');
  const livereload = require('connect-livereload');

  return setup;
  function setup(pug, ENV, PORT) {
    const isPROD = (ENV === 'production');
    app.set('port', PORT);
    app.set('views', './app/views');

    // app.engine('html', swig.renderFile);
    app.engine('pug', pug.renderFile);

    // app.set('view engine', 'html');
    app.set('view engine', 'pug');

    app.set('view cache', isPROD);
    app.set('case sensitive routing', false);
    app.locals.pretty = true;

    app.use(require('compression')());

    const paths = [
      {to: '/', dir: './app'}

      , {to: '/dist', dir: './dist'}
      , {to: '/js', dir: './build/js'}
      , {to: '/css', dir: './build/css'}
      , {to: '/temp', dir: './build/temp'}

      , {to: '/data', dir: './app/data'}
      , {to: '/views', dir: './app/views'}
      , {to: '/pages', dir: './app/pages'}
      , {to: '/scripts', dir: './app/scripts'}
      , {to: '/styles', dir: './app/styles'}

      , {to: '/libs', dir: './bower_components'}
      , {to: '/node', dir: './node_modules'}
    ];

    let i = paths.length;
    while (i--) app.use((paths[i]).to, _path((paths[i]).dir));

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    if (!isPROD)
      app.use(livereload());
    else
      app.use('/app', _path('./app'));

    return {
      env: ENV,
      port: PORT
    };
  }
}
