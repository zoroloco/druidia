var mongoose   = require('mongoose'),
    _          = require('underscore'),
    pathUtil   = require('path'),
    conf       = require(pathUtil.join(__dirname,'../config/conf.json')),
    log        = require(pathUtil.join(__dirname,'../lib/logger.js'));

var userModel;

var self = module.exports = {

  init: function init(){
    var dbURI= conf.mongo.connectionString;

      //CONFIGURE MONGO
      var opts = {
          server: {
             socketOptions: { keepAlive: conf.mongo.keepAlive }
          }
      };
      mongoose.connect(dbURI,opts);

      mongoose.connection.on('connected', function () {
        log.info('Mongoose default connection open to ' + dbURI);
      });

      // If the connection throws an error
      mongoose.connection.on('error',function (err) {
        log.error('Mongoose default connection error: ' + err);
      });

      // When the connection is disconnected
      mongoose.connection.on('disconnected', function () {
        log.info('Mongoose default connection disconnected');
      });

      var Schema    = mongoose.Schema;

      var UserSchema= new Schema({
        "username"    : {type: String, required: true},
        "password"    : {type: String, required: true},
        "firstname"   : String,
        "lastname"    : String,
        "email"       : String,
        "role"        : {type: String, required: true},
        "description" : String
      });

      //create the user models
      //second parameter is the schema definition
      userModel = mongoose.model('Users',UserSchema);
  },

  saveUser: function saveUser(user,cb){
    log.info("Creating user from object:"+JSON.stringify(user));
    var myUser = new userModel(user);
    myUser.save(function(err){
      if(err){
        log.error("Error saving:"+err);
        cb(false);
      }
      else{
        log.info("Successfully saved user:"+user.username);
        cb(true);
      }
    });
  },

  findUser: function findUser(user,cb){
    log.info("Finding user:"+JSON.stringify(user));

    userModel.findOne({"username":user.username},function(err,foundUser){
      if(err){
        log.error(err);
        cb(null);
      }
      else{
        if(!_.isEmpty(foundUser)){
          log.info("Found user:"+foundUser.username);
          cb(foundUser);
        }
        else{
          log.info("Did not find user:"+user.username);
          cb(null);
        }
      }
    });
  },

  validateUser: function validateUser(user,cb){
    log.info("Validating user:"+JSON.stringify(user));
    self.findUser(user,function(foundUser){
      if(!_.isEmpty(foundUser)){
        if(_.isEqual(user.password,foundUser.password)){
          log.info("Validation successfull for user:"+user.username);
          cb(true);
        }
        else{
          log.error("Incorrect password for user:"+user.username);
          cb(false);
        }
      }
      else{
        log.info("Did not find user:"+user.username);
        cb(false);
      }
    });
  }


};
