var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// Configuration
mongoose.connect(configDB.url); // connect to DB

require('./config/passport')(passport);

// Set up App
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

// Set Up View Engine + Static Directory
app.set('view engine', 'pug');
app.use('/dist', express.static('dist'));

// Required for passport
app.use(session({ secret: 'patrickisthebest'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes
require('./routes.js')(app, passport);

// launch
app.listen(port);
console.log('The Magic happens on port ' + port);