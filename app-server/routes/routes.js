//This script defines the routes taken by the server.

var pathUtil           = require('path'),
    log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf               = require(pathUtil.join(__dirname,'../config/conf.json')),
    documentHandler    = require(pathUtil.join(__dirname,'../handlers/documentHandler.js')),
    passport           = require('passport'),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    commonController   = require(pathUtil.join(__dirname,'../controllers/common.server.controller.js')),
    loggerController   = require(pathUtil.join(__dirname,'../controllers/logger.server.controller.js')),
    errorController    = require(pathUtil.join(__dirname,'../controllers/error.server.controller.js')),
    credentials        = require(pathUtil.join(__dirname,'../security/credentials.js'));

const jwt        = require('jsonwebtoken');

module.exports = function(app) {
  //order important here.

  //EVERYTHING WILL BE AUDITED AND REROUTED TO SECURE SITE.
  app.use(securityController.auditRequest,//if not mobile site, then log it.
          securityController.reRouteHttps);//after logging, forward to https site.

  //Below is the route to serve the NG2 site.
  app.get('/',function(req,res,next){
    log.info("Sending index to client.");
    //var myToken = jwt.sign({user  },'')
    res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
  })

  app.get('/home',function(req,res,next){
    log.info("Sending home to client.");
    res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
  })

  app.get('/authenticated',function(req,res){
    log.info("Authenticated route hit with JWT = "+req.query.jwtToken);
    res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
  })

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook',
           passport.authenticate('facebook'));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        log.error("no user");
        var myJwt = jwt.sign({username: "ken"}, credentials.jwtSecret);
        return res.redirect('/authenticated?jwtToken='+myJwt);
      }
      req.logIn(user, function(err) {//CREATE A LOGIN SESSION.
        if (err) {
          return next(err);
        }
        return res.redirect('/home');
      });
    })(req, res, next);
  });

  app.post('/api/logger',
          securityController.jwtCheck,
          loggerController.logger
        );

  /*
  //this is a test for JWT.
  app.get('/foo/bar',securityController.jwtCheck,function(req,res,next){
    log.info("got a request to foo/bar endpoint.");
    res.send("you is authorized.");
  })

  //Accessing the root / needs to first send down some initial html such as the login
  //or the index, depending if authentication passed.
  app.get('/',securityController.authenticateRoot);

  app.get('/login',documentHandler.reRouteMobile,documentHandler.sendLogin);
  app.get('/login/mobile',documentHandler.sendLoginMobile);

  app.get('/root', documentHandler.reRouteMobile,documentHandler.sendRoot);
  app.get('/root/mobile',documentHandler.sendRootMobile);

  //login added first because we always want to be able to process a login post.
  app.post('/login',securityController.onLogin);

  //add user is public. does not go through authenticate middleware.
  app.post('/addUser',securityController.onAddUser);

  //top level middleware to catch any request and log it. Will reroute to secure site if not https.
  app.use('/secure',securityController.authenticate);
  //if authentication passes, then flow will go to 'next', which is one of the routes defined below.

  //once logged in, all of our secure requests will be prepended with 'secure'.
  //As you see above, all 'secure' routes first go through authentication. If auth passes, then the
  //'next' routes are defined below.
  app.post('/secure/logoff',securityController.onLogout);
  app.get('/secure/common/fetchUser',commonController.fetchUser);
  app.get('/secure/common/fetchMobileStatus',commonController.fetchMobileStatus);
  */

  //everything else is a 404, not found.
  /*
  app.get('*',function(req,res,next){
    res.sendStatus(404);
  });
  */

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(errorController.handleError);
};
