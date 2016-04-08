var log = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = function(app) {
    //context root
    var login = require('../controllers/login.server.controller');
    var loginController = new login(app.get('properties'));
    app.get('/', loginController.render);
    app.post('/login',loginController.auth);
    log.info("Created route for context root.");

    //define other routes here for restFul endpoints.
};
