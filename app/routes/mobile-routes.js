var securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    rootController     = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js'));

module.exports = function(app) {
  //order important here.

  //Accessing the root / needs to first send down some initial html such as the login
  //or the index, depending if authentication passed.
  app.get('/',securityController.auditRequest,
              //securityController.reRouteHttps,
              securityController.authenticate,
              rootController.sendMobileRoot);

  //login added first because we always want to be able to process a login post.
  //app.post('/login',securityController.onLogin);

  //top level middleware to catch any request and log it. Will reroute to secure site if not https.

  app.use(function(err,req,res,next){
    res.send("error on mobile side of things.");
  });
};
