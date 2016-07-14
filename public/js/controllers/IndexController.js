angular.module('index-module', ['ngMaterial']).
  controller('IndexController',['$log','IndexService',function($log,indexService) {
    var self = this;

    self.onLogout = function(){
      $log.log("Logging out.");
      indexService.processLogout();
    }

  }]);
