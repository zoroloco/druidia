//This script defines the routes taken by the server.

var pathUtil           = require('path'),
    log                = require(pathUtil.join(__dirname,'./logger.js')),
    securityController = require(pathUtil.join(__dirname,'./security.server.controller.js'));

module.exports = function(app) {
  //order important here.

  //EVERYTHING WILL BE AUDITED AND REROUTED TO SECURE SITE.
  app.use(securityController.auditRequest,//if not mobile site, then log it.
          securityController.reRouteHttps);//after logging, forward to https site.

  app.get('/',function(req,res,next){
    res.sendFile(pathUtil.join(__dirname,'../client/druidia/www/index.html'));
  })

  //everything else is a 404, not found.
  app.get('*',function(req,res,next){
    res.sendStatus(404);
  });

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);
    res.sendStatus(err);
  });
};
