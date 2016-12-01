//Determines if mobile.
var log          = require(pathUtil.join(__dirname,'../lib/logger.js')),
    MobileDetect = require('mobile-detect');

exports.reRouteMobile = function(req,res,next){
  log.info("Determining if mobile device used.");
  var md = new MobileDetect(req.headers['user-agent']);

  if(md.is('iPhone')){//TODO: add more mobile devices.
    log.info("hostname="+req.hostname);
    log.info("req.url="+req.url);
    log.info("req.originalURL="+req.originalURL);
    log.info("req.vhost[0]="+req.vhost[0]);
    log.info("req.vhost.length="+req.vhost.length);
    log.info("req.vhost.hostname="+req.vhost.hostname);

    var mobilePath = "https://mobile."+req.hostname+req.url;
    log.info("Mobile device detected! Rerouting to: "+mobilePath);
    res.redirect(mobilePath);
    return;
  }
  else{
    next();//keep on proceeding to non mobile site request.
  }
}
