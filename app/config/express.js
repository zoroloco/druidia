const express        = require('express'),
      bodyParser     = require('body-parser');
      methodOverride = require('method-override');

module.exports = function(properties) {
    var app = express();
    app.set('views',pathUtil.join(__dirname,'../public'));
    app.set('view engine', 'jade');
    app.set('properties', properties);

    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));

    // set the static files location /public/img will be /img for users
    app.use(express.static(pathUtil.join(__dirname,'../public')));

    require('../app/routes/index.server.routes.js')(app);
    return app;
};
