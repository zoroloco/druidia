var log            = require(pathUtil.join(__dirname,'../lib/logger.js'));

  exports.sendRoot = function(req,res,next){
    log.info("Root page requested.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index.html'));
  };

  exports.sendMobileRoot = function(req,res,next){
    log.info("Mobile root page requested.");
    //res.sendFile(pathUtil.join(__dirname,'../../public/mobile-views/secure/index.html'));
    res.send("mobile root page.");
  }
