/**
 * server.js js file created by Tamara G. Mack on 08-Apr-19 for tamaramack.github.io
 */
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
// const serveStatic = require('serve-static');

let results = dotenv.config();
if (results.error) {
  console.error(results.error);
} else {
  console.log(results.parsed);
}

const history = require('connect-history-api-fallback');
const configureAPI = require('./src/server/configure');

const app = express();
const { PORT = 9200, NODE_ENV = 'development' } = process.env;

const isProd = (NODE_ENV === 'production');
const isDev = (NODE_ENV === 'development');
const staticConf = {
  maxAge: isProd ? '1m' : 0,
  etag: !isProd
};

let folder = !isDev ? 'dist' : 'dev-build';
folder = path.join(__dirname, folder);

// APIs
configureAPI(app);

// UI
// app.use(serveStatic(folder));
app.use(express.static(folder, staticConf));
app.use('/', history());

app.listen(PORT, () => {
  console.log(`App running on port ${PORT} on ${NODE_ENV} environment`)
});
