var log    = require(pathUtil.join(__dirname,'../lib/logger.js'));

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

  LoginController.prototype.auth = function(req,res){
    log.info("Attempting to authenticate login: "+JSON.stringify(req.body));
    req.session.userName = req.body.username;
    req.session.domain   = properties.title;
    log.info("req.session.username="+req.session.userName);

    res.cookie(properties.title,'nom nom');
    res.sendStatus(200);
  }
}
