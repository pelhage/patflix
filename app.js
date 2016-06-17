var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var configJwt = require('./config/jwt');
var configDB = require('./config/database');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080;
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
