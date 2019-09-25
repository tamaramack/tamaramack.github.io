/**
 * index js file created by Tamara G. Mack on 24-Sep-19 for tamaramack.github.io
 */
/**
 * api js file created by Tamara G. Mack on 17-Apr-19 for tamaramack.github.io
 */
const express = require('express');
const substring = require('./substring');

module.exports = (() => {
  const router = express.Router();
  let baseURL = '';

  // middleware that is specific to this router
  router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
  });

// define the home page route
  getRoute('/test1', (req, res) => {
    res.send('API route section');
  });
// define the about route
  getRoute('/test2', (req, res) => {
    res.send('API route page');
  });

  baseURL = substring.baseUrl;
  for (let link in substring)
    if (link !== 'baseUrl') getRoute(link, substring[ link ]);

  return router;
  function getRoute(url, callback) {
    router.get(`${ baseURL }${ url }`, callback);
  }
})();
