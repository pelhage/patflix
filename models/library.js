var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Video = require('../models/video');

var librarySchema = Schema({
  libraryId: String,
  size: Number,
  vidsAdded: Number,
  libName: String,
  videos: {},
  allCategories: {},
  featuredVideos: [],
  numOfVideos: Number,
  ownerId: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Library', librarySchema);

// TODO: Use nested schemas ('Video')
