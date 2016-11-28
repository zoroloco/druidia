angular.module('common-module', ['ngMaterial']).
  controller('CommonController',['$log','$window','$scope','CommonService',
    function($log,$window,$scope,commonService) {

    var self  = this;

    $log.log("Instantiated common controller.");

    self.fetchUser = function(){
      $log.log("Fetching user information.");
      commonService.fetchUser(function(fetchedUser){
          $log.log("Fetched user:"+fetchedUser);
          self.user = fetchedUser;
      });
    }

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
