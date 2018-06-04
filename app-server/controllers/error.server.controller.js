//any route that calls next(some message) will be routed here as part of the error handling.
//here we log error and send back 500 response and detailed message to front-end.
const pathUtil       = require('path'),
      log            = require(pathUtil.join(__dirname,'../lib/logger.js'));

/* From the expressjs website:
   Error-handling middleware always takes four arguments. You must provide four arguments to identify it
   as an error-handling middleware function. Even if you don’t need to use the next object, you must specify
   it to maintain the signature. Otherwise, the next object will be interpreted as regular middleware and will
   fail to handle errors.
 */

  //401 , 404s,some 500s sent here.
  exports.handleError = function(err,req,res,next){
    log.error("Error middleware caught with error:"+err);
    res.status(500).send(err);
  };
