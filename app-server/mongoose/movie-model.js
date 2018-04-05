var mongoose  = require('mongoose');

var MovieSchema = new mongoose.Schema({
    title    : {type: String, required: true, index: {unique: true}}
});

exports.schema = MovieSchema;

exports.model = mongoose.model('Movies',MovieSchema);