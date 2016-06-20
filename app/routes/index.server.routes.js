var log = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = function(app) {

    var login = require('../controllers/login.server.controller'),
    loginController = new login(app.get('properties'));

    var cookieObj = require('../handlers/cookieHandler'),
    cookieHandler = new cookieObj(app.get('properties'));

    app.get('/', loginController.render);

    app.post('/login',loginController.login);

    app.get('/cookie', cookieHandler.handleCookie);

    //define other routes here for restFul endpoints.
};
