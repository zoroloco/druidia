var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    Blog           = require(pathUtil.join(__dirname,'../mongoose/blog-model.js')),
    User           = require(pathUtil.join(__dirname,'../mongoose/user-model.js')),
    timestamp      = require('time-stamp');

    //fetch the user object of the requesting user.
    exports.fetchUser = function(req,res,next){
      log.warn(JSON.stringify(req.user));

      User.findOne({_id:req.user.id},function(err,foundUser){
        if(err)
          next(err);

        if(!_.isEmpty(foundUser)){
          log.info("Returning user:"+JSON.stringify(foundUser));
          res.json(foundUser);
        }
        else{
          next("No user found.");//pass to error middleware.
        }
      });//find user
    }

    exports.fetchUsers = function(req,res,next){
      User.find(function(err,foundUsers){
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

      var newBlog = new Blog({
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
