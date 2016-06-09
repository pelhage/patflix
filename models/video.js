var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
  youtubeId: String,
  title: String,
  description: String,
  categories: [String],
  isFeatured: Boolean
});

module.exports = mongoose.model('Video', videoSchema);