var mongoose   = require('mongoose'),
    _          = require('underscore'),
    pathUtil   = require('path'),
    conf       = require(pathUtil.join(__dirname,'../config/conf.json')),
    schemas    = require(pathUtil.join(__dirname,'./schemas.js')),
    log        = require(pathUtil.join(__dirname,'../lib/logger.js'));

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
      mongoose.Promise = require('q').Promise;

      mongoose.connection.on('connected', function () {
        log.info('Mongoose default connection open to ' + dbURI);
        schemas.init();
      });

      // If the connection throws an error
      mongoose.connection.on('error',function (err) {
        log.error('Mongoose default connection error: ' + err);
      });

      // When the connection is disconnected
      mongoose.connection.on('disconnected', function () {
        log.info('Mongoose default connection disconnected');
      });
  },

  //returns the saved model if save successful.
  //returns null if not successful.
  save: function save(model,cb){
    log.info("Saving:"+JSON.stringify(model));
    model.save(function(err){
      if(err){
        log.error("Save failed:"+err);
        cb(null);
      }
      else{
        log.info("Save successful:"+JSON.stringify(model));
        cb(model);
      }
    });
  },

  //model - the model type to search, such as user or blog.
  //searchFieldName = "id" or "searchId" - the schema field name to search by.
  //searchField = "202202" - the value of the search field name to search by.
  find: function find(model,searchFieldName,searchFieldValue,cb){
    log.info("Querying for document with:"+searchFieldName+"="+searchFieldValue);

    //set the key of the query object dynamically.
    var query = {};
    query[searchFieldName]=searchFieldValue;

    model.findOne(query,function(err,foundObj){
      if(err){
        log.error(err);
        cb(null);
      }
      else{
        if(!_.isEmpty(foundObj)){
          log.info("Found document with query:"+searchFieldName+"="+searchFieldValue);
          cb(foundObj);
        }
        else{
          log.info("Did not find document with query:"+searchFieldName+"="+searchFieldValue);
          cb(null);
        }
      }
    });
  }

};
