var mongoose  = require('mongoose');

var StateSchema = new mongoose.Schema({
  "code"    : {type: String, required: true},
  "name"    : {type: String, required: true}
});

var stateModel = mongoose.model('States',StateSchema);
module.exports = stateModel;
