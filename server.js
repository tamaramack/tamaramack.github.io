/**
 * server.js js file created by Tamara G. Mack on 08-Apr-19 for tamaramack.github.io
 */
const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const configureAPI = require('./src/server/configure');

const app = express();
const { PORT = 9200, NODE_ENV } = process.env;

const isProd = (NODE_ENV === 'production');
const staticConf = {
  maxAge: isProd ? '1y' : 0,
  etag: !isProd
};

let folder = isProd ? 'dist' : 'dev-build';
folder = path.join(__dirname, folder);

// APIs
configureAPI(app);

// UI
// app.use(serveStatic(folder));
app.use(express.static(folder, staticConf));
app.use('/', history());

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});
