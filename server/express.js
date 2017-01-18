//This is my express wrapper object where all the config for the server takes place.

const express  = require('express');
var   pathUtil = require('path'),
      fs       = require('fs'),
      conf     = require(pathUtil.join(__dirname,'./conf.json')),
      log      = require(pathUtil.join(__dirname,'./logger.js')),
bodyParser     = require('body-parser'),
methodOverride = require('method-override');

module.exports = function() {
    var app       = express();

    log.info("Setting default and config values for express app.");

    app.set('port', process.env.PORT || conf.port);
    app.set('httpPort', conf.httpPort);
    app.set('title', conf.title);

    //CONFIGURE SSL
    app.set('httpsOptions',
    {
        key:  fs.readFileSync(pathUtil.join(__dirname, "./security/ssl/druidia.pem")),
        cert: fs.readFileSync(pathUtil.join(__dirname, "./security/ssl/druidia.crt"))
    });

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
    app.use(express.static(pathUtil.join(__dirname,'../client/druidia/www/')));

    log.info("Defining routing file.");
    require('./routes.js')(app);

    return app;
};
