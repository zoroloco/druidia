var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));


  exports.renderHome = function(err,req,res,next){
    if(err){
      log.error("Error routed to me:"+err);
    }

    log.info("root page requested.");
    //log.info("Found following session open on client machine: "+req.sessionID);
    //log.info("Routing "+req.session.userName+" to index.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/index.html'));
  };
