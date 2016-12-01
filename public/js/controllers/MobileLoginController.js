angular.module('mobile-login-module', []).
  controller('LoginController',['$log','$location',function($log,$location) {
    var self = this;

    $log.log("Instantiated mobile login controller.");

  }]);
