var log    = require(pathUtil.join(__dirname,'../lib/logger.js'));

  function createSession(req,properties){
    log.info("Creating session.");

    /* While it might look like we are dealing a JavaScript object, it is not completely true;
    the session variables actually reside in the data store of the session and the JavaScript
    object only works as a proxy for those values. Operations on session variables are is
    basically working with JavaScript objects. The states of these objects are then updated
    on the session store.
    */
    req.logout();


    req.session.userName = req.body.username;
    req.session.domain   = properties.title;
  }

exports.createSession = createSession;
