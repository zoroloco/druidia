angular.module('index-module', ['ngMaterial']).
  controller('IndexController',['$log','$location','IndexService',function($log,$location,indexService) {
    var self = this;

    $log.log("Instantiated index controller.");

    //by default when this controller instantiates, we want to load the login
    $location.url('/login');
    $log.log("Routing to /login by default.");

  }]);
