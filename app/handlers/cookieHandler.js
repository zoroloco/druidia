var log    = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = CookieHandler;

function CookieHandler(properties){

  var self = this;
  this._properties = properties;

  CookieHandler.prototype.handleCookie = function(req,res){
    log.info("Processing cookie.");
    
  }
}
