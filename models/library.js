var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var librarySchema = Schema({
  libraryId: String,
  featured: [],
  categories: [String],
  videos: [],
  ownerId: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Library', librarySchema);