var pathUtil = require('path'),
    cp       = require('child_process'),
    log      = require(pathUtil.join(__dirname,'../lib/logger.js'));

exports.startServices = function(){
    log.info("Forking movieService");
    var movieService = cp.fork(pathUtil.join(__dirname,'../services/movieService.js'));
};