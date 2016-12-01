//This file is the starting point of the application.
pathUtil     = require('path'),
server       = require(pathUtil.join(__dirname,'./server.js'));

var myServer = new server();

//initiate all of the servers.
myServer.start();
