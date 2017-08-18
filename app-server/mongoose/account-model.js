var mongoose  = require('mongoose'),
    pathUtil  = require('path'),
    Address   = require(pathUtil.join(__dirname,'./address-model.js')),
    User      = require(pathUtil.join(__dirname,'./user-model.js'));

var AccountSchema = new mongoose.Schema({
  user      : {type: User.schema, required: true},
  address   : {type: Address.schema, required: true},
  email     : String,
  gender    : String,
  dob       : Date
});

exports.schema = AccountSchema;
exports.model  = mongoose.model('Accounts',AccountSchema);
