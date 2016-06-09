var Library = require('../models/library');
var User = require('../models/user');
var Hashids = require('hashids');
var hashids = new Hashids("NaCl for patflix video player", 0);

module.exports = {

  // Save a New Library
  create: function(req, res) {
    var newLibrary = new Library();
    newLibrary.libraryId = hashids.encodeHex(newLibrary._id);
    newLibrary.featured = [req.body.featured];
    newLibrary.categories = req.body.categories;
    newLibrary.videos = [req.body.videos];
    newLibrary.ownerId = req.user._id;
    newLibrary.save(function(err) {
      if (err) { throw err; }
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

  // Show all user libraries
  showAll: function(req, res) {
    Library.find({}, function(err, libraries) {
      var libraryMap = {};

      libraries.forEach(function(library) {
        libraryMap[library._id] = library;
      });
      res.send(libraryMap);
    });
  }

};