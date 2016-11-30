//Determines if mobile.
var log          = require(pathUtil.join(__dirname,'../lib/logger.js')),
    MobileDetect = require('mobile-detect');

exports.reRouteMobile = function(req,res,next){
  log.info("Determining if mobile device used.");
  var md = new MobileDetect(req.headers['user-agent']);

  if(md.is('iPhone')){//TODO: add more mobile devices.
    var mobilePath =
    log.info("Mobile device detected! Rerouting to:")
    res.redirect("https://mobile."+req.hostname+req.url);
    return;
  }
  else{
    next();//keep on proceeding to non mobile site request.
  }
}
