var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf           = require(pathUtil.join(__dirname,'../config/conf.json'));

  exports.sendRoot = function(req,res,next){
    log.info("Root page requested.");

    if(conf.debugMobile === true){
      log.info("mobile root");
        res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index-mobile.html'));//for testing sake.
    }
    else{
      log.info("normal root");
      res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index.html'));
    }
  };

  exports.sendMobileRoot = function(req,res,next){
    log.info("Mobile root page requested.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index-mobile.html'));
  }
