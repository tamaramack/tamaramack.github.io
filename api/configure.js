/**
 * configure js file created by Tamara G. Mack on 17-Apr-19 for tamaramack.github.io
 */
const bodyParser = require('body-parser');
const api = require('./.api');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use('/api', api);
};
