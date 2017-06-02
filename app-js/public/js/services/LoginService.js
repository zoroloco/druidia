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

    self.processRegister = function(newCreds,cb){
      $http.post('addUser',newCreds).then(
        function(response){//first method is always the success handler (response of 200)
          $log.log("Create user successful.");
          cb(response.data);
      },
      function(response){//second method is the error handler.
          $log.log("Create user failed.");
          cb(response.data);
      }
    );
  }

}

angular.module('login-module')
  .service('LoginService',['$http','$log',LoginService]);
