var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore');

  exports.renderRoot = function(req,res,next){
    log.info("Root page requested.");
    //res.redirect('/views/index.html');
    res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index.html'));
  };
