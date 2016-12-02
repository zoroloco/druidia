var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf           = require(pathUtil.join(__dirname,'../config/conf.json'));

  exports.handleError = function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);

    //if you first go to root and not logged in, then that is an okay scenario, but
    //still an error, so you need to be feed the initial login html.
    if(err === 200){
      log.info("Sending initial login page to client.");

      if(conf.debugMobile === true){
          res.sendFile(pathUtil.join(__dirname,'../../public/views/mobile-login.html'));//for debug's test-sake.
      }
      else{
        res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
      }

      return;
    }
    else if(err === 401){
      res.sendStatus(err);
      return;
    }
    else if(err == 404){
      res.status(404);
      res.render(pathUtil.join(__dirname,'../../public/views/errors/404.jade'), {
          title : "The page you were looking for could not be found.",
          message : conf.messages.notFoundMessage
        });
    }
  }

  exports.handleMobileError = function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);

    if(err === 200){
      log.info("Sending initial mobile login page to client.");
      res.sendFile(pathUtil.join(__dirname,'../../public/views/mobile-login.html'));
      return;
    }
    else{
      res.sendStatus(401);
    }
  }
