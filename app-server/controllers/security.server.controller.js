var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js')),
    credentials    = require(pathUtil.join(__dirname,'../security/credentials.js')),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    schemas        = require(pathUtil.join(__dirname,'../mongoose/schemas.js')),
    userObj        = require(pathUtil.join(__dirname,'../mongoose/collections/user.json')),
    passport       = require('passport');

const jwt        = require('jsonwebtoken');
const expressJWT = require('express-jwt');
//const jwks       = require('jwks-rsa');

  //define the jwt middleware
  exports.jwtCheck = expressJWT({
    secret    : credentials.jwtSecret
  });

  //log every single request.
  exports.auditRequest = function(req,res,next){
    log.info(req.method+" request to:"+req.originalUrl+" made by IP Address: "+req.ip);
    next();
  }

  //log every authenticated request by capturing the user that made request.
  exports.auditAuthenticatedRequest = function(req,res,next){
    //if jwt authenticated, then this audit request will have the user id in the request object.
    if(!_.isEmpty(req.user) && !_.isEmpty(req.user.id)){
      log.info(req.method+" request to:"+req.originalUrl+" made by IP Address: "+req.ip+" and user Id:"+req.user.id);
    }
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

  //callback after a login is attempted through facebook.
  exports.processFacebookLogin = function(accessToken, refreshToken, fbProfile, done) {
    log.info("Facebook accessToken = "+accessToken);
    log.info("Facebook profile = "+JSON.stringify(fbProfile));

    //try to find a druidia user object based off of the facebook ID (searchID).
    mongoloid.findOne(schemas.userModel,"searchId",fbProfile.id,function(foundUser){
      if(!_.isEmpty(foundUser)){
        done(null,foundUser);
      }
      else{
        log.info("User:"+fbProfile.displayName+" not found. Attempting to create a new user from a facebook profile.");
        userObj.username   = fbProfile.displayName;
        userObj.searchId   = fbProfile.id;
        userObj.pictureUrl = fbProfile.photos[0].value;
        userObj.role       = 'facebook_user';

        var newUserModel = schemas.userModel(userObj);

        mongoloid.save(newUserModel,function(result){
          if(!_.isEmpty(result)){
            done(null,result);
          }
          else{
            log.error("Error saving new user.");
          }
        })
      }
    });
  }

  //callback after successful facebook login.
  //send back to the user the all important jwt for any future api requests.
  exports.processFacebookCallback = function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (_.isEmpty(user)) {
        log.error("Error processing user.");
        return res.sendStatus(401);
      }
      req.logIn(user, function(err) {//CREATE A LOGIN SESSION.
        if (err) {
          return next(err);
        }

        //all good
        log.info("Successful login. Sending jwt to user:"+JSON.stringify(user));
        var myJwt = jwt.sign({id: user.id}, credentials.jwtSecret);
        return res.redirect('/authenticated?jwtToken='+myJwt);
      });
    })(req, res, next);
  }
