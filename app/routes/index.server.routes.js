var log = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = function(app) {

    var login           = require('../controllers/login.server.controller'),
        rootc           = require('../controllers/root.server.controller'),
        rootController  = new rootc(),
        loginController = new login();

    app.get('/', rootController.render);

    app.post('/login',loginController.login);

    app.post('/logout',rootController.logout);
};
