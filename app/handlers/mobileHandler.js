//Determines if mobile.
var log          = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf         = require(pathUtil.join(__dirname,'../config/conf.json')),
    MobileDetect = require('mobile-detect');

exports.reRouteMobile = function(req,res,next){
  log.info("Determining if mobile device used.");
  var md = new MobileDetect(req.headers['user-agent']);

  if(md.is('iPhone')){//TODO: add more mobile devices.
    log.info("Mobile device detected!");
    var mobilePath = "https://mobile."+conf.hostname+"/"+req.url;
    log.info("Rerouting to: "+mobilePath);
    res.redirect(mobilePath);
    return;
  }
  else{
    next();//keep on proceeding to non mobile site request.
  }
}
