var log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf               = require(pathUtil.join(__dirname,'../config/conf.json')),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    rootController     = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js')),
    commonController   = require(pathUtil.join(__dirname,'../controllers/common.server.controller.js')),
    homeController     = require(pathUtil.join(__dirname,'../controllers/home.server.controller.js'));

module.exports = function(app) {
  //order important here.

  //login added first because we always want to be able to process a login post.
  app.post('/login',securityController.onLogin);

  //add user is public. does not go through authenticate middleware.
  app.post('/addUser',securityController.onAddUser);

  //top level middleware to catch any request and log it. Will reroute to secure site if not https.
  app.use('*',securityController.auditRequest,
              securityController.reRouteHttps,
              securityController.authenticate);

  //add middleware before our route handlers so it will be invoked first.
  //every request will go through authenticate
  //app.use('/',securityController.authenticate);

  //if authentication passed and trying to get root, then send to root.
  app.get('/',rootController.renderRoot);

  //called when root page first loaded.
  app.get('/home',rootController.renderRoot);

  app.post('/logoff',securityController.onLogout);

  app.get('/common/fetchUser',commonController.fetchUser);

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);

    res.status(404);
    res.render(pathUtil.join(__dirname,'../../public/views/errors/404.jade'), {
        title : "The page you were looking for could not be found.",
        message : conf.messages.notFoundMessage
      });
  });
};
