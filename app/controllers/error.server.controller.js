var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf           = require(pathUtil.join(__dirname,'../config/conf.json'));

  exports.handleError = function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);

    //if you first go to root and not logged in, then that is an okay scenario, but
    //still an error, so you need to be feed the initial login html.
    if(err === 200){
      log.info("Sending initial login page to client.");

      if(conf.debugMobile === true){
        log.info("err 200 sending mobile login");
          res.sendFile(pathUtil.join(__dirname,'../../public/views/login-mobile.html'));//for debug's test-sake.
      }
      else{
        log.info("err 200 sending normal login");
        res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
      }

      return;
    }
    else{
      res.sendStatus(err);
      return;
    }
  }

  exports.handleMobileError = function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);

    if(err === 200){
      log.info("Sending initial mobile login page to client.");
      res.sendFile(pathUtil.join(__dirname,'../../public/views/login-mobile.html'));
      return;
    }
    else{
      res.sendStatus(err);
    }
  }
