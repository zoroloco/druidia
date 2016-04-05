var log    = require(pathUtil.join(__dirname,'../lib/logger.js'));

module.exports = IndexController;

function IndexController(properties){

  if(this instanceof IndexController === false){
    throw new TypeError("Classes can't be function-called.");
  }

  var self = this;
  this._properties = properties;

  IndexController.prototype.render = function(req,res){
    log.info("Default page requested.");

    //res.sendFile(pathUtil.join(__dirname,'../../public/views/index.html'));

    res.render('index', {
      title : "login",
      props : JSON.stringify(self._properties)
    })

  }
}
