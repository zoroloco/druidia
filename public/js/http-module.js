//define the module that handles the http interceptor.

angular.module('http-module', [])
.factory('authInterceptor',['$log','$window','$q',function($log,$window,$q){
  return{
    'request': function(config){
      $log.log("Auth Interceptor: request.");
      return config;
    },
    'requestError':function(rejection)
    {
     $log.log("Auth Interceptor: requestError.");
     $q.reject(rejection);
    },
    'response':function(response){
      $log.log("Auth Interceptor: response.");
      return response || $q.when(response);
    },
    'responseError': function(rejection){
      $log.log("Auth Interceptor: Response Error: "+rejection.status);
      //$window.location.href= "/views/login.html";
      return $q.reject(rejection);
    }
  };//returns
}])


.config(['$httpProvider', function($httpProvider){
  console.log("Adding httpProvider.");
  $httpProvider.interceptors.push('authInterceptor');
}])
