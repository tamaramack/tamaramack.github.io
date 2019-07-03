/**
 * api js file created by Tamara G. Mack on 17-Apr-19 for tamaramack.github.io
 */
const express = require('express');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/test1', (req, res) => {
  res.send('API route section');
});
// define the about route
router.get('/test2', (req, res) => {
  res.send('API route page');
});

module.exports = router;
