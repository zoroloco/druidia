var mongoose   = require('mongoose'),
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
        "password"    : String,
        "role"        : {type: String, required: true},
        "description" : String
      });

      //create the user models
      //second parameter is the schema definition
      userModel = mongoose.model('Users',UserSchema);
  },

  saveUser: function saveUser(user){
    log.info("Creating user from object:"+JSON.stringify(user));
    var myUser = new userModel(user);
    myUser.save(function(err){
      if(err){
        log.error("Error saving:"+err);
      }
    });
  }


};
