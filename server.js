var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = require('mongodb').ObjectID;
var Hashids = require('hashids');

var hashids = new Hashids("NaCl for patflix video player", 0);



// for parsing application/json
app.use(bodyParser.json());


// Global database variables
var MONGODB_URI = 'mongodb://localhost:27017/massdrop';
var db;

// Initialize connection
mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
  if (err) { throw err; }
  
  db = database;
  libs = db.collection('libraries');
  app.listen(3000);
  console.log('Listening on port 3000');
});
 
app.use(express.static('dist'));
app.get('/', express.static(__dirname + '/'));


app.post('/l', function(req, res) {
  console.log(req.body);
  console.log(req.headers);
  var lib = req.body.library;
  var pwd = req.body.password;
  libs.insert({library: lib}, function(err, result) {
    console.log('Did it');
    console.log(lib);
    console.log(pwd);
    res.send(hashids.encodeHex(result.ops[0]._id));
  });
});


// Add featured
// app.put('/l/:id/category', function(req, res) {
//   // get library's collection
//   // get 
//   if (req.body.addCategory === true) {
//     // Add a category
//   } else {
//     // Remove a category
//   }
// });

// Remove featured

// Add Categories
// Remove Categories

// 

// Get a user library
app.get('/l/:id', function(req, res) {
  var libID = hashids.decodeHex(req.params.id);
  libs.findOne({'_id': new ObjectID(libID)}, function(err, doc) {
    res.send(doc);
  });
});