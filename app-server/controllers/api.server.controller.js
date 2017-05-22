var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    schemas        = require(pathUtil.join(__dirname,'../mongoose/schemas.js'));

    //middleware to grab user object and return to next calling method.
    exports.fetchUser = function(req,res,next){
      if(!_.isEmpty(req.user.userId)){
        mongoloid.find(schemas.userModel,"_id",req.user.userId,function(foundUser){
          if(!_.isEmpty(foundUser)){
            log.info("Returning user:"+JSON.stringify(foundUser));
            res.json(foundUser);
          }
          else{
            next("No user found.");//pass to error middleware.
          }
        });
      }
      else{
        next("Invalid user query.");
      }
    }
