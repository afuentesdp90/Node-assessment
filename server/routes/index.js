const express = require('express');
const app = express();

app.use(require('./clients'));
app.use(require('./polices'));
app.use(require('./login'));

module.exports = app;