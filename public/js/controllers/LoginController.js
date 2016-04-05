angular.module('login-module', ['ngMaterial']).
  controller('LoginController',['$log','LoginService',function($log,loginService) {
    var self = this;

    self.onLogon = function(){
      $log.log("User is attempting to login.");
      //loginService.processLogin();
    }

  }]);
