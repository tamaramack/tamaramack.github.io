/**
 * server.js js file created by Tamara G. Mack on 08-Apr-19 for tamaramack.github.io
 */
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const opn = require('open');

let results = dotenv.config();
if (results.error) {
  console.error(results.error);
} else {
  console.log(results.parsed);
}

const history = require('connect-history-api-fallback');
const configureAPI = require('./api/configure');
const packageJson = require('./package.json');

const app = express();
const {
  PORT = packageJson.config.port,
  NODE_ENV = 'production'
} = process.env;

const isProd = (NODE_ENV === 'production');
const isDev = (NODE_ENV === 'development');
const staticConf = {
  maxAge: isProd ? '1m' : 0,
  etag: !isProd
};

let folder = !isDev ? 'dist' : 'devdist';
folder = path.join(__dirname, folder);

// APIs
configureAPI(app);

// UI
app.use(express.static(folder, staticConf));
app.use('/', history());

app.listen(PORT, async () => {
  await opn(`http://localhost:${PORT}`);
  console.log(`App running on port ${PORT} on ${NODE_ENV} environment`)
});
