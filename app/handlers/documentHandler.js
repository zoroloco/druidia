//sends documents down to the client.
var log        = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf       = require(pathUtil.join(__dirname,'../config/conf.json')),
    commonUtil = require(pathUtil.join(__dirname,'../lib/commonutils.js'));

exports.reRouteMobile = function(req,res,next){
  log.info("Checking for mobile re route of document.");
  log.info("Request made for:"+req.url);

  if(commonUtil.isMobile(req)){
    req.url = req.url+"/mobile";
    next('route');
  }
  else{
    next();
  }
}

exports.sendLogin = function(req,res,next){
  log.info("Sending login page to client.");
  res.sendFile(pathUtil.join(__dirname,'../../public/views/login.html'));
}

exports.sendLoginMobile = function(req,res,next){
  log.info("Sending initial mobile page to client.");
  res.sendFile(pathUtil.join(__dirname,'../../public/views/login-mobile.html'));
}

exports.sendRoot = function(req,res,next){
  log.info("Sending root page to client.");
  res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index.html'));
}

exports.sendRootMobile = function(req,res,next){
  log.info("Sending mobile root page to client.");
  res.sendFile(pathUtil.join(__dirname,'../../public/views/secure/index-mobile.html'));
}
