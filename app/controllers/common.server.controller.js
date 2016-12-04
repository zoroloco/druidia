var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mobileHandler  = require(pathUtil.join(__dirname,'../handlers/mobileHandler.js'));

  exports.fetchUser = function(req,res,next){
    log.info("User details requested.");
    //res.redirect('/views/index.html');
    res.send(req.session.username);
  };

  exports.fetchMobileStatus = function(req,res,next){
    log.info("Mobile status requested.");
    res.send(mobileHandler.isMobile(req));
  }
