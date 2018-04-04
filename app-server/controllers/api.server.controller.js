var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    Blog           = require(pathUtil.join(__dirname,'../mongoose/blog-model.js')),
    User           = require(pathUtil.join(__dirname,'../mongoose/user-model.js')),
    State          = require(pathUtil.join(__dirname,'../mongoose/state-model.js')),
    Account        = require(pathUtil.join(__dirname,'../mongoose/account-model.js')),
    Movie          = require(pathUtil.join(__dirname,'../mongoose/movie-model.js')),
    timestamp      = require('time-stamp');

    //fetch the user object of the requesting user.
    exports.fetchUser = function(req,res,next){
      log.warn(JSON.stringify(req.user));

      getUser(req.user.id).then(function(foundUser){
        if(!_.isEmpty(foundUser)){
          log.info("Returning user:"+JSON.stringify(foundUser));
          res.json(foundUser);
        }
        else{
          next("No user found.");//pass to error middleware.
        }
      },
      function(err){
        if(err)
          next(err);
      });
    }

    exports.fetchUsers = function(req,res,next){
      User.model.find(function(err,foundUsers){
        if(err)
          next(err);

        if(!_.isEmpty(foundUsers)){
          log.info("Found users:"+JSON.stringify(foundUsers));
          res.json(foundUsers);
        }
        else{
          log.info("No users found...this should not be possible.");
          res.sendStatus(404);
        }
      });
    }

    //fetch the blog objects of the requesting user.
    exports.fetchBlogs = function(req,res,next){

      Blog.find({userId:req.user.id},function(err,foundBlogs){
        if(err)
          next(err);

        if(!_.isEmpty(foundBlogs)){
          log.info("Found blog entries:"+JSON.stringify(foundBlogs));
          res.json(foundBlogs);
        }
        else{
          log.info("No blog entries exist for this user.");
          res.sendStatus(404);//no blogs exist for user. Send empty JSON.
        }
      })
    }

    exports.deleteBlog = function(req,res,next){
      log.info("deleting blog entry with ID:"+req.body._id);

      Blog.findByIdAndRemove(req.body._id, function(err){
        if(!err){
          log.info("Successfully deleted blog entry.");
          res.sendStatus(200);
        }
        else{
          log.error("Error deleting blog entry.");
          res.sendStatus(500);
        }
      });
    }

    //save a new blog entry.
    exports.saveBlog = function(req,res,next){
      log.info("saving blog entry:"+JSON.stringify(req.body));

      var newBlog = new Blog.model({
        userId    : req.user.id,
        heading   : req.body.heading,
        text      : req.body.text,
        timeStamp : timestamp('[YYYY:MM:DD HH:mm:ss:ms]')
      });

      newBlog.save(function(err){
        if(err)
          next(err);

        log.info("Successfully saved a new blog entry.");
        res.json(newBlog);
      })//save blog
    }

    //fetches all states.
    exports.fetchStates = function(req,res,next){
      State.model.find({},function(err,foundStates){
        if(err)
          next(err);

        if(!_.isEmpty(foundStates)){
          log.info("Found U.S. state entries:"+JSON.stringify(foundStates));
          res.json(foundStates);
        }
        else{
          log.info("No U.S. State entries exist in collection: states.");
          res.sendStatus(404);//no states exist for user. Send empty JSON.
        }
      })
    }

    //save an account
    exports.saveAccount = function(req,res,next){
      log.info("saving account:"+JSON.stringify(req.body));

      getUser(req.user.id).then(function(foundUser){
        var acct = new Account.model({
          user   : foundUser,
          address: req.body.address,
          email  : req.body.email,
          gender : req.body.gender
          //dob    : req.body.dob
        });

        log.info("Attempting to save account:"+JSON.stringify(acct));

        acct.save(function(err){
          if(err)
            next(err);

          log.info("Successfully saved account info for user:"+req.user.id);
          res.sendStatus(200);
        })
      });
    }

    //returns an account for a user.
    exports.fetchAccount = function(req,res,next){
      Account.model.findOne({'user._id':req.user.id},function(err,foundAccount){
        if(err)
          next(err);

        if(!_.isEmpty(foundAccount)){
          log.info("Found account:"+JSON.stringify(foundAccount));
          res.json(foundAccount);
        }
        else{
          log.info("No account exists for this user.");
          res.sendStatus(404);//no blogs exist for user. Send empty JSON.
        }
      }
      )
    }

    exports.fetchMovies = function(req,res,next){
        Movie.model.find({},function(err,foundMovies){
            if(err)
                next(err);

            if(!_.isEmpty(foundMovies)){
                log.info("Found movies:"+JSON.stringify(foundMovies));
                res.json(foundMovies);
            }
            else{
                log.info("No movies exist in collection: movies.");
                res.sendStatus(404);//no states exist for user. Send empty JSON.
            }
        })
    }

    //returns a promise with error or found user.
    function getUser(userId){
        return new Promise(function (resolve, reject) {
            User.model.findOne({_id:userId},function(err,foundUser){
                if (err)
                    return reject(err) // rejects the promise with `err` as the reason
                foundUser.isNew = false;//allows updates
                resolve(foundUser) // fulfills the promise with `data` as the value
            })
        })
    }