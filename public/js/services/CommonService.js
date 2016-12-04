function CommonService($log,$http){
    var self = this;

    self.processLogOff = function(cb){
      $http.post('secure/logoff').then(
       function(response){
         $log.log("Logoff successful.");
         cb(true);
       },
       function(response){
         $log.log("Logoff failed.");
         cb(false);
       }
     );
    }

    self.fetchUser = function(cb){
      return $http.get('/secure/common/fetchUser').then(function(response){
        cb(response.data);
      });
    }

    self.fetchMobileStatus = function(cb){
      return $http.get('/secure/common/fetchMobileStatus').then(function(response){
        cb(response.data);
      });
    }
}

//inject this service to the following module controllers.
angular.module('index-module')
  .service('CommonService',['$log','$http',CommonService]);
