angular.module('login-module', ['ngMaterial']).
  controller('LoginController',['$log','LoginService',function($log,loginService) {
    var self = this;

    $log.log("Instantiated login controller.");

    this.creds = {
      "username" : "",
      "password" : ""
    };

    this.newCreds = {
      "username" : "",
      "password" : ""
    }

    this.loginMsg = "";

    self.onLogon = function(){
      $log.log("User "+self.creds.username+" is attempting to login.");
      loginService.processLogin(self.creds,function(msg){
        self.loginMsg = msg;
      });
    }

    self.onCreateUser = function(){
      $log.log("User "+self.newCreds.username+" is being added.");
      loginService.processCreateUser(self.newCreds);
    }

  }]);
