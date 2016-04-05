pathUtil     = require('path'),
server       = require(pathUtil.join(__dirname,'./server.js'));

var myServer = new server(require(pathUtil.join(__dirname,'./app/config/conf.json')));

myServer.start();
