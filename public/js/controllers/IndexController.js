angular.module('index-module', ['ngMaterial']).
  controller('IndexController',['$log','IndexService',function($log,indexService) {
    var self = this;

    $log.log("Instantiated index controller.");

  }]);
