var mongoose  = require('mongoose'),
    pathUtil  = require('path'),
    Address   = require(pathUtil.join(__dirname,'./address-model.js'));

var AccountSchema = new mongoose.Schema({
  "address"   : {type: Address, required: true},
  "email"     : String,
  "gender"    : String,
  "dob"       : Date
});

module.exports = mongoose.model('Accounts',AccountSchema);
