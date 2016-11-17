var log    = require(pathUtil.join(__dirname,'../lib/logger.js')),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));

module.exports = LoginController;

function LoginController(){

  if(this instanceof LoginController === false){
    throw new TypeError("Classes can't be function-called.");
  }

  var self = this;

  LoginController.prototype.login = function(req,res){
    log.info("Attempting to authenticate login: "+JSON.stringify(req.body));
    //res.cookie(properties.title,req.body.username, {signed: true, maxAge: 9999, httpOnly: true, secure: true});
    sessionHandler.createSession(req);
    res.sendStatus(200);
  }
}
