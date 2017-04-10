//This script defines the routes taken by the server.

var pathUtil           = require('path'),
    log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf               = require(pathUtil.join(__dirname,'../config/conf.json')),
    documentHandler    = require(pathUtil.join(__dirname,'../handlers/documentHandler.js')),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    commonController   = require(pathUtil.join(__dirname,'../controllers/common.server.controller.js')),
    errorController    = require(pathUtil.join(__dirname,'../controllers/error.server.controller.js'));

module.exports = function(app) {
  //order important here.

  //EVERYTHING WILL BE AUDITED AND REROUTED TO SECURE SITE.
  app.use(securityController.auditRequest,//if not mobile site, then log it.
          securityController.reRouteHttps);//after logging, forward to https site.

  app.get('/',function(req,res,next){
    log.info("Sending index to client.");
    res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/www/index.html'));
  })
  /*
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
  app.get('*',function(req,res,next){
    res.sendStatus(404);
  });

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(errorController.handleError);
};
