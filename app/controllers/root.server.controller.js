var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf           = require(pathUtil.join(__dirname,'../config/conf.json'));

  exports.sendRoot = function(req,res,next){
    log.info("Root page requested.");

    if(conf.debugMobile === true){
        res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/mobile-index.html'));//for testing sake.
    }
    else{
      res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index.html'));
    }
  };

  exports.sendMobileRoot = function(req,res,next){
    log.info("Mobile root page requested.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/mobile-index.html'));
  }
