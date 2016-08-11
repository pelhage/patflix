var Library = require('../models/library')
var User = require('../models/user')
var Hashids = require('hashids')
var hashids = new Hashids("NaCl for patflix video player", 0)
var ObjectID = require('mongodb').ObjectID

module.exports = {

  // Save a New Library
  create: function(req, res) {
    console.log('\nInvoked [create] Library endpoint. \n')
    console.log('[create] req.body:', req.body)

    var newLibrary = new Library()
    newLibrary.libraryId = hashids.encodeHex(newLibrary._id)
    newLibrary.size = req.body.size
    newLibrary.vidsAdded = req.body.vidsAdded
    newLibrary.libName = req.body.libName
    newLibrary.videos = req.body.videos
    newLibrary.featuredVideos = req.body.featuredVideos
    newLibrary.allCategories = req.body.allCategories
    newLibrary.ownerId = ObjectID(req.user._id)

    newLibrary.save(function(err) {
      if (err) { throw err }

      User
        .findOne({ 'auth.email': req.user.auth.email })
        .exec(function(err, user) {
          var copy = Object.assign({}, user.libraries)
          copy[newLibrary.libraryId] = newLibrary
          user.libraries = copy
          user.save(function(err) {
            if (err) { throw err }
          })
        })
    })

    res.send(newLibrary);
  },

  remove: function(req, res) {
    // console.log('Hitting [remove] endpoint', req.user)
    // console.log('req.user._id', req.user._id)
    // console.log('ObjectID(req.user._id)', ObjectID(req.user._id))
    var libraryId = req.params.id

    User
      .findOne({ 'auth.email': req.user.auth.email })
      .exec(function(err, user) {
        var copy = Object.assign({}, user.libraries)
        delete copy[libraryId]
        user.libraries = copy
        user.save(function(err) {
          if (err) { throw err }
          res.send(user.libraries)
        })
      })
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
