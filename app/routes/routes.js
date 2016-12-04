//This script defines the routes taken by the server.

var log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf               = require(pathUtil.join(__dirname,'../config/conf.json')),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    rootController     = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js')),
    commonController   = require(pathUtil.join(__dirname,'../controllers/common.server.controller.js')),
    errorController    = require(pathUtil.join(__dirname,'../controllers/error.server.controller.js')),
    mobileHandler      = require(pathUtil.join(__dirname,'../handlers/mobileHandler.js'));

module.exports = function(app) {
  //order important here.

  //Accessing the root / needs to first send down some initial html such as the login
  //or the index, depending if authentication passed.
  app.get('/',mobileHandler.reRouteMobile,//first see if we need to re-route to mobile site.
              securityController.auditRequest,//if not mobile site, then log it.
              securityController.reRouteHttps,//after logging, forward to https site.
              securityController.authenticate,//after https site, then authenticate for active session.
              rootController.sendRoot);//if authenticated, then send home page.

  //login added first because we always want to be able to process a login post.
  app.post('/login',securityController.onLogin);

  //add user is public. does not go through authenticate middleware.
  app.post('/addUser',securityController.onAddUser);

  //top level middleware to catch any request and log it. Will reroute to secure site if not https.
  app.use('/secure',mobileHandler.reRouteMobile,//first see if we need to re-route to mobile site.
                    securityController.auditRequest,//if not mobile site, then log it.
                    securityController.reRouteHttps,//after logging, forward to https site.
                    securityController.authenticate);//after https site, then authenticate for active session.
                    //if authentication passes, then flow will go to 'next', which is one of the routes defined below.

  //once logged in, all of our secure requests will be prepended with 'secure'.
  //As you see above, all 'secure' routes first go through authentication. If auth passes, then the
  //'next' routes are defined below.
  app.get('/secure/home',rootController.sendRoot);
  app.post('/secure/logoff',securityController.onLogout);
  app.get('/secure/common/fetchUser',commonController.fetchUser);
  app.get('/secure/common/fetchMobileStatus',commonController.fetchMobileStatus);

  //Everything else requested will get routed back to the root page.
  //Root page will be home if authenticated, login page otherwise.
  app.get('*',securityController.auditRequest,
              securityController.reRouteHttps,
              securityController.authenticate,
              rootController.sendRoot);

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(errorController.handleError);
};
