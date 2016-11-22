angular.module('login-module', ['ngMaterial']).
  controller('LoginController',['$log','$location','LoginService',function($log,$location,loginService) {
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
      loginService.processLogin(self.creds,function(validated,response){
        if(validated === true){
          $log.log("/login post returned true. Validated successful.");
          $location.url('/home');
        }

        //self.loginMsg = response;

      });
    }

    self.onCreateUser = function(){
      $log.log("User "+self.newCreds.username+" is being added.");
      loginService.processCreateUser(self.newCreds);
    }

  }]);
