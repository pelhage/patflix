var Library = require('../models/library');
var User = require('../models/user');
var Hashids = require('hashids');
var hashids = new Hashids("NaCl for patflix video player", 0);
var ObjectID = require('mongodb').ObjectID;

module.exports = {

  // Save a New Library
  create: function(req, res) {
    console.log('Invoked [create] Library endpoint. \n');
    console.log('[create] req.body:', req.body);

    var newLibrary = new Library();
    newLibrary.libraryId = hashids.encodeHex(newLibrary._id);
    newLibrary.size = req.body.size;
    newLibrary.vidsAdded = req.body.vidsAdded;
    newLibrary.libName = req.body.libName;
    newLibrary.videos = req.body.videos;
    newLibrary.featuredVideos = req.body.featuredVideos;
    newLibrary.allCategories = req.body.allCategories;
    newLibrary.ownerId = ObjectID(req.user._id);

    newLibrary.save(function(err) {
      if (err) { throw err; }

      User.findOne({ 'auth.email': req.user.auth.email }, function(err, user) {
        console.log('user when creating lib: ', user);
        var copy = Object.assign({}, user.libraries);
        copy[newLibrary.libraryId] = newLibrary;
        user.libraries = copy;
        user.save(function(err) {
          if (err) { throw err; }
        })
      });
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
    User
      .findOne({ 'auth.email': req.user.auth.email })
      .exec(function(err, user) {
        console.log('user',user.libraries)
        res.send(user.libraries);
      })
  }

};
