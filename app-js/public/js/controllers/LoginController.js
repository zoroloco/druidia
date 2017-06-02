angular.module('login-module', ['ngMaterial']).
  controller('LoginController',['$log','$window','LoginService',function($log,$window,loginService) {
    var self = this;

    $log.log("Instantiated login controller.");

    this.creds = {
      "username" : "",
      "password" : ""
    };

    this.newCreds = {
      "username" : "",
      "password" : "",
      "password1": "",
      "password2": "",
      "email"    : "",
      "firstName": "",
      "lastName" : ""
    };

    self.onLogon = function(){
      $log.log("User "+self.creds.username+" is attempting to login.");
      loginService.processLogin(self.creds,function(validated,response){
        if(validated === true){
          $log.log("/login post returned true. Validated successful.");
          //$location.url('/home');
          //$location.path('home');
          $window.location.href = "/";//reload entire page.
        }
        else{
          //self.loginMsg = response;
        }
      });
    }

    self.onRegister = function(){
      $log.log("User "+self.newCreds.username+" is being registered.");

      if(self.newCreds.password1 != self.newCreds.password2){
        $log.log("Passwords do not match.");
        return;
      }
      self.newCreds.password = self.newCreds.password1;

      loginService.processRegister(self.newCreds,function(err){
        $log.log("Received error when creating user:"+err);
        //self.addUserMsg = err;
      });
    }

  }]);
