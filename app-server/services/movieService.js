var pathUtil = require('path'),
    fs       = require('fs'),
    _        = require('underscore'),
    log      = require(pathUtil.join(__dirname,'../lib/logger.js')),
    mongoloid= require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    Movie    = require(pathUtil.join(__dirname,'../mongoose/movie-model.js')),
    conf     = require(pathUtil.join(__dirname,'../config/conf.json'));

//save movie if doesn't already exist.
function saveMovie(title){
    mongoloid.findOne(Movie.model,'title',title,function(foundFlick){
        if(_.isEmpty(foundFlick)){
            let flick = new Movie.model({
                title: title
            });
            mongoloid.save(flick);
        }
    });
}

exports.loadMovies =function() {
    log.info("Loading movies from "+conf.movieDir+" to movie collection.");

    fs.readdir(conf.movieDir, function(err, items) {
        for (let i=0; i<items.length; i++) {
            saveMovie(items[i]);
        }
    });
};