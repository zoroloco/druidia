function LoginService($http,$log){
    var self = this;
    var msg  = null;

    self.processLogin = function(creds,cb){
      $http.post('login',creds).then(
       function(response){
         $log.log("Login successful.");
         cb(true,response.data);
       },
       function(response){
         $log.log("Login failed.");
         cb(false,response.data);
       }
     );
    }

    self.processCreateUser = function(newCreds){
      $http.post('addUser',newCreds);
    }
}

angular.module('login-module')
  .service('LoginService',['$http','$log',LoginService]);
