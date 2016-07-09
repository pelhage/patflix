var Library = require('../models/library');
var User = require('../models/user');
var Hashids = require('hashids');
var hashids = new Hashids("NaCl for patflix video player", 0);
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  // Save a New Library
  create: function(req, res) {
    var newLibrary = new Library();
    console.log('Trying to create new library.. \n');
    newLibrary.libraryId = hashids.encodeHex(newLibrary._id);
    newLibrary.featured = req.body.featured;
    newLibrary.categories = req.body.categories;
    newLibrary.videos = req.body.videos;
    newLibrary.numOfVideos = req.body.videos.length;
    newLibrary.ownerId = ObjectID(req.user._id);

    newLibrary.save(function(err) {
      if (err) { throw err; }
    });

    User.find({ 'auth.email': req.user.auth.email }, function(err, user) {
      user.libraries.push(newLibrary);
    });

    res.send(newLibrary);
  },

  // Get a user library
  render: function(req, res) {
    var libID = hashids.decodeHex(req.params.id);
    Library.findOne({'_id': new ObjectID(libID)}, function(err, doc) {
      res.send(doc);
    });
  },

  // Show a user's libraries
  showAll: function(req, res) {
    User.find({ 'auth.email': req.user._id }, function(err, user) {
      res.send(user.libraries);
    });
  }

};
