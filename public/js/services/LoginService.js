function LoginService($http){
    var self = this;

    self.processLogin = function(creds){
      $http.post('login',creds);
    }

    self.processCreateUser = function(newCreds){
      $http.post('addUser',newCreds);
    }
}

angular.module('login-module')
  .service('LoginService',['$http',LoginService]);
