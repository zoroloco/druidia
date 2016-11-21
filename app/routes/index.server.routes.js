var log             = require(pathUtil.join(__dirname,'../lib/logger.js')),
    loginController = require(pathUtil.join(__dirname,'../controllers/login.server.controller.js')),
    rootController  = require(pathUtil.join(__dirname,'../controllers/root.server.controller.js'));

module.exports = function(app) {

    app.get('/', rootController.render);

    app.post('/login',loginController.login);
    app.post('/addUser',loginController.addUser);
    app.post('/logout',rootController.logout);
};
