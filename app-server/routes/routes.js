//This script defines the routes taken by the server.

var pathUtil           = require('path'),
    log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf               = require(pathUtil.join(__dirname,'../config/conf.json')),
    documentHandler    = require(pathUtil.join(__dirname,'../handlers/documentHandler.js')),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    loggerController   = require(pathUtil.join(__dirname,'../controllers/logger.server.controller.js')),
    errorController    = require(pathUtil.join(__dirname,'../controllers/error.server.controller.js')),
    apiController      = require(pathUtil.join(__dirname,'../controllers/api.server.controller.js')),
    credentials        = require(pathUtil.join(__dirname,'../security/credentials.js')),
    passport           = require('passport');

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
  });

  //only used for facebook authentication that was originally triggered by a get request.
  //  /authenticated?jwtToken=FDSJFLKSDJFL...
  app.get('/authenticated',function(req,res){
    log.info("Authenticated route hit with JWT = "+req.query.jwtToken);
    res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
  });

  app.post('/auth/createAccount',
    securityController.processCreateAccount,
    function(req,res,next){
      log.info("Post account creation middleware. Now routing to login authentication.");
      next();
    },
    passport.authenticate('local'),
    securityController.processLocalLoginCallback);

  //route for normal un/pw authentication.
  app.post('/auth/login',
    passport.authenticate('local'),
    securityController.processLocalLoginCallback);

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook',
    passport.authenticate('facebook'));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback',
    securityController.processFacebookCallback);

  //any GET to the API will have to be routed through the jwtCheck!
  app.get('/api/*',
    securityController.jwtCheck);

  //any POST to the API will have to be routed through the jwtCheck!
  app.post('/api/*',
    securityController.jwtCheck);

  //*****START DEFINING API-ROUTES******//

  //log some event from the client.
  app.post('/api/logger',
      loggerController.logger);

  //route to get logged in user's profile.
  app.get('/api/fetchUser',
    apiController.fetchUser);

  //fetch all users in application.
  app.get('./api/fetchUsers',
    apiController.fetchUsers);

  //route to get all blogs for a user.
  app.get('/api/fetchBlogs',
    apiController.fetchBlogs);

  //route to post a blog entry.
  app.post('/api/postBlog',
    apiController.saveBlog);

  //route to delete a blog entry.
  app.post('/api/deleteBlog',
    apiController.deleteBlog);

  app.get('/api/fetchStates',
    apiController.fetchStates);

  app.post('/api/postAccount',
    apiController.saveAccount);

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(errorController.handleError);
};
