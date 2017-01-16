var pathUtil   = require('path'),
    async      = require('async'),
    _          = require('underscore'),
    vhost      = require('vhost'),
    https      = require('https'),
    http       = require('http'),
    mongoose   = require('mongoose'),
    log        = require(pathUtil.join(__dirname,'./lib/logger.js')),
    express    = require(pathUtil.join(__dirname,'./config/express.js')),
    mongoloid  = require(pathUtil.join(__dirname,'./mongoose/mongoloid.js')),
    conf       = require(pathUtil.join(__dirname,'./config/conf.json'));

module.exports = Server;

function Server(){

  log.init();
  mongoloid.init();

  if(this instanceof Server === false){
    throw new TypeError("Classes can't be function-called.");
  }

  var self        = this;

  try{
    if(!_.isEmpty(conf)){
      log.info("Using config file:\n"+JSON.stringify(conf));
    }
    else{
      log.warn("No config file defined. Bailing.");
      process.exit(1);
    }
  }
  catch(e){
    log.warn("Starting server resulted in the exception:"+e);
    process.exit(1);
  }

  this._app     = express();//This is the main express app that was setup in config/express.js

  process.title = conf.title;

  //define process handlers
  process.on('SIGTERM', function() {
    log.info("Got kill signal. Exiting.");
    self.shutdown('SIGTERM');
  });

  process.on('SIGINT', function() {
    log.warn("Caught interrupt signal(Ctrl-C)");
    self.shutdown('SIGINT');
  });

  process.on('exit', function(){
    log.info("server process exiting...");
  })

  process.on('uncaughtException', function (err) {
    var msg="Uncaught Exception ";
    if( err.name === 'AssertionError' ) {
      msg += err.message;
    } else {
      msg += err;
    }

    log.error(msg);
  });

  //members
  Server.prototype.shutdown = function shutdown(INTERRUPT){
    log.warn("Starting clean shutdown.");

    mongoose.connection.close(function () {
        log.info('Mongoose default connection disconnected through app termination');
    });

    if(!_.isEmpty(self._server)){
      self._server.close();
    }
    process.exit();
  }

  Server.prototype.start = function(){
    //secure site
    self._server = https.createServer(self._app.get('httpsOptions'),self._app).listen(self._app.get('port'), function(){
      log.info(process.title+" server now listening on port:"+self._server.address().port);
    });

    //non secure site used to reroute to secure site.
    self._httpServer = http.createServer(self._app).listen(self._app.get('httpPort'),function(){
      log.info(process.title+" server now listening on port:"+self._httpServer.address().port);
    })

    module.exports = self._app;
  }

}//server
