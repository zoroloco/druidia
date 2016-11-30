angular.module('index-module', ['ngMaterial']).
  controller('IndexController',['$log','$location',function($log,$location) {
    var self = this;

    $log.log("Instantiated index controller.");

    //by default when this controller instantiates, we want to load the login
    $log.log("Attempting to load home by default.");
    $location.url('/secure/home');
  }]);
