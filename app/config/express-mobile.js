//This is my express wrapper object where all the config for the server takes place.

const express        = require('express');
var   pathUtil       = require('path'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      fs             = require('fs'),
      credentials    = require(pathUtil.join(__dirname,'../security/credentials.js')),
      conf           = require(pathUtil.join(__dirname,'./conf.json')),
      log            = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = function() {
    var mobileApp       = express();

    mobileApp.set('views',pathUtil.join(__dirname,'../../public/mobile-views'));
    mobileApp.set('title', conf.title);

    //CONFIGURE SSL
    mobileApp.set('httpsOptions',
    {
        key:  fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.pem")),
        cert: fs.readFileSync(pathUtil.join(__dirname, "../security/ssl/druidia.crt"))
    });

    //CONFIGURE SESSION STORE
    const session    = require('express-session');
    const MongoStore = require('connect-mongo')(session);
    mobileApp.use(session({
        secret: credentials.cookieSecretValue,
        cookie: {secure:true},
        saveUninitialized: false, // don't create session until something stored
        resave: false, //don't save session if unmodified
        maxAge: new Date(Date.now()+3600000),//one hour
        store: new MongoStore({ url: conf.mongo.connectionString })
    }));
    log.info("Defined mongo session store with credentials.");

    mobileApp.use(require('cookie-parser')(credentials.cookieSecretValue));

    // get all data/stuff of the body (POST) parameters
    // parse application/json
    mobileApp.use(bodyParser.json());

    // parse application/vnd.api+json as json
    mobileApp.use(bodyParser.json({ type: 'application/vnd.api+json' }));

    // parse application/x-www-form-urlencoded
    mobileApp.use(bodyParser.urlencoded({ extended: true }));

    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
    mobileApp.use(methodOverride('X-HTTP-Method-Override'));

    // set the static files location /public/img will be /img for users
    log.info("Setting static file directory.");
    mobileApp.use(express.static(pathUtil.join(__dirname,'../../public')));

    log.info("Defining mobile routing file.");
    require('../routes/mobile-routes.js')(mobileApp);

    return mobileApp;
};
