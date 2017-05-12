var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf           = require(pathUtil.join(__dirname,'../config/conf.json'));

  //401 , 404s sent here.
  exports.log = function(err,req,res,next){
    log.info(req.body);//log it on the server.
    res.sendStatus(200);
  }
