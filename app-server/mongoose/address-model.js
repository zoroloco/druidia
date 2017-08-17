var mongoose  = require('mongoose'),
    pathUtil  = require('path'),
    State     = require(pathUtil.join(__dirname,'./state-model.js'));

var AddressSchema = new mongoose.Schema({
  address1   : {type: String, required: true},
  address2   : String,
  city       : {type: String, required: true},
  state      : {type: State,  required: true},
  zip        : {type: Number},
  country    : String
});

module.exports = mongoose.model('Address',AddressSchema);
