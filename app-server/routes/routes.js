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

  app.get('/api/users',apiController.fetchUsers);//test code, not secure

  app.use(securityController.reRouteHttps);//reroute and use https

  //Below is the route to serve the NG2 site.
  app.get('/',function(req,res){
    log.info("Sending index to client.");
    res.sendFile(pathUtil.join(__dirname,'../../app-web/dist/index.html'));
  });

  app.get('/api/movies',
          apiController.fetchMovies);

  /*****START DEFINING API-ROUTES*****

    // any GET to the API will have to be routed through the jwtCheck!
  app.get('/api/*',
    securityController.jwtCheck);

  //any POST to the API will have to be routed through the jwtCheck!
  app.post('/api/*',
    securityController.jwtCheck);

  //log some event from the client.
  app.post('/api/logger',
      loggerController.logger);

  //route to get logged in user's profile.
  app.get('/api/fetchUser',
    apiController.fetchUser);

  //fetch all users in application.
  app.get('./api/fetchUsers',
    apiController.fetchUsers);

  //route to get all blogs for a user.
  app.get('/api/fetchBlogs',
    apiController.fetchBlogs);

  //route to post a blog entry.
  app.post('/api/postBlog',
    apiController.saveBlog);

  //route to delete a blog entry.
  app.post('/api/deleteBlog',
    apiController.deleteBlog);

  app.get('/api/fetchStates',
    apiController.fetchStates);

  app.post('/api/postAccount',
    apiController.saveAccount);

  app.get('/api/fetchAccount',
    apiController.fetchAccount);
*/

  //error middleware triggered by next('some error');
  //error handling middleware is always declared last.
  app.use(errorController.handleError);
};
