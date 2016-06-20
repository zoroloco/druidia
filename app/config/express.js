//This is my express wrapper object where all the config for the server takes place.

const express        = require('express'),
      pathUtil       = require('path')
      bodyParser     = require('body-parser');
      methodOverride = require('method-override');
      mongoose       = require('mongoose'),
      fs             = require('fs'),
      credentials    = require('../security/credentials.js');

module.exports = function(properties) {
    var app = express();
    app.set('port', process.env.PORT || properties.port);
    app.set('views',pathUtil.join(__dirname,'../../public/views'));
    app.set('view engine', 'jade');
    app.set('properties', properties);
    app.set('title', properties.title);

    app.set('httpsOptions',
    {
        key:  fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.pem")),
        cert: fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.crt"))
    });

    var opts = {
        server: {
           socketOptions: { keepAlive: 1 }
        }
    };
    mongoose.connect(properties.mongoCredentials.connectionString,opts);

    app.use(require('cookie-parser')(credentials.cookieSecretValue));
    app.use(require('express-session')());

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
    app.use(express.static(pathUtil.join(__dirname,'../../public')));

    require('../routes/index.server.routes.js')(app);

    //error route middleware must go AFTER our own routes.

    //custom 404 page
    app.use(function(req,res){
      res.status(404);
      res.render(pathUtil.join(__dirname,'../../public/views/errors/404.jade'), {
          title : "The page you were looking for could not be found.",
          message : properties.messages.notFoundMessage
        });
    });

    return app;
};
