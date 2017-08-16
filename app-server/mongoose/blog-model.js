var mongoose  = require('mongoose'),
    pathUtil  = require('path');

var BlogSchema = new mongoose.Schema({
  "userId"    : {type: String, required: true},
  "heading"   : String,
  "text"      : {type: String, required: true},
  "timeStamp" : String
});

module.exports = mongoose.model('Blogs',BlogSchema);
