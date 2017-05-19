var mongoose  = require('mongoose'),
    _         = require('underscore'),
    pathUtil  = require('path'),
    userObj   = require(pathUtil.join(__dirname,'../../app-common/collections/user.json')),
    log       = require(pathUtil.join(__dirname,'../lib/logger.js'));

var userModel;
var blogModel;

var self = module.exports = {

  //define all your schemas here.
  init: function init(){

    var UserSchema = new mongoose.Schema({
      "username"    : {type: String, required: true},
      "password"    : {type: String},
      "firstname"   : String,
      "lastname"    : String,
      "email"       : String,
      "role"        : {type: String, required: true},
      "description" : String,
      "searchId"    : String
    });

    self.userModel = mongoose.model('Users',UserSchema);
    log.info("Created user schema.");

    var BlogSchema = new mongoose.Schema({
      "user" : {type: userObj, required: true},
      "text" : {type: String, required: true},
      "date" : Date,
      "time" : String
    });

    self.blogModel = mongoose.model('Blogs',BlogSchema);
    log.info("Created blog schema.");
  }

};
