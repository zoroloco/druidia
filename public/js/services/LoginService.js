function LoginService($http){
    var self = this;

    self.processLogin = function(creds){
      $http.post('login',creds);
    }
}

angular.module('login-module')
  .service('LoginService',['$http',LoginService]);
