var mongoose  = require('mongoose'),
    pathUtil  = require('path'),
    log       = require(pathUtil.join(__dirname,'../lib/logger.js'));

var StateSchema = new mongoose.Schema({
  "code"    : {type: String, required: true},
  "name"    : {type: String, required: true}
});


exports.initData = function(){

}

var stateModel = mongoose.model('States',StateSchema);
module.exports = stateModel;
