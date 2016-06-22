var log    = require(pathUtil.join(__dirname,'../lib/logger.js')),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));

module.exports = LoginController;

function LoginController(properties){

  if(this instanceof LoginController === false){
    throw new TypeError("Classes can't be function-called.");
  }

  var self = this;
  this._properties = properties;

  LoginController.prototype.render = function(req,res){
    log.info("Default page requested.");
    res.sendFile(pathUtil.join(__dirname,'../../public/views/index.html'));
  }

  LoginController.prototype.login = function(req,res){
    log.info("Attempting to authenticate login: "+JSON.stringify(req.body));
    //res.cookie(properties.title,req.body.username, {signed: true, maxAge: 9999, httpOnly: true, secure: true});
    res.sendStatus(200);
  }
}
