const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const loaddata = require('./loaddata');

require('./config/config');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//  Routes configuration
app.use(require('./routes/index'));

//  Conect to DB
mongoose.connect('mongodb://localhost:27017/afuentesdb', (err, res) => {
    if (err) throw err;
    console.log('Connected to data base')
});

// app.use(morgan('dev'));

app.listen(process.env.PORT);