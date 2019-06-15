var mongoose  = require('mongoose');

var HumidiTempSchema = new mongoose.Schema({
    sensor_name: {type: String, required: true},
    humidity    : {type: String},
    temperature: {type: String},
    event_time: Date
});

exports.schema = HumidiTempSchema;

exports.model = mongoose.model('Humiditemp',HumidiTempSchema);