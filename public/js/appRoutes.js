// public/js/appRoutes.js
angular.module('appRoutes', []).
    config(['$routeProvider', '$locationProvider',
       function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
              templateUrl : 'views/index.html',
              controller  : 'LoginController'
          });

        $locationProvider.html5Mode(true);
      }]);//config
