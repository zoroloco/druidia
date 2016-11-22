var log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    rootController     = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js')),
    homeController     = require(pathUtil.join(__dirname,'../controllers/home.server.controller.js'));

module.exports = function(app) {

  //login added first because we always want to be able to process a login post.
  app.post('/login',securityController.onLogin);

  //add middleware before our route handlers so it will be invoked first.
  //every request will go through authenticate
  app.use(securityController.authenticate);

  /*
  app.use(function(err,req,res,next){
    res.status(404);
    res.render(pathUtil.join(__dirname,'../../public/views/errors/404.jade'), {
        title : "The page you were looking for could not be found.",
        message : conf.messages.notFoundMessage
      });
  });
  */

  //this is the 'next' call after successful authentication.
  app.get('/',rootController.renderRoot);

  app.get('/home',homeController.renderHome);

  app.get('/logout',securityController.onLogout);

  app.post('/addUser',securityController.onAddUser);

};
