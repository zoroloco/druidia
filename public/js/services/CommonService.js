function CommonService($log,$http){
    var self = this;

    self.processLogOff = function(cb){
      $http.post('logoff').then(
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

}

angular.module('common-module')
  .service('CommonService',['$log','$http',CommonService]);
