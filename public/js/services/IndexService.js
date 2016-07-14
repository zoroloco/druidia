function IndexService($http){
    var self = this;

    self.processLogout = function(){
      $http.post('logout');
    }
}

angular.module('index-module')
  .service('IndexService',['$http',IndexService]);
