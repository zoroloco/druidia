angular.module('login-module', ['ngMaterial']).
  controller('LoginController',['$log','LoginService',function($log,loginService) {
    var self = this;

    this.creds = {
      "username" : "",
      "password" : ""
    };

    this.newCreds = {
      "username" : "",
      "password" : ""
    }

    self.onLogon = function(){
      $log.log("User "+self.creds.username+" is attempting to login.");
      loginService.processLogin(self.creds);
    }

    self.onCreateUser = function(){
      $log.log("User "+self.newCreds.username+" is being added.");
      loginService.processCreateUser(self.newCreds);
    }

  }]);
