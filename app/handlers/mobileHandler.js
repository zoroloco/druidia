//Determines if mobile.
var log          = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf         = require(pathUtil.join(__dirname,'../config/conf.json')),
    MobileDetect = require('mobile-detect');

exports.reRouteMobile = function(req,res,next){
  log.info("Determining if mobile device used.");
  var md = new MobileDetect(req.headers['user-agent']);

  if(conf.mobileSite === true &&
     (md.is('iOS') ||
      md.is('AndroidOS') ||
      md.is('WindowsMobileOS') ||
      md.is('WindowsPhoneOS')) ){

       log.info("Mobile device detected!");
       var mobilePath = "https://mobile."+conf.hostname;
       log.info("Rerouting to: "+mobilePath);
       res.redirect(mobilePath);
       return;
  }
  else{
    log.info("Mobile device not detected or disabled.");
    next();//keep on proceeding to non mobile site request.
  }
}
