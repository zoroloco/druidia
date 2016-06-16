var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  title: String,
  link: String,
  path: String
});

mongoose.model('Movie', MovieSchema);
