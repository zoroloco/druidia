var mongoose   = require('mongoose'),
    _          = require('underscore'),
    pathUtil   = require('path'),
    conf       = require(pathUtil.join(__dirname,'../config/conf.json')),
    log        = require(pathUtil.join(__dirname,'../lib/logger.js'));

var self = module.exports = {

  init: function init(cb){
    var dbURI= conf.mongo.connectionString;

      //CONFIGURE MONGO
      var opts = {
          useMongoClient: true,
          keepAlive: conf.mongo.keepAlive
      };
      //mongoose.Promise = require('bluebird');
      mongoose.connect(dbURI,opts);

      mongoose.connection.on('connected', function () {
        log.info('Mongoose default connection open to ' + dbURI);
        cb(true);
      });

      // If the connection throws an error
      mongoose.connection.on('error',function (err) {
        log.error('Mongoose default connection error: ' + err);
        cb(false);
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
  findOne: function findOne(model,searchFieldName,searchFieldValue,cb){
    log.info("Querying for document with:"+searchFieldName+"="+searchFieldValue);

    //set the key of the query object dynamically.
    var query = {};
    query[searchFieldName]=searchFieldValue;

    //returns only one result or null.
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
  },

  //can possibly return a JSON with many results or null if nothing found.
  find: function find(model,searchFieldName,searchFieldValue,cb){
    log.info("Querying for document with:"+searchFieldName+"="+searchFieldValue);

    //set the key of the query object dynamically.
    var query = {};
    query[searchFieldName]=searchFieldValue;

    model.find(query,function(err,results){
      if(err){
        log.info(err);
        cb(null);
      }
      else{
        if(!_.isEmpty(results)){
          log.info("Found all documents with query:"+searchFieldName+"="+searchFieldValue);
          cb(results);
        }
        else{
          log.info("Did not find any results with query:"+searchFieldName+"="+searchFieldValue);
          cb(null);
        }
      }
    });
  }

};
