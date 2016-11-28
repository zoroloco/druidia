var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore');

  exports.renderRoot = function(req,res,next){
    log.info("Root page requested.");
    //res.redirect('/views/index.html');
    if(req.session.authenticated){
      res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index.html'));
    }
    else{
      res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
    }
  };
