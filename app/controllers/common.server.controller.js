var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore');

  exports.fetchUser = function(req,res,next){
    log.info("User details requested.");
    //res.redirect('/views/index.html');
    res.send(req.session.username);
  };
