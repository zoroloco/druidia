var pathUtil   = require('path'),
    async      = require('async'),
    _          = require('underscore'),
    log        = require(pathUtil.join(__dirname,'./app/lib/logger.js')),
    express    = require(pathUtil.join(__dirname,'./app/config/express'));

module.exports = Server;

function Server(conf){

  log.init(conf.logger);

  if(this instanceof Server === false){
    throw new TypeError("Classes can't be function-called.");
  }

  var self      = this;
  this._conf    = conf;
  this._app     = express(conf);
  process.title = conf.title;

  try{
    if(!_.isEmpty(this._conf)){
      log.info("Successfully read well-formatted config file:\n"+JSON.stringify(this._conf));
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
    if(!_.isEmpty(self._server)){
      self._server.close();
    }
    process.exit();
  }

  Server.prototype.start = function(){
    self._server = self._app.listen(self._app.get('port'),function(){
        log.info(process.title+" server now listening on port:"+self._server.address().port);
    });

    module.exports = self._app;
  }

}//server
