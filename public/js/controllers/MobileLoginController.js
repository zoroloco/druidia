angular.module('mobile-login-module', []).
  controller('LoginController',['$log','$location','LoginService',function($log,$location,loginService) {
    var self = this;

    $log.log("Instantiated mobile login controller.");

    this.creds = {
      "username" : "",
      "password" : ""
    };

    this.loginMsg   = "";

    self.onLogon = function(){
      $log.log("User "+self.creds.username+" is attempting to login.");
      loginService.processLogin(self.creds,function(validated,response){
        if(validated === true){
          $log.log("/login post returned true. Validated successful.");
          //$location.url('/home');
          //$location.path('home');
          //$window.location.href = "/";//reload entire page.
        }
        else{
          self.loginMsg = response;
        }
      });
    }
  }]);
