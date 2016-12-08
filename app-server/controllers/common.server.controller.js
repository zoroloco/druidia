var log        = require(pathUtil.join(__dirname,'../lib/logger.js')),
    commonUtil = require(pathUtil.join(__dirname,'../lib/commonutils.js'));

  exports.fetchUser = function(req,res,next){
    log.info("User details requested.");
    //res.redirect('/views/index.html');
    res.send(req.session.username);
  };

  exports.fetchMobileStatus = function(req,res,next){
    log.info("Mobile status requested.");
    res.send(commonUtil.isMobile(req));
  }
