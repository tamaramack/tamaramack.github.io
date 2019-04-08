/**
 * server.js js file created by Tamara G. Mack on 08-Apr-19 for tamaramack.github.io
 */
const express = require('express');
const serveStatic = require("serve-static");
const path = require('path');

const folder = (process.env.NODE_ENV === 'production') ? 'dist' : 'dev-build';

app = express();
app.use(serveStatic(path.join(__dirname, folder)));
const port = process.env.PORT || 9200;
app.listen(port);
