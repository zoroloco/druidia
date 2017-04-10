//This is my express wrapper object where all the config for the server takes place.

const express        = require('express');
var   pathUtil       = require('path'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      vhost          = require('vhost'),
      fs             = require('fs'),
      credentials    = require(pathUtil.join(__dirname,'../security/credentials.js')),
      conf           = require(pathUtil.join(__dirname,'./conf.json')),
      log            = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = function() {
    var app       = express();

    log.info("Setting default and config values for express app.");
    app.set('port', process.env.PORT || conf.port);
    app.set('httpPort', conf.httpPort);
    app.set('views',pathUtil.join(__dirname,'../../app-web/www'));
    //app.set('view engine', 'jade');
    app.set('title', conf.title);

    //CONFIGURE SSL
    app.set('httpsOptions',
    {
        key:  fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.pem")),
        cert: fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.crt"))
    });

    //CONFIGURE SESSION STORE
    const session    = require('express-session');
    const MongoStore = require('connect-mongo')(session);
    app.use(session({
        secret: credentials.cookieSecretValue,
        cookie: {secure:true},
        saveUninitialized: false, // don't create session until something stored
        resave: false, //don't save session if unmodified
        maxAge: new Date(Date.now()+3600000),//one hour
        store: new MongoStore({ url: conf.mongo.connectionString })
    }));
    log.info("Defined mongo session store with credentials.");

    app.use(require('cookie-parser')(credentials.cookieSecretValue));

    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json());

    // parse application/vnd.api+json as json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    app.use(methodOverride('X-HTTP-Method-Override'));

    //setup the static dir to be served 
    log.info("Setting static file directory.");
    app.use(express.static(pathUtil.join(__dirname,'../../app-web/dist')));

    if(conf.mobileSite === true){
      log.info("Setting up mobile express site.");
      var mobileApp = express();
      log.info("Setting up the mobile virtual host: "+conf.virtualHostnameMobile+"."+conf.hostname);
      app.use(vhost("*."+conf.hostname,mobileApp));
    }

    log.info("Defining routing file.");
    require('../routes/routes.js')(app);

    return app;
};
