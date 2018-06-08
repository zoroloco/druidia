var pathUtil = require('path'),
    fs       = require('fs'),
    _        = require('underscore'),
    log      = require(pathUtil.join(__dirname,'../lib/logger.js')),
    mongoloid= require(pathUtil.join(__dirname,'../mongoose/mongoloid.js')),
    Movie    = require(pathUtil.join(__dirname,'../mongoose/movie-model.js')),
    conf     = require(pathUtil.join(__dirname,'../config/conf.json')),
    authConf = require(pathUtil.join(__dirname,'../config/auth.conf.js')),
    request  = require('request');

function fetchMovieId(title,cb){
    var searchTitle = title.replace(' ','+');

    var queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=' +
        authConf.tmdb_api_key + '&query=' + searchTitle;

    log.info('Calling themoviedb.org:' + queryUrl);
    request.get({ url: queryUrl },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var results = JSON.parse(body).results;
                //Note: You queried the movie db, so you will get back a result for every
                //movie that has similar title. The results are ranked by most popular. It
                //will be very very likely that the movie I want is also the most popular, so
                //lets just use the 0 element (most popular) result.
                cb(results[0]);
            }
    });
}

//save movie if doesn't already exist.
function saveMovie(title){
    mongoloid.findOne(Movie.model,'title',title,function(foundFlick){
        if(_.isEmpty(foundFlick)){
            fetchMovieId(title,function(movieInfo){
                let flick = new Movie.model({
                    title: title,
                    movieId: movieInfo.id,
                    vote_average: movieInfo.vote_average,
                    poster_path: 'http://image.tmdb.org/t/p/w185/'+movieInfo.poster_path,
                    overview: movieInfo.overview,
                    release_date: movieInfo.release_date
                });
                mongoloid.save(flick);
            });
        }
    });
}

exports.loadMovies =function() {
    log.info("Loading movies from "+conf.movieDir+" to movie collection.");

    fs.readdir(conf.movieDir, function(err, items) {
        for (let i=0; i<items.length; i++) {
            if(!items[i].startsWith('.', 0)){//ignore the hidden files.
                saveMovie(items[i]);
            }
        }
    });
};