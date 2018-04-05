//This script defines the routes taken by the server.

var pathUtil           = require('path'),
    log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
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
          securityController.reRouteHttps,
          securityController.cors);//after logging, forward to https site.

  //Below is the route to serve the NG2 site.
  app.get('/',function(req,res,next){
    log.info("Sending index to client.");
    res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
  })


  app.get('/api/movies',
          apiController.fetchMovies);

  app.get('/api/users',
      apiController.fetchUsers);

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(errorController.handleError);
};
