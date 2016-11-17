var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));

module.exports = RootController;

function RootController(){

  if(this instanceof RootController === false){
    throw new TypeError("Classes can't be function-called.");
  }

  var self           = this;

  RootController.prototype.render = function(req,res){
    log.info("root page requested.");
    //log.info("Found following session open on client machine: "+req.sessionID);
    //log.info("Routing "+req.session.userName+" to index.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/index.html'));

    /*
    var user = {
      "username" : "kcenturion",
      "password" : "kcenturion",
      "role"     : "admin",
      "description" : "cool dude"
    }
    var testUser  = mongoloid.saveUser(user);
    */

    /*
    if(!_.isEmpty(req.sessionID)){
      log.info("Routing "+req.session.userName+" to index.");
      res.sendFile(pathUtil.join(__dirname,'../../public/views/index.html'));
    }
    else{
      log.info("Routing to login page.");
      res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
    }
    */
  }

  RootController.prototype.logout = function(req,res){
    log.info("logout initiated.");
    var sessionID = req.sessionID;
    if(!_.isEmpty(sessionID)){
      log.info("destroying session "+sessionID);
      req.session.destroy(function(err) {
        if(err){
          log.error("Error encountered while destroying session ID:"+sessionID);
        }
        else{
          log.info("Successfully destroyed session ID:"+sessionID);
        }
      })
    }
  }
}
