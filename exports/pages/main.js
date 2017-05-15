/**
 * main file for tamaramack.github.io on 14-Apr-17.
 */

var _ = require('underscore');
var express = require('express');

var router = express.Router();

router.get('/', setMainFlags, (req, res) => {
  res.locals.title = 'Main';
  res.render('index');
});

module.exports = router;

function setMainFlags(req, res, next) {
  const datastring = JSON.parse(decodeURIComponent(res.locals.datastring || '{}'));
  var _query = req.query || {};
  var obj = {};

  _.extend(datastring, obj);
  res.locals.datastring = encodeURIComponent(JSON.stringify(datastring));
  next();
}
