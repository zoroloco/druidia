var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf           = require(pathUtil.join(__dirname,'../config/conf.json'));

  //401 , 404s sent here.
  exports.handleError = function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);
    res.sendStatus(err);
  }
