var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore');

  exports.renderHome = function(req,res,next){
    log.info("Home page requested.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/templates/home.html'));
  };
