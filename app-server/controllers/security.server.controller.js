var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js')),
    credentials    = require(pathUtil.join(__dirname,'../security/credentials.js'));

const expressJWT = require('express-jwt');
//const jwt        = require('jsonwebtoken');
//const jwks       = require('jwks-rsa');

  //define the jwt middleware
  exports.jwtCheck = expressJWT({
    secret    : credentials.jwtSecret
  });

  //exports.jwtCheck = expressJWT({secret: "test secret okay"}).unless({ path: ['/', '/api/logger'] });
  //exports.jwtCheck = expressJWT({secret: "test secrete okay"});

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

  /*
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
  };

  exports.onLogout = function(req,res){
    log.info("logout initiated.");
  };
  */
