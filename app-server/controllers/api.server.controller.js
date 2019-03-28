var pathUtil       = require('path'),
    log            = require(pathUtil.join(__dirname,'../lib/logger.js')),
    _              = require('underscore'),
    User           = require(pathUtil.join(__dirname,'../mongoose/user-model.js')),
    Movie          = require(pathUtil.join(__dirname,'../mongoose/movie-model.js')),
    Humiditemp     = require(pathUtil.join(__dirname,'../mongoose/humiditemp-model.js')),
    moment         = require('moment');

    moment().format();

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
    };

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
    };

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
                res.sendStatus(404);
            }
        }).sort( { title: 1 } )
    };

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

    //get latest humidity for sensor with given name.
    exports.fetchLatestHumidiTemp = function(req,res,next){
        log.info("Fetching latest humiditemp for sensor-name:"+JSON.stringify(req.query.sensor_name));

        Humiditemp.model.find({sensor_name:req.query.sensor_name},function(err,latestHumidiTemp){
            if(err)
                next(err);

            if(!_.isEmpty(latestHumidiTemp)){
                log.info("Latest humiditemp found:"+JSON.stringify(latestHumidiTemp[0]));

                var latestHT = {
                    sensor_name: latestHumidiTemp[0].sensor_name,
                    humidity    : latestHumidiTemp[0].humidity,
                    temperature: latestHumidiTemp[0].temperature,
                    event_time: moment.utc(latestHumidiTemp[0].event_time).local().format('dddd, MMMM Do YYYY, h:mm:ss a')
                };

                log.info("sending back dh:"+ JSON.stringify(latestHT));

                res.json(latestHT);
            }
            else{
                log.info("No humiditemps exist in collection: Humiditemp.");
                res.sendStatus(404);
            }
        }).sort( { event_time:-1} ).limit(1);//sort by most recent event time and limit to 1.
    };