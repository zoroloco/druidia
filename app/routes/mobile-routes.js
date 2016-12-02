var securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    rootController     = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js')),
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

  app.get('*',securityController.auditRequest,
              securityController.reRouteHttps,
              securityController.authenticate,
              rootController.sendMobileRoot);

  app.use(errorController.handleMobileError);

};
