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
    app.use(securityController.auditRequest);//audit

    //Below is the route to serve the NG2 site.
    app.get('/',
        securityController.reRouteHttps,
        function(req,res){
      log.info("Sending index to client.");
      res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
    });

    app.get('/test/users',apiController.fetchUsers);//test code, not secure

    app.get('/api/movies',
            securityController.reRouteHttps,
            apiController.fetchMovies);

    //error middleware triggered by next('some error');
    //error handling middleware is always declared last.
    app.use(errorController.handleError);
};
