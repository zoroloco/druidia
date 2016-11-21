var log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
    securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js')),
    rootController     = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js'));

module.exports = function(app) {
  app.get('/',securityController.renderLogin);

  app.post('/login',securityController.onLogin);

  app.post('/addUser',securityController.onAddUser);

  app.post('/logout',securityController.onLogout);

  app.get('/secure',securityController.authenticate);

};
