var mongoose  = require('mongoose');

var MovieSchema = new mongoose.Schema({
    title    : {type: String, required: true}
});

exports.schema = MovieSchema;

exports.model = mongoose.model('Movies',MovieSchema);