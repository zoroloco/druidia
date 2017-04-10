var pathUtil     = require('path'),
    log          = require(pathUtil.join(__dirname,'../lib/logger.js')),
    cp           = require('child_process'),
    conf         = require(pathUtil.join(__dirname,'../config/conf.json')),
    MobileDetect = require('mobile-detect');

exports.executeCommand = function(cmd,cb){
	var child = cp.exec(cmd ,function(error,stdout,stderr){
		if (stderr){
			cb(false,"Error executing command "+cmd+" with stderr:"+stderr);
		}
		if (error) {
			cb(false,"Error executing command "+cmd+" with error:"+error);
		}
		if(stdout){
			cb(true,cmd+" successfully executed with no errors.",stdout);
		}
	});
}

exports.isMobile = function(req){
  if(conf.debugMobile === true){
    log.info("Debug mobile mode on. Simulating mobile OS.");
    return true;
  }

  var md = new MobileDetect(req.headers['user-agent']);
  if(md.is('iOS') ||
     md.is('AndroidOS') ||
     md.is('WindowsMobileOS') ||
     md.is('WindowsPhoneOS')){
       log.info("Mobile OS detected.");
       return true;
   }

   log.info("Mobile OS not detected.");
   return false;
}
