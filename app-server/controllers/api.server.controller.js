var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    mongoloid      = require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    blogObj        = require(pathUtil.join(__dirname,'../mongoose/collections/blog.json')),
    schemas        = require(pathUtil.join(__dirname,'../mongoose/schemas.js')),
    timestamp      = require('time-stamp');

    //fetch the user object of the requesting user.
    exports.fetchUser = function(req,res,next){
      mongoloid.findOne(schemas.userModel,"_id",req.user.id,function(foundUser){
        if(!_.isEmpty(foundUser)){
          log.info("Returning user:"+JSON.stringify(foundUser));
          res.json(foundUser);
        }
        else{
          next("No user found.");//pass to error middleware.
        }
      });//find user
    }

    //fetch the blog objects of the requesting user.
    exports.fetchBlogs = function(req,res,next){
      mongoloid.find(schemas.blogModel,"userId",req.user.id,function(foundBlogs){
        if(!_.isEmpty(foundBlogs)){
          log.info("Found blog entries:"+JSON.stringify(foundBlogs));
          res.json(foundBlogs);
        }
        else{
          res.json({});//no blogs exist for user. Send empty JSON.
        }
      })
    }

    //save a new blog entry.
    exports.saveBlog = function(req,res,next){
      log.info("saving blog entry:"+JSON.stringify(req.body));

      //fetch the full user object first
      blogObj.userId    = req.user.id;
      blogObj.heading   = "";
      blogObj.text      = req.body.text;
      blogObj.timeStamp = timestamp('[YYYY:MM:DD HH:mm:ss:ms]');

      var newBlogModel = schemas.blogModel(blogObj);

      mongoloid.save(newBlogModel,function(result){
        if(!_.isEmpty(result)){
          log.info("Successfully saved a new blog entry.");
          res.json(blogObj);
        }
        else{
          next("Error saving new blog entry.")
        }
      })//save blog
    }
