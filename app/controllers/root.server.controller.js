var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    MobileDetect   = require('mobile-detect');

  exports.renderRoot = function(req,res,next){
    log.info("Root page requested.");

    var md = new MobileDetect(req.headers['user-agent']);

    if(md.is('iPhone')){
      log.info("Iphone detected!");
      res.send("you is on iphone!");
    }
    else{
      //res.redirect('/views/index.html');
      if(req.session.authenticated){
        res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index.html'));
      }
      else{
        res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
      }  
    }
  };
