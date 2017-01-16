//logger singleton.
var winston  = require('winston'),
    pathUtil = require('path'),
	  fs       = require('fs'),
    _        = require('underscore'),
    conf     = require(pathUtil.join(__dirname,'../config/conf.json'));

var log = new (winston.Logger)({//create the default console logger.
  transports: [
  new (winston.transports.Console)({'timestamp' : true,'colorize': true})],
  exitOnError: false
});

var self = module.exports = {

  /*
    Init should pass in an object that looks like the following:

  "logger" : {
    "enabled" : true,
    "dir"     : ""
  }
  */
  init: function init(){
    if(conf.logger.enabled){
      if(!_.isEmpty(conf.logger.dir)){
        //create the log dir if it does not already exist.
    		try {
    		   log.info("Creating log directory:"+conf.logger.dir);
    		   fs.mkdirSync(conf.logger.dir);
    		}
    		catch(e) {
    		   if ( e.code != 'EEXIST' ){
             log.error("Log directory already exists. "+conf.logger.dir);
    			   throw e;
    		   }
    		}

        log = new (winston.Logger)({
      		  transports: [
      			new (winston.transports.Console)({'timestamp' : true,'colorize': true})
      			,new winston.transports.File({ filename: pathUtil.join(conf.logger.dir,conf.hostname+"_"+"error.log"), name:'file.error',
      				level: 'error','maxsize':4194304,maxFiles:256, handleExceptions: true,json: false })
      			,new winston.transports.File({ filename: pathUtil.join(conf.logger.dir,conf.hostname+"_"+"warn.log"), name:'file.warn',
      				level: 'warn','maxsize':4194304,maxFiles:256, handleExceptions: true,json: false })
      			,new winston.transports.File({ filename: pathUtil.join(conf.logger.dir,conf.hostname+"_"+"info.log"), name:'file.info',
      				level: 'info','maxsize':4194304,maxFiles:256, handleExceptions: true,json: false })
      		  ],
      		  exceptionHandlers: [
      			new (winston.transports.Console)({'timestamp' : true,'colorize': true})
      			,new winston.transports.File({ filename: pathUtil.join(conf.logger.dir,process.title+"_"+"exception.log"),
      				level: 'error','maxsize':4194304,'maxFiles':256 })
      		  ],
      		  exitOnError: false
      		});

          log.info("Log files will be located in:"+conf.logger.dir);
      }
    }
  },

  info: function info(msg){
    if(conf.logger.enabled)
      log.info(process.title+":"+msg);
  },

  warn: function warn(msg){
    if(conf.logger.enabled)
      log.warn(process.title+":"+msg);
  },

  error: function error(msg){
    if(conf.logger.enabled)
      log.error(process.title+":"+msg);
  }

};
