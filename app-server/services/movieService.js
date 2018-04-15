var pathUtil = require('path'),
    fs       = require('fs'),
    _        = require('underscore'),
    log      = require(pathUtil.join(__dirname,'../lib/logger.js')),
    mongoloid= require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    Movie    = require(pathUtil.join(__dirname,'../mongoose/movie-model.js')),
    conf     = require(pathUtil.join(__dirname,'../config/conf.json'));

process.title = "movieService";

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

function watchMovies(dir){
    log.info("Watching movie directory:"+dir);

    fs.watch(dir, (eventType, filename) => {
        log.info(`event type is: ${eventType}`);
        if (filename) {
            log.info(`filename provided: ${filename}`);
            if(!_.isEqual(filename,'untitled folder')){
                saveMovie(filename);
            }
        } else {
            log.info('filename not provided');
        }
    });
}

function loadMovies(dir){
    log.info("Loading movies from "+dir+" to movie collection.");

    fs.readdir(dir, function(err, items) {
        for (let i=0; i<items.length; i++) {
            saveMovie(items[i]);
        }
    });
}

let start = function(){
    log.info("Now starting movie service!");
    mongoloid.init(function(status){
       if(status){
           loadMovies(conf.movieDir);
           watchMovies(conf.movieDir);
       }
    });
}();