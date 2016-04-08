angular.module('login-module', ['ngMaterial']).
  controller('LoginController',['$log','LoginService',function($log,loginService) {
    var self = this;
    this.username = "";
    this.password = "";

    self.onLogon = function(){
      $log.log("User "+self.username+" is attempting to login.");
      //loginService.processLogin();
    }

  }]);
