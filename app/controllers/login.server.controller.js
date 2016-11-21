var log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    sessionHandler = require(pathUtil.join(__dirname,'../handlers/sessionHandler.js'));

  exports.login = function(req,res){
    log.info("Attempting to authenticate login: "+JSON.stringify(req.body));
    //res.cookie(properties.title,req.body.username, {signed: true, maxAge: 9999, httpOnly: true, secure: true});
    mongoloid.validateUser(req.body,function(validationResult){
      if(true === validationResult){
        sessionHandler.createSession(req);
        res.sendStatus(200);
      }
      else{
        log.info("Sending failed login response message for user:"+req.body.username);
        //res.send("Login failed!");//TODO: send error message back.
//TODO: fix this....
        res.status(401);
        res.render('error', { error: "Login Failed." });
      }
    });
  };

  exports.addUser = function(req,res){
    log.info("Creating user:"+JSON.stringify(req.body));

    mongoloid.findUser(req.body,function(foundUser){
      if(!_.isEmpty(foundUser)){//prevent duplicate users
        log.warn("User "+req.body.username+" already exists.");
      }
      else{//create the new user
        var user = {
          "username" : req.body.username,
          "password" : req.body.password,
          "role"     : "admin"
        }
        mongoloid.saveUser(user);
      }
    });
  };
