var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
  youtubeId: String,
  title: String,
  description: String,
  categories: [String],
  isFeatured: Boolean
}, { minimize: false });

module.exports = mongoose.model('Video', videoSchema);
