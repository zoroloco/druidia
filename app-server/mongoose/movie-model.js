var mongoose  = require('mongoose');

var MovieSchema = new mongoose.Schema({
    title    : {type: String, required: true, index: {unique: true}},
    movieId  : {type: String},
    vote_average: {type: String},
    poster_path: {type: String},
    overview: {type: String},
    release_date: {type: String}
});

exports.schema = MovieSchema;

exports.model = mongoose.model('Movies',MovieSchema);