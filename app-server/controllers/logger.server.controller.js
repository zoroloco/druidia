var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf           = require(pathUtil.join(__dirname,'../config/conf.json'));

  exports.logger = function(req,res,next){
    log.info(JSON.stringify(req.body.message));//log it on the server.
    res.sendStatus(200);
  }
