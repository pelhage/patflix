var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Video = require('../models/video');

var librarySchema = Schema({
  libraryId: String,
  libName: String,
  featuredVideos: [],
  allCategories: {
    Uncategorized: []
  },
  videos: {},
  numOfVideos: Number,
  ownerId: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Library', librarySchema);

// TODO: Use nested schemas ('Video')
