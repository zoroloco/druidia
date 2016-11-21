var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));

  exports.authenticate = function(err,req,res,next){
    log.info("Attempting to verify authentication of:"+req.session.username);
    if(req.session.authenticated){
      next();
    }
    else{
      next("Authentication failed!");
    }
  }

  exports.renderLogin = function(err,req,res,next){
    log.info("Routing to login page.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
  };

  exports.onLogin = function(err,req,res,next){
    log.info("Attempting to authenticate login: "+JSON.stringify(req.body));
    //res.cookie(properties.title,req.body.username, {signed: true, maxAge: 9999, httpOnly: true, secure: true});
    mongoloid.validateUser(req.body,function(validationResult){
      if(true === validationResult){
        sessionHandler.createSession(req);
        next();
      }
      else{
        log.info("Sending failed login response message for user:"+req.body.username);
        next("Login Auth failed!");
        res.sendStatus(401);
      }
    });
  };

  exports.onLogout = function(req,res){
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
  };

  exports.onAddUser = function(req,res){
    log.info("Creating user:"+JSON.stringify(req.body));

    mongoloid.findUser(req.body,function(foundUser){
      if(!_.isEmpty(foundUser)){//prevent duplicate users
        log.warn("User "+req.body.username+" already exists.");
      }
      else{//create the new user
        var user = {
          "username" : req.body.username,
          "password" : req.body.password,
          "role"     : "admin"
        }
        mongoloid.saveUser(user);
      }
    });
  };
