const express = require('express');
const app = module.exports = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const configJwt = require('./config/jwt');
const configDB = require('./config/database');

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080;
mongoose.connect(configDB.url); // connect to DB
app.set('authSecret', configJwt.secret);

// Use body parser to process POSTS and URL params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Morgan to log requests
app.use(morgan('dev'));

// Set Up View Engine + Static Directory
app.set('view engine', 'pug');
app.use('/dist', express.static('dist'));

// routes
require('./routes.js')(app);

// launch
app.listen(port);
console.log('The Magic happens on port ' + port);
