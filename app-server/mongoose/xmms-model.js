var mongoose  = require('mongoose');

var XmmsSchema = new mongoose.Schema({
    song_title: {type: String},
    errMsg: {type: String},
    event_time: Date
});

exports.schema = XmmsSchema;

exports.model = mongoose.model('music_history',XmmsSchema);