var mongoose  = require('mongoose'),
    pathUtil  = require('path'),
    State     = require(pathUtil.join(__dirname,'./state-model.js'));

var AddressSchema = new mongoose.Schema({
  address1   : {type: String, required: true},
  address2   : String,
  city       : {type: String, required: true},
  state      : {type: State.schema,  required: true},
  zip        : {type: Number},
  country    : String
});

exports.schema= AddressSchema;
exports.model = mongoose.model('Address',AddressSchema);
