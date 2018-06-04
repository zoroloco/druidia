var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    User           = require(pathUtil.join(__dirname,'../mongoose/user-model.js')),
    passport       = require('passport'),
    authConf       = require(pathUtil.join(__dirname,'../config/auth.conf.js'));

const jwt        = require('jsonwebtoken');
const expressJWT = require('express-jwt');

  //define the jwt middleware
  exports.jwtCheck = expressJWT({
      secret    : authConf.jwtSecret,
      aud  : authConf.audience,
      iss    : authConf.issuer
  }).unless({path: [authConf.publicPath]});

  //log every single request.
  exports.auditRequest = function(req,res,next){
    log.info(req.method+" request to:"+req.originalUrl+" made by IP Address: "+req.ip);
    next();
  };

  //log every authenticated request by capturing the user that made request.
  exports.auditAuthenticatedRequest = function(req,res,next){
    //if jwt authenticated, then this audit request will have the user id in the request object.
    if(!_.isEmpty(req.user) && !_.isEmpty(req.user.id)){
      log.info(req.method+" request to:"+req.originalUrl+" made by IP Address: "+req.ip+" and user Id:"+req.user.id);
    }
    next();
  };

  exports.reRouteHttps = function(req,res,next){
    if('https' == req.protocol){
      next();
    }
    else{
      log.warn("Request not secure. Redirecting to secure site:"+req.hostname+req.url);
      res.redirect("https://"+req.hostname+req.url);
    }
  };

  exports.cors = function(req,res,next){
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
  };

  exports.processCreateAccount = function(req,res,next){
    log.info("Processing creation of new account.");

    User.model.findOne({username:req.body.username},function(err,foundUser){
      if(err){
        log.error("Database error encountered while creating user.");
        next(err);
      }

      if(!_.isEmpty(foundUser)){
        log.info("User found in database.");
        next("User already exists. Cannot create new user.");
      }
      else{
        log.info("User not found in database. Creating new user.");

        var newLocalUser = new User.model({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          role: "admin"
        });

        newLocalUser.save(function(err){
          if(err){
            next(err);
          }
          else{
            log.info("New user successfully created.");
            //I have now added this new user to the db.
            //now call middleware to route to normal login flow.
            res.json(newLocalUser);
          }
        });//save
      }
    });
  };

  //called after passport has determined login was successful.
  //invoked from our router.
  exports.processSuccessfulLocalLoginCallback = function(req,res,next){
    log.info("Processing local login callback with user:"+JSON.stringify(req.user));
    if (_.isEmpty(req.user)) {//This should never happen.
      log.error("Error processing user.");
      return res.sendStatus(401);
    }

    req.logIn(req.user, function(err) {//CREATE A LOGIN SESSION.
      if (err) {
        next(err);//call error middleware.
      }

      //all good
      log.info("Successful login. Sending jwt to user:"+JSON.stringify(req.user));
      //lets create our own druidia JWT.
      return res.json({'jwt':createJWT(req.user.id)});
    });
  };

  //callback after a login is attempted through regular form-based login.
  //this is invoked from passport js middleware. Defined in express.js file.
  //done is called to supply passport with the user that authenticated.
  exports.processLocalLogin = function(username, password, done) {
    log.info("Processing local authentication strategy.");
    log.info("Local username:"+username);
    User.model.findOne({username:username},function(err,foundUser){
      if(err){
        log.error("Error encountered finding user:"+err);
        done(err);
      }
      else{
          if(_.isEmpty(foundUser)){
            log.info("User not found.");
            done(null,false);
          }
          else{
            log.info("User found in the database! Attempting to authenticate.");
            foundUser.verifyPassword(password,function(err,isMatch){
              if(err){
                log.info("Password validation failed.");
                done(null,false);
              }
              else{
                if(isMatch){
                  log.info("Authentication passed.");
                  done(null,foundUser);
                }
                else{
                  log.error("Passwords do not match.");
                  done(null,false);
                }
              }
            });
          }//else
      }
    });//findOne
  };

  //callback after a login is attempted through facebook.
  exports.processFacebookLogin = function(accessToken, refreshToken, fbProfile, done) {
    log.info("Processing facebook authentication strategy.");
    log.info("Facebook accessToken = "+accessToken);
    log.info("Facebook profile = "+JSON.stringify(fbProfile));

    //try to find a druidia user object based off of the facebook ID (searchID).
    User.model.findOne({searchId:fbProfile.id},function(err,foundUser){
      if(!_.isEmpty(foundUser)){
        log.info("Existing user found.");
        done(null,foundUser);
      }
      else{
        log.info("User:"+fbProfile.displayName+" not found. Attempting to create a new druidia user from a facebook profile.");
        var newFacebookUser = new User.model({
          username   : fbProfile.displayName,
          password   : "NA",//not applicable for Facebook Authentication.
          searchId   : fbProfile.id,
          pictureUrl : fbProfile.photos[0].value,
          role       : "admin"
        });

        newFacebookUser.save(function(err){
          if(err)
            done(err);
          else{
            done(null,newFacebookUser);
          }
        });//save
      }
    });//findOne
  };

  //callback after successful facebook login.
  //send back to the user the all important jwt for any future api requests.
  exports.processSuccessfulFacebookCallback = function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (_.isEmpty(user)) {
        log.error("Error processing user.");//This should never happen.
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
  };

  //returns the JWT based off of the user Id.
  //also binds the JWT to this user for this session.
  function createJWT(userId){
    return jwt.sign({id: userId}, authConf.jwtSecret);
  }
