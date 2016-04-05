function LoginService($http){
    var self = this;

    self.processLogin = function(){
      //$http.post('robo',cmd);
    }
}

angular.module('login-module')
  .service('LoginService',['$http',LoginService]);
