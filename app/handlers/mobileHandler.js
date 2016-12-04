//Determines if mobile and re-route if necessary.
var log          = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf         = require(pathUtil.join(__dirname,'../config/conf.json')),
    MobileDetect = require('mobile-detect'),
    mobileHandler= require(pathUtil.join(__dirname,'./mobileHandler.js'));

exports.reRouteMobile = function(req,res,next){
  log.info("Determining if mobile device used.");

  if(conf.mobileSite === true && mobileHandler.isMobile(req)){

       log.info("Mobile device detected!");
       var mobilePath = "https://mobile."+conf.hostname+req.url;
       log.info("Rerouting to: "+mobilePath);
       res.redirect(mobilePath);//now mobile-routes.js will take over the routing.
       return;
  }
  else{
    log.info("Mobile device not detected or disabled.");
    next();//keep on proceeding to non mobile site request.
  }
}

//return true or false if client on mobile OS.
exports.isMobile = function(req){
  var md = new MobileDetect(req.headers['user-agent']);
  if(md.is('iOS') ||
     md.is('AndroidOS') ||
     md.is('WindowsMobileOS') ||
     md.is('WindowsPhoneOS')){
       return true;
   }
   return false;
}
