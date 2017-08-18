var mongoose  = require('mongoose');

var StateSchema = new mongoose.Schema({
  code    : {type: String, required: true},
  name    : {type: String, required: true}
});

exports.schema = StateSchema;

exports.model = mongoose.model('States',StateSchema);
