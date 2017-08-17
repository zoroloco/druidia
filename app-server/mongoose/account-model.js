var mongoose  = require('mongoose'),
    pathUtil  = require('path'),
    Address   = require(pathUtil.join(__dirname,'./address-model.js')),
    User      = require(pathUtil.join(__dirname,'./user-model.js'));

var AccountSchema = new mongoose.Schema({
  user      : {type: User, required: true},
  address   : {type: Address, required: true},
  email     : String,
  gender    : String,
  dob       : Date
});

module.exports = mongoose.model('Accounts',AccountSchema);
