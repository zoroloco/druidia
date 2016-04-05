var log = require(pathUtil.join(__dirname,'../../lib/logger.js'));

module.exports = function(app) {
    //context root
    var index = require('../controllers/index.server.controller');
    var indexController = new index(app.get('properties'));
    app.get('/', indexController.render);
    log.info("Created route for context root.");

    //define other routes here for restFul endpoints.
};
