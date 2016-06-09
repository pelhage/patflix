var mongoose = require('mongoose');

var patflixSchema = mongoose.Schema({
  user: User,
  libraries: String,
  activeLibraries: [String],
  videos: [Videos]
});

module.exports = mongoose.model('Library', librarySchema);