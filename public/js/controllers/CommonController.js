angular.module('common-module', ['ngMaterial']).
  controller('CommonController',['$log','$window','CommonService',function($log,$window,commonService) {
    var self = this;

    $log.log("Instantiated common controller.");

    self.onLogOff = function(){
      $log.log("User is logging off.");
      commonService.processLogOff(function(result){
        if(result === true){
          $log.log("Session destroyed. Re-directing back to index.");
          $window.location.href = "/";//reload entire page.
        }
      });
    }

  }]);
