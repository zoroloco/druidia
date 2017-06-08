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

  //this is a manual login.
  exports.processLoginOrCreateAccount = function(req,res,next){
    log.info("A new login or create account request is being attempted for payload:"+JSON.stringify(req.body));

    var user = req.body;

    mongoloid.findOne(schemas.userModel,"username",req.body.username,function(foundUser){
      if(!_.isEmpty(foundUser)){
        log.info("User found in the database!");
        if(req.body.isNew){
          log.warn("Client requested to create a new user - username found in database.");
          res.sendStatus(401);
        }
        else{
          log.info("Client requested to login - username found in database.");
          //do the passwords match?
          if(_.isEqual(foundUser.password,req.body.password)){
            log.info("Authentication successful!");
            
            req.logIn(foundUser, function(err) {//CREATE A LOGIN SESSION.
              if (err) {
                return next(err);//call error middleware.
              }
              log.info("Sending down JWT JSON in POST.");
              res.json({'jwt':createJWT(user.id)});
            });
          }
          else{
            log.warn("Invalid password for username:"+req.body.username);
            res.sendStatus(401);
          }
        }
      }
      else{//user was not found
        log.info("User:"+req.body.username+" NOT found in the database!");
        if(req.body.isNew){
          log.info("Client requested to create a new user - username not found, so proceeding to create a new user.");
          userObj.username = req.body.username;
          userObj.password = req.body.password;
          userObj.role     = 'druidia_user';
          var newUserModel = schemas.userModel(userObj);
          mongoloid.save(newUserModel,function(savedUser){
            if(!_.isEmpty(savedUser)){
              log.info("Successfully created new user:"+JSON.stringify(savedUser));

              req.logIn(foundUser, function(err) {//CREATE A LOGIN SESSION.
                if (err) {
                  return next(err);//call error middleware.
                }
                log.info("Sending down JWT JSON in POST.");
                res.json({'jwt':createJWT(user.id)});
              });
            }
            else{
              log.error("Error saving new user.");
              res.sendStatus(401);
            }
          });
        }
        else{
          //login failed because user does not exist!
          log.warn("Client requested to login - login failed because username not found.");
          res.sendStatus(401);
        }
      }
    });
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
          return next(err);//call error middleware.
        }

        //all good
        log.info("Successful login. Sending jwt to user:"+JSON.stringify(user));
        //lets create our own druidia JWT.
        return res.redirect('/authenticated?jwtToken='+createJWT(user.id));
      });
    })(req, res, next);
  }

  //returns the JWT based off of the user Id.
  function createJWT(userId){
    return jwt.sign({id: userId}, credentials.jwtSecret);
  }
