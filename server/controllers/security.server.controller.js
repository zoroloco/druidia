var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    underStr       = require('underscore.string'),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));

  exports.auditRequest = function(req,res,next){
    log.info(req.method+" request to:"+req.originalUrl+" made by IP Address: "+req.ip);
    next();
  }

  exports.reRouteHttps = function(req,res,next){
    if('https' == req.protocol){
      next();
    }
    else{
      log.warn("Request not secure. Redirecting to secure site:"+req.hostname+req.url);
      res.redirect("https://"+req.hostname+req.url);
    }
  }

  exports.authenticateRoot = function(req,res,next){
    log.info("AUTHENTICATING ROOT:"+req.session.username+" Trying to access:"+req.originalUrl);
    if(isAuthenticated(req)){
      req.url = "/root";
    }
    else{
      req.url = "/login";
    }

    next('route');
  }

  //Used when trying to access the secure part of the site.
  exports.authenticate = function(req,res,next){
    log.info("AUTHENTICATING:"+req.session.username+" Trying to access:"+req.originalUrl);
    if(isAuthenticated(req)){
      log.info("User session exists!");
      next();//continue the route.
    }
    else{
      log.error("User session does not exist. NOT AUTHORIZED!");
      res.sendStatus(401);
    }
  }

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
        log.error("User "+req.body.username+" already exists.");
        res.status(401).send("User "+req.body.username+" not available.");
      }
      else{//create the new user
        var user = {
          "username" : req.body.username,
          "password" : req.body.password,
          "role"     : "admin"
        }
        mongoloid.saveUser(user,function(result){
          if(result === true){
            res.status(200).send("User "+req.body.username+" created successfully.");
          }
          else{
            res.status(401).send("User "+req.body.username+" save failed.");
          }
        });
      }
    });
  };

  function isAuthenticated(req){
    return req.session.authenticated;
  }

  exports.isAuthenticated = isAuthenticated;
