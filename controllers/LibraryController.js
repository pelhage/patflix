var Library = require('../models/library')
var User = require('../models/user')
var Hashids = require('hashids')
var hashids = new Hashids("NaCl for patflix video player", 0)
var ObjectID = require('mongodb').ObjectID

module.exports = {

  // Save a New Library
  create: function(req, res) {
    var newLibrary = new Library()
    newLibrary.libraryId = hashids.encodeHex(newLibrary._id)
    newLibrary.size = req.body.size
    newLibrary.vidsAdded = req.body.vidsAdded
    newLibrary.libName = req.body.libName
    newLibrary.videos = req.body.videos
    newLibrary.featuredVideos = req.body.featuredVideos
    newLibrary.allCategories = req.body.allCategories
    newLibrary.ownerId = ObjectID(req.user._id)

    var updatedLibraries = Object.assign({}, req.user.libraries)
    updatedLibraries[newLibrary.libraryId] = newLibrary

    newLibrary.save(function(err) {
      if (err) { throw err }

      User
        .update({ 'auth.email': req.user.auth.email }, {
          libraries: updatedLibraries
        }, function(err) {
          if (err) { throw err }
        })
    })

    res.send(newLibrary);
  },

  remove: function(req, res) {
    var libraryId = req.params.id
    var libMongoId = hashids.decodeHex(libraryId)
    var copiedLibs = Object.assign({}, req.user.libraries)
    // Delete the library
    delete copiedLibs[libraryId]

    Library
      .remove({'_id': new ObjectID(libMongoId)}, function(err) {
        if (err) { throw err }
        User
          .update({ '_id': req.user._id }, {
            libraries: copiedLibs
          }, function(err) {
            if (err) { throw err }
            res.send(copiedLibs)
          })
      })
    res.send('Not working')
  },

  update: function(req, res) {
    var libraryId = hashids.decodeHex(req.params.id)
    var updatedLib = req.body
    var updatedLibraries = Object.assign({}, req.user.libraries)

    updatedLibraries[libraryId] = updatedLib
    Library
      .update({'_id': new ObjectID(libraryId)}, updatedLib, function(err) {
        if (err) { throw err }
        User
          .update({ 'auth.email': req.user.auth.email }, {
            libraries: updatedLibraries
          }, function(err) {
            if (err) { throw err }
          })
      })
    res.send('ITS ALL GOOD IN THE HOOD')
  },

  // Get a user library
  render: function(req, res) {
    var libID = hashids.decodeHex(req.params.id)
    Library
      .findOne({'_id': new ObjectID(libID)})
      .exec(function(err, doc) {
        res.send(doc)
      })
  },

  // Show a user's libraries
  showAll: function(req, res) {
    User
      .findOne({ 'auth.email': req.user.auth.email })
      .exec(function(err, user) {
        // console.log('user',user.libraries)
        res.send(user.libraries)
      })
  }

};
