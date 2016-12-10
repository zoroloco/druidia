var pathUtil = require('path'),
    log      = require(pathUtil.join(__dirname,'../lib/logger.js')),
    conf     = require(pathUtil.join(__dirname,'../config/conf.json'));

  function createSession(req){
    log.info("Creating session.");

    /* While it might look like we are dealing a JavaScript object, it is not completely true;
    the session variables actually reside in the data store of the session and the JavaScript
    object only works as a proxy for those values. Operations on session variables are is
    basically working with JavaScript objects. The states of these objects are then updated
    on the session store.
    */

    var sessionName = req.session.name;

    req.session.username       = req.body.username;
    req.session.domain         = conf.title;
    req.session.authenticated  = true;
  }

exports.createSession = createSession;
