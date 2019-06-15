//This is my express wrapper object where all the config for the server takes place.

const express          = require('express'),
      swaggerUi        = require('swagger-ui-express'),
      swaggerDocument  = require('./swagger.json'),
      cors             = require('cors');

var   pathUtil           = require('path'),
      bodyParser         = require('body-parser'),
      methodOverride     = require('method-override'),
      fs                 = require('fs'),
      passport           = require('passport'),
      //FacebookStrategy   = require('passport-facebook').Strategy,
      LocalStrategy      = require('passport-local').Strategy,
      authConf           = require(pathUtil.join(__dirname,'./auth.conf.js')),
      conf               = require(pathUtil.join(__dirname,'./conf.json')),
      log                = require(pathUtil.join(__dirname,'../lib/logger.js')),
      securityController = require(pathUtil.join(__dirname,'../controllers/security.server.controller.js'));

module.exports = function() {
    var app       = express();

    log.info("Setting default and config values for express app.");
    app.set('port', process.env.PORT || conf.port);
    app.set('httpPort', conf.httpPort);
    app.set('title', conf.title);

    //CONFIGURE SSL
    if(conf.enableSSL){
        app.set('httpsOptions',
        {
            key:  fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.pem")),
            cert: fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.crt"))
        });
    }

    //setup swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    //configure the session
    //In a typical web app, the credentials used to authenticate a user will only be transmitted during the login
    //request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's
    //browser.
    const session    = require('express-session');
    //const MongoStore = require('connect-mongo')(session);
    app.use(session({
        secret: authConf.cookieSecretValue,
        //cookie: {secure:true},
        saveUninitialized: true,
        resave: true,
        //maxAge: new Date(Date.now()+3600000),//one hour
        //store: new MongoStore({ url: conf.mongo.connectionString })
    }));

    app.use(require('cookie-parser')(authConf.cookieSecretValue));

    // get all data/stuff of the body (POST) parameters
    // parse application/json
    app.use(bodyParser.json());

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cors());

    //CONFIGURE PASSPORT for local authentication
    passport.use(new LocalStrategy(securityController.processLocalLogin));

    //CONFIGURE PASSPORT for Facebook
    /*
    passport.use(new FacebookStrategy({
        clientID     : authConf.fb_app_id,
        clientSecret : authConf.fb_app_secret,
        callbackURL  : "https://"+conf.hostname+"/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos']
      },
      securityController.processFacebookLogin //This is the VERIFY callback for facebook authentication.
    ));
    */

    //attaches user to the session.
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    app.use(passport.initialize());
    app.use(passport.session());

    //set up static directory of my own custom files
    log.info("Defining custom static file directory.");
    app.use(express.static(pathUtil.join(__dirname,'../../app-web/dist/druidia-web')));
    //set up static directory of 3rd party files
    //log.info("Defining 3rd party static file directory.");
    //app.use(express.static(pathUtil.join(__dirname,'../../app-web/node_modules')));

    log.info("Defining routing file.");
    require('../routes/routes.js')(app);

    return app;
};
