var pathUtil = require('path'),
    fs       = require('fs'),
    log      = require(pathUtil.join(__dirname,'../lib/logger.js')),
    Movie    = require(pathUtil.join(__dirname,'../mongoose/movie-model.js')),
    conf     = require(pathUtil.join(__dirname,'../config/conf.json'));

process.title = "movieService";

function watchMovies(dir){
    log.info("Watching movie directory:"+dir);

    fs.watch(dir, (eventType, filename) => {
        log.info(`event type is: ${eventType}`);
        if (filename) {
            log.info(`filename provided: ${filename}`);
        } else {
            log.info('filename not provided');
        }
    });

}

function loadMovies(dir){
    log.info("Loading movies from "+dir+" to movie collection.");
    var m = new Movie.model({
        title: 'White men cant jump'
    });
    m.save(function(err){
       if(err){
           console.error("error saving movie!");
       }
       else{
           console.info("Saved movie!");
       }
    });

}

log.info("Now starting movie service!");
loadMovies(conf.movieDir);
watchMovies(conf.movieDir);