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
    console.log('Creating new library, req.body:', req.body);
    newLibrary.libraryId = hashids.encodeHex(newLibrary._id);
    newLibrary.size = req.body.size;
    newLibrary.vidsAdded = req.body.vidsAdded;
    newLibrary.name = req.body.name;
    newLibrary.videos = req.body.videos;
    newLibrary.featuredVideos = req.body.featuredVideos;
    newLibrary.allCategories = req.body.allCategories;
    newLibrary.ownerId = ObjectID(req.user._id);
    newLibrary.save(function(err) {
      if (err) { throw err; }
    });

    User.findOne({ 'auth.email': req.user.auth.email }, function(err, user) {
      user.libraries[newLibrary.libraryId] = newLibrary;
      user.save(function(err) {
        if (err) { throw err; }
      })
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
