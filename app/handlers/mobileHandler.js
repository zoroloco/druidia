//Determines if mobile.
var log          = require(pathUtil.join(__dirname,'../lib/logger.js')),
    underStr     = require('underscore.string'),
    conf         = require(pathUtil.join(__dirname,'../config/conf.json')),
    MobileDetect = require('mobile-detect');

exports.reRouteMobile = function(req,res,next){
  log.info("Determining if mobile device used.");
  var md = new MobileDetect(req.headers['user-agent']);

  if(md.is('iPhone')){//TODO: add more mobile devices.

    if(underStr.startsWith(req.hostname,"www")){
      req.hostname = underStr.replaceAll(req.hostname,"/www",conf.virtualHostnameMobile);
      log.info("Changed hostname to:"+req.hostname);
    }

    var mobilePath = "https://mobile."+req.hostname+req.url;
    log.info("Mobile device detected! Rerouting to: "+mobilePath);
    res.redirect(mobilePath);
    return;
  }
  else{
    next();//keep on proceeding to non mobile site request.
  }
}
