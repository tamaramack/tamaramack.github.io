/**
 * web.js file for tamaramack.github.io on 1/9/2017.
 * https://codeforgeek.com/2016/04/continuous-integration-deployment-jenkins-node-js/
 * https://pugjs.org/api/reference.html
 * https://nodejs.org/api/modules.html
 */
console.log('Initiate web.js');

var server;
const http = require('http');
const express = require('express');
const pug = require('pug');
const production = require('./exports/create-server');

const dotenv = require('dotenv');
const LRU = require('lru-cache');
const request_cache = require('request-caching');
const _package = require('./package.json');

const app = express();
const public_lru = new LRU();
const private_lru = new LRU();
const cache = new request_cache.MemoryCache(public_lru, private_lru);

dotenv.load();

const utils = require('./exports/utilities');
const setApp = require('./exports/setup')(express, app, __dirname);
const getFiles = require('./exports/get-files')(express, app, __dirname);
const renderPages = require('./exports/render-pages');

const PORT = utils.normalizePort(process.env.PORT || _package.config.port);
const ENV = process.env.NODE_ENV || app.get('env') || 'development';

var _ = require('underscore');
// var swig = require('swig');
var sass = require('node-sass');

console.log(sass.info);
// swig.setDefaults({cache: isPROD});

setApp(pug, ENV, PORT);
getFiles(app, _package);
renderPages(app, ENV, PORT);

if (ENV === 'development') module.exports = app;
else production(http.createServer(app), PORT);

function renderPartial(template, res) {
  res.render(template, {layout: false});
}

function configureModules(_moduleObject) {
  // set modules
  var modules = {
    assets: 1
    , info: 1
    , links: 1
    , log: 1
    , panel: 1
    , player: 1
  };

  var arrModules = false;
  if (_.isString(_moduleObject))
    arrModules = _moduleObject.split(',');
  else if (_.isArray(_moduleObject))
    arrModules = _moduleObject;

  if (arrModules)
    for (var _prop in modules) {
      if (_.contains(arrModules, _prop)) continue;
      modules[_prop] = 0;
    }

  return modules;
}
