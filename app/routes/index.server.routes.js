var log = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = function(app) {

    var login = require('../controllers/login.server.controller'),
    loginController = new login(app.get('properties'));

    app.get('/', loginController.render);

    app.post('/login',loginController.login);

    //define other routes here for restFul endpoints.
};
