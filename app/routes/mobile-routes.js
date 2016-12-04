var securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    rootController     = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js')),
    commonController   = require(pathUtil.join(__dirname,'../controllers/common.server.controller.js')),
    errorController    = require(pathUtil.join(__dirname,'../controllers/error.server.controller.js'));

module.exports = function(app) {
  //order important here.

  //Accessing the root / needs to first send down some initial html such as the login
  //or the index, depending if authentication passed.
  app.get('/',securityController.auditRequest,
              securityController.reRouteHttps,
              securityController.authenticate,
              rootController.sendMobileRoot);

  //login added first because we always want to be able to process a login post.
  app.post('/login',securityController.onLogin);

  //once logged in, all of our secure requests will be prepended with 'secure'.
  //As you see above, all 'secure' routes first go through authentication. If auth passes, then the
  //'next' routes are defined below.
  app.get('/secure/home',rootController.sendRoot);
  app.post('/secure/logoff',securityController.onLogout);
  app.get('/secure/common/fetchUser',commonController.fetchUser);
  app.get('/secure/common/fetchMobileStatus',commonController.fetchMobileStatus);

  app.get('*',securityController.auditRequest,
              securityController.reRouteHttps,
              securityController.authenticate,
              rootController.sendMobileRoot);

  app.use(errorController.handleMobileError);

};
