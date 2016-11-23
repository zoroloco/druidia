var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));

  exports.authenticate = function(req,res,next){
    log.info("AUTHENTICATING:"+req.session.username+" Trying to access:"+req.path);
    if(req.session.authenticated){
      log.info("User session exists!");
      next();//continue the route.
      //res.sendFile(pathUtil.join(__dirname,'../../public/views/home.html'));
    }
    else{
      res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
    }
  }

  exports.renderLogin = function(req,res,next){
    log.info("Routing to login page.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
  };

  exports.onLogin = function(req,res,next){
    log.info("onLogin: "+JSON.stringify(req.body));
    //res.cookie(properties.title,req.body.username, {signed: true, maxAge: 9999, httpOnly: true, secure: true});
    mongoloid.validateUser(req.body,function(validationResult){
      if(true === validationResult){
        sessionHandler.createSession(req);
        res.sendStatus(200);
      }
      else{
        log.info("Sending failed login response message for user:"+req.body.username);
        res.status(401).send("Invalid Login.");
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
          next("500");
        }
        else{
          log.info("Successfully destroyed session ID:"+sessionID);
          res.sendStatus(200);
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
