angular.module('mobile-index-module', []).
  controller('IndexController',['$log','$location','CommonService',function($log,$location,commonService) {
    var self = this;

    $log.log("Instantiated index controller.");

    self.fetchUser = function(){
      $log.log("Fetching user information.");
      commonService.fetchUser(function(fetchedUser){
          $log.log("Fetched user:"+fetchedUser);
          self.user = fetchedUser;
      });
    }

    //by default when this controller instantiates, we want to load the login
    $log.log("Attempting to load home by default.");
    $location.url('/secure/mobile-home');
  }]);
