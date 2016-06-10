var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var Hashids = require('hashids');

// for parsing application/json
app.use(bodyParser.json());


// Set Up View Engine + Static Directory
app.set('view engine', 'pug');
app.use('/dist', express.static('dist'));


app.use(express.static('dist'));
app.get('/', function(req, res) {
  res.render('library');
});
app.listen(3000);